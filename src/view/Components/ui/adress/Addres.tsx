import React, { FC } from "react";
import PropTypes from "prop-types";
import { ShippingAddres } from "../../../../core/product/entity/cartSummary";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";

interface Props {
  shippingAddres?: ShippingAddres;
  editing?: boolean;
}
const Addres: FC<Props> = ({ shippingAddres, editing = true}) => {
  if (!shippingAddres) return <></>;
  return (
    <>
      <Box display={ editing? 'flex': 'none'} justifyContent="end">
        <NextLink href="/checkout/address" passHref legacyBehavior>
          <Link underline="always">Editar</Link>
        </NextLink>
      </Box>

      <Typography variant="subtitle1">Dirección de entrega</Typography>
      <Typography>
        {`${shippingAddres.name} ${shippingAddres.surnames}`}
      </Typography>
      <Typography>{`${shippingAddres.address}`}</Typography>
      <Typography>{`${shippingAddres.address2}`}</Typography>
      <Typography>{`${shippingAddres.city} - ${shippingAddres.country}`}</Typography>
      <Typography>{`${shippingAddres.postalCode}`}</Typography>
      <Typography>{`${shippingAddres.phone}`}</Typography>
    </>
  );
};

Addres.propTypes = {};

export default Addres;
