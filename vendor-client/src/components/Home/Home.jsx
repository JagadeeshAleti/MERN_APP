import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import { Main } from "./Main/Main";
import { DrawerHeader } from "./Drawer/Drawer";
import { CustomAppBar } from "./AppBar/AppBar";
import { CustomDrawer } from "./Drawer/Drawer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" && navigate("/home");
  }, [location]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const onButtonClick = () => {
    navigate("/vendor/view");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar open={open} onClick={handleDrawerToggle} />
      <CustomDrawer
        open={open}
        onDrawerClose={handleDrawerToggle}
        onClick={onButtonClick}
      />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Home;
