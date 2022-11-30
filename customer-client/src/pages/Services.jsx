import React from "react";
import _ from 'lodash';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";

import { Box, Typography, Button, Grid, } from "@mui/material";

const Services = () => {
    const [names, setNames] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const services = await HttpClient.get(`services/activeServices/customers`);
        setNames([...new Set(services.map(s => { return s.service.service }))])
    };

    return names.length === 0 ? (
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
            <Grid container item xs={12} rowGap={2}>
                {names.map((n, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Button onClick={() => { navigate(`/customer/service/${n}`) }}>{n}</Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>

    );
};

export default Services;
