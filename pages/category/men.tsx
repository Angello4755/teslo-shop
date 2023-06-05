import { Typography } from "@mui/material";
import ProductList from "src/view/products/components/ProductList";
import { useProducts } from "src/infra/database/products/hooks";
import { FullScreenLoading } from "src/view/Components/ui";
import { ShopLayout } from "src/view/layouts";

export default function CategoryMenPage() {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Teslo-shop - Home - men"}
      pageDescription={"Encuentra los mejores productos de Teslo para hombre"}
    >
      <div>
        <Typography variant="h1" component="h1">
          Hombres
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos para hombres
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
