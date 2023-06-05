import React, { FC, useContext } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LoginOutlined, VpnKeyOutlined } from "@mui/icons-material";
import router, { useRouter } from "next/router";
import { AuthContext } from "src/view/context/auth/AuthContext";

interface Props {
  navigateTo: (url: string) => void;
}
const PanelLogin: FC<Props> = ({ navigateTo }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  const onLogin = () => {
    router.push("/auth/login");
  };

  return !isLoggedIn ? (
    <ListItem
      button
      onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
    >
      <ListItemIcon>
        <VpnKeyOutlined />
      </ListItemIcon>
      <ListItemText primary={"Ingresar"} />
    </ListItem>
  ) : (
    <ListItem button onClick={logout}>
      <ListItemIcon>
        <LoginOutlined />
      </ListItemIcon>
      <ListItemText primary={"Salir"} />
    </ListItem>
  );
};

export default PanelLogin;
