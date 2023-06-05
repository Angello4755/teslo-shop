import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "src/infra/database/products/seed-data";
import NexLink from "next/link";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { ICartProduct } from "../../../core/product/entity/cart";

interface Props {
  editable?: boolean;
  products: ICartProduct[];
}

const CartList: FC<Props> = ({ editable = false, products }) => {
  const { updateCartQuantity, removeProductInCart } = useContext(CartContext);

  const productsInCart = products;

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {productsInCart.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NexLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NexLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  changeQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                  maxQuantity={5}
                />
              ) : (
                <Typography variant="h5" component="h5">
                  {product.quantity} items
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">
              {`Unidad:$${product.price} Total: $${
                product.price * product.quantity
              }`}
              {editable ? (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeProductInCart(product)}
                >
                  Eliminar
                </Button>
              ) : (
                ""
              )}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
