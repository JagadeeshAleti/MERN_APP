import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../http/http";
import _ from 'lodash'

import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";
import { Box, Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid } from "@mui/material";

const Requests = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const serviceRequests = await HttpClient.get(`serviceProvider`);
        setServices(serviceRequests)
    };

    const onSubmitHandler = (requestId, productId, decision) => {
        confirmDialog(`Are you sure want to ${decision} the service?`, async () => {
            console.log(requestId, productId, decision);
            // const res = await HttpClient.put(`serviceProvider/${id}`, { status: decision })
            // res && window.location.reload()
        });
    };

    console.log("Services are : ", services);

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
                Loading requests, please wait a moment...
            </Typography>
        </Grid>
    ) : (
        <Grid container>
            <ConfirmDialog />
            <Grid container item xs={12} rowGap={5} columnGap={5} justifyContent='center'>
                {services.map((service) => (
                    <Grid item xs={12} sm={5} md={3} key={_.get(service, 'request._id')}>
                        <Card sx={{ boxShadow: '0 0 5px teal' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Grid container item xs={12} rowGap={2}>
                                        <Grid
                                            m={"auto"}
                                            borderRadius={1}
                                            component="img"
                                            sx={{ height: 150, width: "100%", objectFit: "cover", boxShadow: "0px 0px 5px 0.5px teal" }}
                                            alt="The house from the offer."
                                            src={_.get(service, 'service.photo')}
                                        >
                                        </Grid>

                                        <Grid container item xs={12} height={"25px"}>
                                            <Grid item xs={4}>
                                                <Typography > {_.get(service, 'service.service')}</Typography>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Typography align="right">{_.get(service, 'vendor.name')}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Open Time</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{_.get(service, 'request.startTime')}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Close Time</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{_.get(service, 'request.endTime')}</Typography>
                                            </Grid>
                                        </Grid>
                                        {_.get(service, 'product').map(p =>
                                            <Grid key={p} container item xs={12}>
                                                <Grid item xs={6}>
                                                    <Typography>{p.product}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography align="right">{p.price}$</Typography>
                                                </Grid>
                                            </Grid>)

                                        }
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item container xs={12}>
                                    <Grid item xs={6}>
                                        <Button sx={{ width: '95%' }} variant="contained" color="primary" onClick={() => onSubmitHandler(_.get(service, 'request._id'), _.get(service, 'product[0]._id'), "accepted")} >
                                            Approve
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button sx={{ float: 'right', width: '95%' }} variant="contained" color="error" onClick={() => onSubmitHandler(_.get(service, 'request._id'), _.get(service, 'product[0]._id'), "decline")} >
                                            Decline
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid >
    );
};

export default Requests;
