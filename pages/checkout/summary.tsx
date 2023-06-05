import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList } from "src/view/Components/cart";
import OrderSummary from "src/view/Components/cart/OrderSummary";
import { ShopLayout } from "src/view/layouts";
import NextLink from "next/link";
import { CartContext } from "src/view/context/cart/CartContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Addres from "src/view/Components/ui/adress/Addres";

const SummaryPage = () => {
  const { cartSummary, createOrder, cart } = useContext(CartContext);
  const [isPosting, setfIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onCreateOrder = async () => {
    setfIsPosting(true);
    const { hasError, message } = await createOrder();
    if (hasError) {
      setfIsPosting(false);
      setErrorMessage(message);
      return;
    }
    router.replace(`/orders/${message}`);
  };

  const { shippingAddres } = cartSummary;

  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("name")) {
      router.push("/checkout/address");
    }
  }, []);

  if (!shippingAddres) {
    return <></>;
  }

  return (
    <ShopLayout title="Resumen orden" pageDescription="Resumen de la orden">
      <div>
        <Typography variant="h1" component="h1">
          Resumen orden
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList products={cart} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2" component="h2">
                  {`Resumen (${cartSummary.numberOfItems} productos) `}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Addres shippingAddres={cartSummary.shippingAddres} />
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="end">
                  <NextLink href="/cart" passHref legacyBehavior>
                    <Link underline="always">Editar</Link>
                  </NextLink>
                </Box>
                <OrderSummary cartSummary={cartSummary} />

                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  <Button
                    color="secondary"
                    className="circular-btn"
                    onClick={onCreateOrder}
                    fullWidth
                    disabled={isPosting}
                  >
                    Confirmar Orden
                  </Button>

                  <Chip
                    color="error"
                    label={errorMessage}
                    sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ShopLayout>
  );
};

export default SummaryPage;
