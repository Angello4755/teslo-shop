import {
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "src/view/layouts";
import { countries } from "../../utils/countries";
import { useRouter } from "next/router";
import { getAddressFromCookies } from "utils";
import { ShippingAddres } from "src/core/product/entity";

import { CartContext } from 'src/view/context/cart/CartContext';

const AddressPage = () => {
  const { updateAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddres>({
    defaultValues: getAddressFromCookies(),
  });

  const onRegisterAddress = async (data: ShippingAddres) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <form onSubmit={handleSubmit(onRegisterAddress)}>
      <ShopLayout
        title="Direcciones"
        pageDescription="Confirmar direccion del destino"
      >
        <div>
          <Typography variant="h1" component="h1">
            Direccion
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                variant="filled"
                fullWidth
                {...register("surnames", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "Los apellidos debe de ser de minimo 2 caracteres",
                  },
                })}
                error={!!errors.surnames}
                helperText={errors.surnames?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Direccion"
                variant="filled"
                fullWidth
                {...register("address", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "La direccion debe de ser de minimo 2 caracteres",
                  },
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Direccion 2 (opcional)"
                variant="filled"
                fullWidth
                {...register("address2", {
                  required: false,
                })}
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                variant="filled"
                fullWidth
                {...register("city", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "La ciudad debe de ser de minimo 2 caracteres",
                  },
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Codigo postal"
                variant="filled"
                fullWidth
                {...register("postalCode", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "El codigo postal debe de ser de 6 caracteres",
                  },
                  maxLength: {
                    value: 6,
                    message: "El codigo postal debe de ser de 6 caracteres",
                  },
                })}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  variant="filled"
                  label="Pais"
                  defaultValue={countries[0].code}
                  {...register("country", {
                    required: true,
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Telefono"
                variant="filled"
                fullWidth
                {...register("phone", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              sx={{ mt: 5 }}
            >
              Revisar pedido
            </Button>
          </Box>
        </div>
      </ShopLayout>
    </form>
  );
};

export default AddressPage;
