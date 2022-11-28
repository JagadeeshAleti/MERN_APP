import React from 'react';
import jwt from "jsonwebtoken";

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HttpClient } from '../http/http';
import { Box, Button, Grid, TextField, Typography, LinearProgress, TextareaAutosize } from '@mui/material';

const CreateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState(' ');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState(' ');
    const [isCreating, setIsCreating] = useState(false);

    const submitHandler = async () => {
        setIsCreating(true);
        const token = localStorage.getItem("token");
        const tokenInfo = { ...jwt.decode(token) };
        const { refUserID: vendorId } = tokenInfo;
        const serviceId = params.serviceId;
        const product = { serviceId, vendorId, name, price, discount, description };
        const res = await HttpClient.post(`product`, product);
        if (res) {
            setIsCreating(false);
            navigate(`/vendor/service/${params.serviceId}/products`)
        }
    }

    return (
        <Grid container item xs={12} sm={6} m="auto" mt={5} rowGap={3}>
            <Grid item xs={12}>
                <Typography
                    sx={{
                        color: "blue",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 32,
                    }}
                >
                    Create New Product
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="primary"
                    label="Name"
                    value={name}
                    variant="outlined"
                    onChange={e => setName(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type={'number'}
                    color="primary"
                    value={price}
                    label="Price"
                    variant="outlined"
                    onChange={e => setPrice(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type={'number'}
                    color="primary"
                    label="Discount"
                    variant="outlined"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    value={description}
                    placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                    style={{ width: "100%" }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' color='secondary' fullWidth onClick={submitHandler}>
                    Create
                </Button>
            </Grid>
            <Grid item xs={12}>
                {isCreating && (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}

export default CreateProduct
