import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { AuthLayout } from "src/view/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "utils";

import { ErrorOutline } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "src/view/context/auth/AuthContext";
import { useRouter } from "next/router";
import { getSession, signIn, getProviders } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const [providers, setproviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setproviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [errorAuth, setErrorAuth] = useState(false);

  const destination = router.query.p?.toString();

  const onLoginUser = async ({ email, password }: FormData) => {
    setErrorAuth(false);

    // const isValidLogin = await loginUser(email, password);
    // if (!isValidLogin) {
    //   setErrorAuth(true);
    //   setTimeout(() => setErrorAuth(false), 3000);
    //   return;
    // }
    // router.replace(destination || "/");
    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title="Ingresar">
      <div>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate={true}>
          <Box sx={{ width: 350, padding: "10px 20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Ingresar session
                </Typography>
                {errorAuth ? (
                  <Chip
                    label="No Reconocemos ese usuario / contraseña"
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="correo"
                  variant="filled"
                  fullWidth
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="password"
                  variant="filled"
                  type="password"
                  fullWidth
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 6,
                      message: "Minimo 6 caracteres",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  fullWidth
                >
                  Ingresar
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink
                  href={`/auth/register${
                    destination ? `?p=${destination}` : "/"
                  }`}
                  passHref
                  legacyBehavior
                >
                  <Link underline="always">¿No tienes cuenta?</Link>
                </NextLink>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                justifyContent="end"
              >
                <Divider sx={{ width: "100%", mb: 2 }} />
                {Object.values(providers).map((provider: any) => {
                  if (provider.id === "credentials")
                    return <div key="credentials"></div>;
                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
