import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, FC } from "react";
import { ProductSlideshow, SizeSelector } from "src/view/products/components";
import { ItemCounter } from "src/view/Components/ui";
import { ShopLayout } from "src/view/layouts";
import { initialData } from "../../src/infra/database/products/seed-data";
import { Product, ProductSlug, Size } from "src/core/product/entity";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { ProviderProducts } from "src/infra/provider/providerProducts";
import { ICartProduct } from "../../src/core/product/entity/cart";
import { useContext } from "react";
import { CartContext } from "src/view/context/cart/CartContext";
import { useRouter } from "next/router";

const product = initialData.products[0];

interface Props {
  product: Product;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const changeSelectedSize = (size: Size) => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const changeQuantity = (quantity: number) => {
    setTempCartProduct({ ...tempCartProduct, quantity });
  };

  const { addProductCart } = useContext(CartContext);

  const router = useRouter();

  const onAddCartProduct = () => {
    addProductCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h1">
                Cantidad
              </Typography>
              <ItemCounter
                maxQuantity={product.inStock}
                quantity={tempCartProduct.quantity}
                changeQuantity={(quantity: number) => changeQuantity(quantity)}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                changeSelectedSize={(size: Size) => changeSelectedSize(size)}
              />
            </Box>

            {product.inStock === 0 ? (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              ></Chip>
            ) : tempCartProduct.size ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddCartProduct}
              >
                Agregar al carrito
              </Button>
            ) : (
              <Button color="secondary" className="circular-btn" disabled>
                Seleccione una talla
              </Button>
            )}

            {/* Descripcion */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const provider = new ProviderProducts();
  const slugs: ProductSlug[] = await provider.get_GetProductSlugs().execute();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  const provider = new ProviderProducts();

  const product = await provider.get_GetProductBySlug().execute(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
