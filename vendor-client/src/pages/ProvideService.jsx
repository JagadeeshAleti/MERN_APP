import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HttpClient } from '../http/http'
import { Box, Button, Grid, TextField, Typography, LinearProgress } from '@mui/material'

const ProvideService = () => {
    const [service, setService] = useState("");
    const [openTime, setOpenTIme] = useState('00:00');
    const [closeTime, setCloseTime] = useState('00:00');
    const [phoneNo, setPhoneNo] = useState(0);
    const [sentRequest, setSentRequest] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchService()
    }, [params.id])

    const fetchService = async () => {
        const service = await HttpClient.get(`services/${params.id}`)
        setService(service)
    }

    const submitHandler = async () => {
        setSentRequest(true)

        let [h, m] = openTime.split(":")
        const startTime = ((h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? 'PM' : 'AM'));

        [h, m] = closeTime.split(":")
        const endTime = ((h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? 'PM' : 'AM'));

        let serviceProvider = { serviceId: service._id, phoneNo, startTime, endTime }
        const res = await HttpClient.post('serviceProvider', serviceProvider)

        if (res) {
            setSentRequest(false)
            navigate('/vendor/services')
        }
    }

    return (
        <Grid container item xs={12} sm={6} m="auto" mt={'5%'} rowGap={3}>
            <Grid item xs={12}>
                <Typography
                    sx={{
                        color: "blue",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 32,
                    }}
                >
                    {`${service.service} Service`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type={"time"}
                    color="primary"
                    label="Start time"
                    variant="outlined"
                    onChange={(e) => setOpenTIme(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type={"time"}
                    color="primary"
                    label="End time"
                    variant="outlined"
                    onChange={(e) => setCloseTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="primary"
                    label="Mobile"
                    variant="outlined"
                    type={'number'}
                    onChange={(e) => setPhoneNo(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' fullWidth onClick={submitHandler}>
                    SUBMIT
                </Button>
            </Grid>
            <Grid item xs={12}>
                {sentRequest && (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}

export default ProvideService
