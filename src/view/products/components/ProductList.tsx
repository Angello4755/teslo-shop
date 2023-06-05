import { Grid } from "@mui/material";
import { FC } from "react";
import { Product } from "src/core/product/entity";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList: FC<Props> = ({ products }) => {
  if (!products) return <></>;
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};

export default ProductList;
