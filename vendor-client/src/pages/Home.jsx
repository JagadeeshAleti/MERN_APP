import * as React from "react";

import { Box, CssBaseline } from "@mui/material";
import { Main } from "../components/Home/Main/Main";
import { DrawerHeader } from "../components/Home/Drawer/Drawer";
import { CustomAppBar } from "../components/Home/AppBar/AppBar";
import { CustomDrawer } from "../components/Home/Drawer/Drawer";
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

  const onButtonClick = (item) => {
    navigate(item.route);
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
