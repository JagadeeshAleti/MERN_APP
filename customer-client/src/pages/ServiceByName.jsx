import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import _ from 'lodash'
import { HttpClient } from '../http/http'
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";

import { Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid, InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const ServiceByName = () => {
    const [services, setServices] = useState([]);
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState(null);
    const params = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const services = await HttpClient.get(`services/activeServices/customers`);
        setServices(services)
        const filter = services.filter(s => {
            return _.get(s, 'service.service') === params.serviceName
        })
        setServices(filter)
    };

    const onChangeHandler = (e) => {
        const [name, price] = e.target.value.split(':');
        console.log("Index is : ", name, price);
        setPrice(price);
        setProduct(e.target.value);
    }

    const onSubmitHandler = (id, decision) => {
        confirmDialog(`Are you sure want to book this service?`, async () => {

        });
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
                Loading requests, please wait a moment...
            </Typography>
        </Grid>
    ) : (
        <Grid container>
            <ConfirmDialog />
            <Grid container item xs={12} rowGap={5}>
                {services.map((service) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={2} key={_.get(service, 'vendor._id')}>
                        <Card style={{ boxShadow: '0 0 10px 0px grey' }}>
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

                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Price</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{product ? `${price}$` : "0$"}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel id="demo-select-small">Products</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={product}
                                                    label="Product"
                                                    onChange={(e) => onChangeHandler(e)}
                                                >
                                                    {_.get(service, 'products').map((p, index) => <MenuItem key={p._id} value={`${p.name}:${p.price}`}>
                                                        {p.name}
                                                    </MenuItem>)}

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item container xs={12}>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" color="primary" onClick={onSubmitHandler} >
                                            Book Service
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
}

export default ServiceByName
