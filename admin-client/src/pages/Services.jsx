import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../http/http";

import { Box, Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid, } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";

const Services = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        await fetchServices();
    };

    const fetchServices = async () => {
        const services = await HttpClient.get(`services`);
        setServices(services);
    };

    const editService = (_id) => {
        navigate(`/admin/service/update/${_id}`);
    };

    const deleteService = async (_id) => {
        await HttpClient.delete(`services/${_id}`);
        await fetchServices();
    };
    console.log(services);

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
            <Grid item xs={12} m={1}>
                <Box sx={{ float: "right" }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/admin/service/new_service")}
                    >
                        Create
                    </Button>
                </Box>
            </Grid>
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
                                    <Typography textAlign="center">{service.service}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item container xs={12}>

                                    <Grid item xs={6}>
                                        <Button
                                            sx={{ width: '95%' }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => editService(service._id)}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            sx={{ float: 'right', width: '95%' }}
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                confirmDialog("Do you want to delete service?", () =>
                                                    deleteService(service._id)
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
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
