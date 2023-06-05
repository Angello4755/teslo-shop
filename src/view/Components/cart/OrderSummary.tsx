import { Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { format } from "utils";
import { CartContext } from "../../context/cart/CartContext";
import { CartSummary } from "../../../core/product/entity/cartSummary";

interface Props {
  cartSummary?: CartSummary;
}
const OrderSummary: FC<Props> = ({ cartSummary }) => {
  if (!cartSummary) return <></>;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{format(cartSummary.numberOfItems)} items</Typography>
      </Grid>
      <Grid item xs={6} display="flex">
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${format(cartSummary.subTotal)}`}</Typography>
      </Grid>
      <Grid item xs={6} display="flex">
        <Typography>Impuesto ({format(cartSummary.taxRate * 100)}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${format(cartSummary.tax)}`}</Typography>
      </Grid>
      <Grid item xs={6} display="flex" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1" sx={{ mt: 2 }}>{`${format(
          cartSummary.total
        )}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
