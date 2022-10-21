import React from "react";
import { styled, AppBar as MuiAppBar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { Toolbar, Typography, IconButton } from "@mui/material";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const CustomAppBar = ({ open, onClick }) => {
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Customer Dashboard
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};
