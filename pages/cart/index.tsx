import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CartList } from "src/view/Components/cart";
import { CartContext } from "src/view/context/cart/CartContext";
import { ShopLayout } from "src/view/layouts";
import OrderSummary from "../../src/view/Components/cart/OrderSummary";
import router from "next/router";
import { useRouter } from "next/router";

const CartPage = () => {
  const { isLoaded, quantityProducts, cart, cartSummary } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && quantityProducts === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, quantityProducts]);

  if (!isLoaded || quantityProducts === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title="Carrito - 3"
      pageDescription="Carrito de compras de la tienda"
    >
      <div>
        <Typography variant="h1" component="h1">
          Carrito
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList editable={true} products={cart} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2" component="h2"></Typography>
                <Divider sx={{ my: 1 }} />
                <OrderSummary cartSummary={ cartSummary } />

                <Box sx={{ mt: 3 }}>
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    href="/checkout/address"
                  >
                    Checkout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ShopLayout>
  );
};

export default CartPage;
