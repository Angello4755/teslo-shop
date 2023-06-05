import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../../src/view/layouts/ShopLayout";
import NextLink from "next/link";

const emptyPage = () => {
  return (
    <ShopLayout title="Carrito Vacio" pageDescription="No hay articulos">
      <Box
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography ml={2}>Su carrito está vacio</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography="h4" color="secundary">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default emptyPage;
