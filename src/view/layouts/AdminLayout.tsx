import { FC, ReactElement } from "react";
import { SideMenu } from "../Components/ui";
import { Navbar } from "../Components/admin";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  children: ReactElement;
}

export const AdminLayout: FC<Props> = ({
  children,
  title = "Teslo-shop",
  subTitle,
  icon,
}) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main style={{ margin: "80px", maxWidth: "1440px", padding: "0px 30px" }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
