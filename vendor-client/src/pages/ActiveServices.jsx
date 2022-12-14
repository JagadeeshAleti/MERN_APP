import React from "react";
import _ from 'lodash';
import jwt from "jsonwebtoken";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";

import { Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid, } from "@mui/material";


const ActiveServices = () => {
    const [services, setServices] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const services = await HttpClient.get(`services/activeServices/customers`);
        const token = localStorage.getItem("token");
        const tokenInfo = { ...jwt.decode(token) };
        const { refUserID: vendorId } = tokenInfo;
        const filter = services.filter(s => _.get(s, 'vendor.vendorId') === vendorId)
        setServices(filter)
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
                Currently you don't have any active services....
            </Typography>
        </Grid>
    ) : (
        <Grid container>
            <Grid container item xs={12} rowGap={5}>
                {services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={2} key={_.get(service, 'vendor._id')}>
                        <Card sx={{ boxShadow: '0 0 10px 0px grey' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Grid container item xs={12} rowGap={2}>
                                        <Grid
                                            component="img"
                                            sx={{ height: 300, width: "100%", objectFit: "cover" }}
                                            alt="The house from the offer."
                                            src={_.get(service, 'service.photo')}
                                        >
                                        </Grid>

                                        <Grid container item xs={12} height={"25px"}>
                                            <Grid item xs={6} >
                                                <Typography >Serivce</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right"> {_.get(service, 'service.service')}</Typography>
                                            </Grid>

                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Open Time</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{_.get(service, 'vendor.startTime')}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Close Time</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{_.get(service, 'vendor.endTime')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item container xs={12}>
                                    <Grid item xs={6}>
                                        <Button sx={{ width: '95%' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/vendor/service/editService/${_.get(service, 'vendor._id')}`)
                                            }} >
                                            Edit
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button sx={{ float: 'right', width: '95%' }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                navigate(`/vendor/service/${_.get(service, 'service._id')}/products`)
                                            }} >
                                            Products
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

export default ActiveServices;
