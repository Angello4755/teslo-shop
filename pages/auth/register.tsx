import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { AuthLayout } from "src/view/layouts";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "utils";
import {  WarningOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "src/view/context/auth/AuthContext";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [errorRegister, setErrorRegister] = useState(false);

  const { onRegisterUser } = useContext(AuthContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const destination = router.query.p?.toString();

  const onRegister = async ({ name, email, password }: FormData) => {
    const result = await onRegisterUser(name, email, password);
    if (!result) {
      setErrorRegister(true);
      setTimeout(() => setErrorRegister(false), 3000);
      return;
    }
    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title="Ingresar">
      <div>
        <form onSubmit={handleSubmit(onRegister)} noValidate={true}>
          <Box sx={{ width: 350, padding: "10px 20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Crear cuenta
                </Typography>
                {errorRegister ? (
                  <Chip
                    label="Usuario ya registrado"
                    color="warning"
                    icon={<WarningOutlined />}
                    className="fadeIn"
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  variant="filled"
                  fullWidth
                  {...register("name", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 2,
                      message: "El nombre debe de ser de 2 caracteres",
                    },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo"
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
                  label="Password"
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
                  Registrar
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href="/auth/login" passHref legacyBehavior>
                  <Link underline="always">¿Ya tienes cuenta?</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;

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