import { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CartList } from "src/view/Components/cart";
import OrderSummary from "src/view/Components/cart/OrderSummary";
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { getSession } from "next-auth/react";
import RepositoryOrdersInMongo from "../../../src/infra/database/Order/repository/RepositoryOrdersInMongo";
import Getorder from "src/core/order/actions/getOrder";
import { IOrder } from "src/core/product/entity";
import Addres from "src/view/Components/ui/adress/Addres";
import { AdminLayout } from "../../../src/view/layouts/AdminLayout";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const [paidOrder, setPaidOrder] = useState(order.isPaid);

  const { numberOfItems = 0 } = order.cartSummary as any;

  const statusOrden = paidOrder ? (
    <Chip
      sx={{ my: 2 }}
      label="Orden ya fue pagada"
      variant="outlined"
      color="success"
      icon={<CreditScoreOutlined />}
    />
  ) : (
    <Chip
      sx={{ my: 2 }}
      label="Pendiente de pago"
      variant="outlined"
      color="error"
      icon={<CreditCardOffOutlined />}
    />
  );

  return (
    <AdminLayout title={`Resumen orden`} subTitle={`OrdenId: ${order._id}`} icon = { <AirplaneTicketOutlined />}>
      <div>
        {statusOrden}

        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList products={order.orderItems} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2" component="h2">
                  {`Resumen (${numberOfItems}) ${
                    numberOfItems > 1 ? "productos" : "producto"
                  }`}
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Addres
                  shippingAddres={order.cartSummary?.shippingAddres}
                  editing={false}
                />
                <Divider sx={{ my: 1 }} />
                <OrderSummary cartSummary={order.cartSummary} />

                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  {statusOrden}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }
  const getOrder = new Getorder(new RepositoryOrdersInMongo());
  const order = await getOrder.execute(id as string);
  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
