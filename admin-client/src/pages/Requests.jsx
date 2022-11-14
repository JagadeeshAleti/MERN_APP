import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../http/http";
import _ from 'lodash'

import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";
import { Box, Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid, } from "@mui/material";

const Requests = () => {

    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const serviceRequests = await HttpClient.get(`serviceProvider`);
        setServices(serviceRequests)
    };

    const onSubmitHandler = (id, decision) => {
        confirmDialog(`Are you sure want to ${decision} the service?`, async () => {
            console.log(id, decision);
            const res = await HttpClient.put(`serviceProvider/${id}`, { status: decision })
            res && window.location.reload()
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
                There is no current requests.....
            </Typography>
        </Grid>
    ) : (
        <Grid container>
            <ConfirmDialog />
            <Grid container item xs={12} rowGap={2}>
                {services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={_.get(service, 'request._id')}>
                        <Card>
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
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Price</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{_.get(service, 'request.price') + "$"}</Typography>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item container xs={12}>
                                    <Grid item xs={6}>
                                        <Button sx={{ width: '95%' }} variant="outlined" color="primary" onClick={() => onSubmitHandler(_.get(service, 'request._id'), "approve")} >
                                            Approve
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button sx={{ float: 'right', width: '95%' }} variant="outlined" color="error" onClick={() => onSubmitHandler(_.get(service, 'request._id'), "decline")} >
                                            Decline
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

export default Requests;
