import {
  MaleOutlined,
  FemaleOutlined,
  EscalatorWarningOutlined,
} from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { FC } from "react";

interface Props {
  navigateTo: (url: string) => void;
}

const PanelGeneral: FC<Props> = ({ navigateTo }) => {
  return (
    <>
      <ListItem button onClick={() => navigateTo("/category/men")}>
        <ListItemIcon>
          <MaleOutlined />
        </ListItemIcon>
        <ListItemText primary={"Hombres"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/category/women")}>
        <ListItemIcon>
          <FemaleOutlined />
        </ListItemIcon>
        <ListItemText primary={"Mujeres"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/category/kid")}>
        <ListItemIcon>
          <EscalatorWarningOutlined />
        </ListItemIcon>
        <ListItemText primary={"Niños"} />
      </ListItem>
    </>
  );
};

export default PanelGeneral;
