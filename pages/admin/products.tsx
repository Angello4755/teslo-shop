import NextLink from "next/link";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { Product as IProduct } from "src/core/product/entity";
import { AdminLayout } from "src/view/layouts";
import useSWR from "swr";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            className="fadeIn"
            alt={`${row.title}`}
            image={`${row.img}`}
          ></CardMedia>
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "inStok", headerName: "Inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <>Cargando...</>;

  const rows = data!.map((product: IProduct) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStok: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos ${data?.length}`}
      subTitle={"Mantenimiento de productos"}
      icon={<CategoryOutlined />}
    >
      <>
        <Box display="flex" justifyContent="end" sx={{ smb: 2 }}>
          <Button
            startIcon={<AddOutlined />}
            color="secondary"
            href="/admin/products/new"
          >
            Crear producto
          </Button>
        </Box>
        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
          </Grid>
        </Grid>
      </>
    </AdminLayout>
  );
};

export default ProductsPage;
