import { Box, Typography } from "@mui/material";
import ProductList from "src/view/products/components/ProductList";
import { useProducts } from "src/infra/database/products/hooks";
import { FullScreenLoading } from "src/view/Components/ui";
import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "src/view/layouts";
import { ProviderProducts } from "src/infra/provider/providerProducts";
import { Product } from "src/core/product/entity";

interface Props {
  products: Product[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Buscar producto"}
      pageDescription={"Encuentra los mejores productos de Teslo qui"}
    >
      <div>
        <Typography variant="h1" component="h1">
          Buscar Productos
        </Typography>
        {foundProducts ? (
          <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
            Termino: {query}
          </Typography>
        ) : (
          <Box display="flex">
            <Typography variant="h2" sx={{ mb: 1 }}>
              No encontramos ningun producto
            </Typography>
            <Typography variant="h2" sx={{ ml: 1 }} color="secondary">
              {query}
            </Typography>
          </Box>
        )}
        <ProductList products={products} />
      </div>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const provider = new ProviderProducts();

  let products = await provider.get_GetProductsByQuery().execute(query);

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await provider.get_GetAllProducts().execute();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
