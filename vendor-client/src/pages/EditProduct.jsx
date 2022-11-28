import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HttpClient } from '../http/http';
import { Box, Button, Grid, TextField, Typography, LinearProgress, TextareaAutosize } from '@mui/material'

const EditProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await HttpClient.get(`product/${params.id}`);
        setProductId(res._id);
        setName(res.name);
        setPrice(parseInt(res.price));
        setDescription(res.description);
        setDiscount(parseInt(res.discount));
    };

    const submitHandler = async () => {
        setIsEditing(true);
        const product = { name, price, discount, description };
        const res = await HttpClient.put(`product/${productId}`, product);
        if (res) {
            setIsEditing(false);
            navigate(`/vendor/service/${params.serviceId}/products`);
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
                    Edit Product Details
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
                    Edit
                </Button>
            </Grid>
            <Grid item xs={12}>
                {isEditing && (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}

export default EditProduct
