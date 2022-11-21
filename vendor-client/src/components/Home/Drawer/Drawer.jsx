import React from "react";
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ConfirmDialog, confirmDialog } from "../../../pages/ConfirmDialog";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, styled, Typography } from "@mui/material";

const drawerWidth = 270;

const routes = [
    { text: "Profile", route: "/vendor/view", icon: <VisibilityIcon /> },
    { text: "Active Services", route: "/vendor/avtive-services", icon: <AccessibilityIcon /> },
    { text: "Request Services", route: "/vendor/services", icon: <DesignServicesIcon /> },
    { text: 'Logout', route: "/login", icon: <PowerSettingsNewIcon /> }
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
    const navigate = useNavigate();

    const handleClick = (route) => {
        onDrawerClose();
        onClick(route);
    };

    const logout = () => {
        confirmDialog("Are you sure want to logout?", () => {
            localStorage.clear();
            navigate("/login");
        });
    }

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
                                {route.icon}
                            </ListItemIcon>

                            <Button onClick={() => route.text === 'Logout' ? logout() : handleClick(route)}>
                                <ListItemText primary={route.text} />
                            </Button>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
