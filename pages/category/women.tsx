import { Typography } from "@mui/material";
import ProductList from "src/view/products/components/ProductList";
import { useProducts } from "src/infra/database/products/hooks";
import { FullScreenLoading } from "src/view/Components/ui";
import { ShopLayout } from "src/view/layouts";

export default function CategoryMenPage() {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"Teslo-shop - Home - women"}
      pageDescription={"Encuentra los mejores productos de Teslo para mujer"}
    >
      <div>
        <Typography variant="h1" component="h1">
          Mujeres
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos para Mujeres
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
