import { Typography } from "@mui/material";
import ProductList from "src/view/products/components/ProductList";
import { useProducts } from "src/infra/database/products/hooks";
import { FullScreenLoading } from "src/view/Components/ui";
import { ShopLayout } from "src/view/layouts";

export default function CategoryMenPage() {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"Teslo-shop - Home - Kid"}
      pageDescription={"Encuentra los mejores productos de Teslo para niños"}
    >
      <div>
        <Typography variant="h1" component="h1">
          Niños
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Productos para niños
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
