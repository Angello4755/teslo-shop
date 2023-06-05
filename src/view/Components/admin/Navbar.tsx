import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/ui/UIContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "src/view/context/auth/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const indexEnd = user?.name.indexOf(" ");
  const firstName = user?.name.slice(0, indexEnd);

  const { toogleSideMenu } = useContext(UIContext);

  const onClick = () => {
    toogleSideMenu();
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex="1" />

        <Box flex="1" />

        {isLoggedIn ? (
          <IconButton
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <AccountCircleIcon />
            <Typography sx={{ ml: 0.5 }}>Hola {firstName}</Typography>
          </IconButton>
        ) : (
          <></>
        )}

        <Button onClick={onClick}> Menu </Button>
      </Toolbar>
    </AppBar>
  );
};
