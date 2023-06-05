import {
  Box,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { UIContext } from "../../context/ui/UIContext";
import { useRouter } from "next/router";
import { AuthContext } from "src/view/context/auth/AuthContext";
import { PanelAdmin } from "./menu/PanelAdmin";
import PanelLogin from "./menu/PanelLogin";
import PanelGeneral from "./menu/PanelGeneral";

export const SideMenu = () => {
  const { isMenuOpen, toogleSideMenu } = useContext(UIContext);

  const { isLoggedIn, user } = useContext(AuthContext);

  const [searchTerm, setsearchTerm] = useState("");

  const router = useRouter();

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toogleSideMenu();
    router.push(url);
  };

  const showPanelAdmin = isLoggedIn && user?.role === "admin";

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toogleSideMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/orders/history")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </>
          )}

          {<PanelGeneral navigateTo={navigateTo} />}

          {<PanelLogin navigateTo={navigateTo} />}

          {showPanelAdmin && <PanelAdmin navigateTo={navigateTo} />}
        </List>
      </Box>
    </Drawer>
  );
};
