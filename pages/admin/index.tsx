import {
  AccessTimeOutlined,
  AttachmentOutlined,
  AttachMoney,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  PeopleOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Dashboard } from "src/core/admin/entity/Dashboard";
import { SummaryTile } from "src/view/Components/admin";
import { AdminLayout } from "src/view/layouts";
import useSWR from "swr";

const DashboardPage = () => {
  const { data, error } = useSWR<Dashboard>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  const [refresIn, setrefresIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setrefresIn((refresIn) => (refresIn > 0 ? refresIn - 1 : 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <>Cargando...</>;
  }

  if (error) {
    return <Typography> Error al cargar la informacion</Typography>;
  }

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={data.numberOfOrders}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={data.paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoney color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={data.notpaidOrders}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={data.numberOfClients}
          subTitle="Clientes"
          icon={<PeopleOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={data.numberOfProducts}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={data.productsWithNoInventory}
          subTitle="Sin existencias"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={data.lowInventory}
          subTitle="Bajo inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refresIn}
          subTitle="Actualizacion en:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
