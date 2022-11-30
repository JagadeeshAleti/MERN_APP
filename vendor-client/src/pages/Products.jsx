import React from 'react'
import jwt from "jsonwebtoken";

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HttpClient } from '../http/http';

import { Card, CardContent, Typography, Button, CardActionArea, CardActions, Grid } from "@mui/material";

const Products = () => {
    const [products, setProducts] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const tokenInfo = { ...jwt.decode(token) };
        const { refUserID: vendorId } = tokenInfo;
        const res = await HttpClient.get(`product/${params.serviceId}/${vendorId}`);
        setProducts(res);
    }

    return products.length === 0 ? (
        <Grid>
            <Grid item xs={12}>
                <Button
                    sx={{ float: "right" }}
                    variant='contained'
                    onClick={() => navigate(`/vendor/service/${params.serviceId}/product/create`)}
                >
                    Create
                </Button>
            </Grid>
            <Typography
                sx={{
                    fontSize: 32,
                    color: "blue",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                No products, please create product for your service...
            </Typography>
        </Grid>
    ) : (
        <Grid container rowGap={2}>
            <Grid item xs={12}>
                <Button
                    sx={{ float: "right" }}
                    variant='contained'
                    onClick={() => navigate(`/vendor/service/${params.serviceId}/product/create`)}
                >
                    Create
                </Button>
            </Grid>
            <Grid container item xs={12} rowGap={5} columnGap={5} justifyContent='center'>
                {products.map((product) => (
                    <Grid item xs={12} sm={5} md={3} key={product._id}>
                        <Card sx={{ boxShadow: '0 0 5px teal' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Grid container item xs={12} rowGap={2}>
                                        <Grid container item xs={12} height={"25px"}>
                                            <Grid item xs={6} >
                                                <Typography >Product</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right"> {product.name}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Price</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{`${product.price}$`}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Grid item xs={6}>
                                                <Typography>Discount</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography align="right">{`${product.discount}%`}</Typography>
                                            </Grid>
                                        </Grid>
                                        {product.description ?
                                            <Grid item xs={12}>
                                                <Typography color={'teal'} sx={{ width: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {product.description}
                                                </Typography>
                                            </Grid> : null
                                        }

                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            navigate(`/vendor/service/${product.serviceId}/edit/product/${product._id}`)
                                        }} >
                                        Edit
                                    </Button>

                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid >
    );
}

export default Products
