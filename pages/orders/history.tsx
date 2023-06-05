import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Chip, Grid, Typography, Link } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import { ShopLayout } from "src/view/layouts";
import NextLink from "next/link";
import { getSession } from "next-auth/react";
import RepositoryOrdersInMongo from "../../src/infra/database/Order/repository/RepositoryOrdersInMongo";
import GetAllOrders from "src/core/order/actions/getAllOrders";
import { IOrder } from "src/core/product/entity";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  { field: "orderId", headerName: "ORDER ID", width: 300 },
  { field: "user", headerName: "Nombre completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra informacion si esta pagada",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.isPaid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="Pendiente pago" variant="outlined" />
      );
    },
  },
  {
    field: "verOrden",
    headerName: "Ver Orden",
    description: "Consultar orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink
          href={`/orders/${params.row.orderId}`}
          passHref
          legacyBehavior
        >
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders
    ? orders.map((row, index) => ({
        id: index + 1,
        orderId: row._id,
        user: `${row.cartSummary?.shippingAddres?.name} ${row.cartSummary?.shippingAddres?.surnames}`,
        isPaid: row.isPaid,
        verOrden: "",
      }))
    : [];

  return (
    <ShopLayout
      title="Resumen orden 23342343243"
      pageDescription="Resumen de la orden"
    >
      <div>
        <Typography variant="h1" component="h1">
          Historial de ordenes
        </Typography>

        <Grid container className="fadeIn">
          <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
          </Grid>
        </Grid>
      </div>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  //Verificar la sesion del usuario
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    };
  }

  const idUser = session.user._id;

  const getAllOrders = new GetAllOrders(new RepositoryOrdersInMongo());

  const orders = await getAllOrders.execute(idUser);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
