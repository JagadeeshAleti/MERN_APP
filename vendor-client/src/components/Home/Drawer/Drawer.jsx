import React from "react";
import { Button, styled, Typography } from "@mui/material";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

import { Visibility as VisibilityIcon } from "@mui/icons-material";
import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";

const drawerWidth = 240;

const routes = [
  {
    text: "Profile",
    route: "/vendor/view",
  },
  {
    text: "Services",
    route: "/vendor/services",
  },
];

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const CustomDrawer = ({ open, onDrawerClose, onClick }) => {
  const handleClick = (route) => {
    onDrawerClose();
    onClick(route);
  };
  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="temporary"
      onClose={onDrawerClose}
      anchor="left"
      open={open}
    >
      <DrawerHeader style={{ padding: "0px" }}>
        <Box
          sx={{ backgroundColor: "#3f50b5", display: "flex" }}
          p={0}
          width="100%"
          height="100%"
        >
          <Typography
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
            variant="h6"
            component="div"
          >
            Vendor Dashboard
          </Typography>
        </Box>
      </DrawerHeader>

      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem key={route.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <VisibilityIcon />
                ) : (
                  <DesignServicesTwoToneIcon />
                )}
              </ListItemIcon>

              <Button onClick={() => handleClick(route)}>
                <ListItemText primary={route.text} />
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
