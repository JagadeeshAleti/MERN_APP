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
} from "@mui/material";

import {
  Visibility as VisibilityIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const CustomDrawer = ({ open, onDrawerClose, onClick }) => {
  const handleClick = () => {
    onDrawerClose();
    onClick();
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
        {["Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <VisibilityIcon /> : <UpdateIcon />}
              </ListItemIcon>
              <Button onClick={handleClick}>
                <ListItemText primary={text} />
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
