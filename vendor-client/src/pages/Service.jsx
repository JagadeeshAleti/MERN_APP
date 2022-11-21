import React from "react";
import jwt from "jsonwebtoken";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";

import { Box, Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid, } from "@mui/material";

const Services = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const token = localStorage.getItem("token");
        const { refUserID: vendorId } = { ...jwt.decode(token) };
        console.log(typeof vendorId);
        const services = await HttpClient.get(`services/vendor/${vendorId}`);
        setServices(services);
    };

    return services.length === 0 ? (
        <Grid>
            <Typography
                sx={{
                    fontSize: 32,
                    color: "blue",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Loading your services.....
            </Typography>
        </Grid>
    ) : (
        <Grid container>
            <ConfirmDialog />
            <Grid container item xs={12} rowGap={5} columnGap={5} justifyContent='center'>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={5} md={3} key={index}>
                        <Card sx={{ boxShadow: '0 0 5px teal' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Grid
                                        m={"auto"}
                                        borderRadius={1}
                                        component="img"
                                        sx={{ height: 150, width: "100%", objectFit: "cover" }}
                                        alt="The house from the offer."
                                        src={service.photo}
                                    >
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography textAlign="center">
                                            {service.service}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => navigate(`/vendor/service/provide/${service._id}`)}
                                    >
                                        Provide Service
                                    </Button>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Services;
