import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UIContext } from "../../context/ui/UIContext";
import { CartContext } from "src/view/context/cart/CartContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "src/view/context/auth/AuthContext";

export const Navbar = () => {
  const { cartSummary } = useContext(CartContext);

  const { isLoggedIn, user } = useContext(AuthContext);
  const indexEnd = user?.name.indexOf(" ");
  const firstName = user?.name.slice(0, indexEnd);
  const router = useRouter();
  const path = router.asPath;

  const routes = {
    men: "/category/men",
    women: "/category/women",
    kid: "/category/kid",
  };

  const { toogleSideMenu } = useContext(UIContext);

  const onClick = () => {
    toogleSideMenu();
  };

  const [searchTerm, setsearchTerm] = useState("");

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
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
        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href={routes.men} passHref legacyBehavior>
            <Link>
              <Button color={routes.men === path ? "primary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={routes.women} passHref legacyBehavior>
            <Link>
              <Button color={routes.women === path ? "primary" : "info"}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={routes.kid} passHref legacyBehavior>
            <Link>
              <Button color={routes.kid === path ? "primary" : "info"}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

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

        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            className="fadeIn"
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
                  <ClearOutlined onClick={() => setIsSearchVisible(false)} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={onClick}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge
                badgeContent={
                  cartSummary.numberOfItems > 9
                    ? "+9"
                    : cartSummary.numberOfItems
                }
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={onClick}> Menu </Button>
      </Toolbar>
    </AppBar>
  );
};
