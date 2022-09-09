import * as React from "react";

import { Box, CssBaseline, Typography } from "@mui/material";
import { Main } from "./Main/Main";
import { DrawerHeader } from "./Drawer/Drawer";
import { CustomAppBar } from "./AppBar/AppBar";
import { CustomDrawer } from "./Drawer/Drawer";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar open={open} onClick={handleDrawerToggle} />
      <CustomDrawer open={open} onDrawerClose={handleDrawerToggle} />
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>Hello, Welcome to vendor dashboard</Typography>
      </Main>
    </Box>
  );
};

export default Home;
