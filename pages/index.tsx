import { Typography } from "@mui/material";
import { ShopLayout } from "../src/view/layouts/ShopLayout";
import ProductList from "src/view/products/components/ProductList";
import { useProducts } from "src/infra/database/products/hooks";
import { FullScreenLoading } from "src/view/Components/ui";

export default function TesloShopHome() {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"Teslo-shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo qui"}
    >
      <div>
        <Typography variant="h1" component="h1">
          Tienda
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </ShopLayout>
  );
}
