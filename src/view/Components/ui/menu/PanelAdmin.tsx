import {
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  Divider,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { FC } from "react";

interface Props {
  navigateTo: (url: string) => void;
}
export const PanelAdmin: FC<Props> = ({ navigateTo }) => {
  return (
    <>
      <Divider />
      <ListSubheader>Admin Panel</ListSubheader>
      <ListItem button onClick={() => navigateTo("/admin")}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={"Dashboars"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/admin/products")}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={"Productos"} />
      </ListItem>
      <ListItem button onClick={() => navigateTo("/admin/orders")}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={"Ordenes"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/admin/users")}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItem>
    </>
  );
};
