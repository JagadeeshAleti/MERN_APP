import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HttpClient } from '../http/http'
import { Box, Button, Grid, TextField, Typography, LinearProgress } from '@mui/material'

const EditActiveService = () => {
    const [price, setPrice] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [phoneNo, setPhoneNo] = useState('')
    const [sentRequest, setSentRequest] = useState()


    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetchService()
    }, [params.id])

    const fetchService = async () => {
        const res = await HttpClient.get(`serviceProvider/${params.id}`)
        console.log(res);
        setPrice(res.price)
        setPhoneNo(res.phoneNo)
        setOpenTime(convertTime12to24(res.startTime))
        setCloseTime(convertTime12to24(res.endTime))
    }

    const convertTime12to24 = time12hr => {
        const time = time12hr.substr(0, time12hr.length - 2);
        const modifier = time12hr.substr(time12hr.length - 2, time12hr.length - 1);
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        console.log(`${hours}:${minutes}`);
        return `${hours}:${minutes}`;
    };

    const submitHandler = async () => {
        setSentRequest(true)

        let [h, m] = openTime.split(":")
        const startTime = ((h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? 'PM' : 'AM'));

        [h, m] = closeTime.split(":")
        const endTime = ((h % 12 ? h % 12 : 12) + ":" + m + (h >= 12 ? 'PM' : 'AM'));

        let body = { price, startTime, endTime, phoneNo, status: 'waitng for approval' }
        const res = await HttpClient.put(`serviceProvider/${params.id}`, body)

        if (res) {
            setSentRequest(false)
            navigate('/vendor/avtive-services')
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
                    Edit Request Details
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="primary"
                    value={price}
                    label="Price"
                    variant="outlined"
                    type={'number'}
                    onChange={(e) => setPrice(e.target.value)}
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
                    value={openTime.length === 4 ? `0${openTime}` : openTime}
                    label="Open time"
                    variant="outlined"
                    onChange={(e) => setOpenTime(e.target.value)}
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
                    label="Close time"
                    value={closeTime.length === 4 ? `0${closeTime}` : closeTime}
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
                    type={'number'}
                    color="primary"
                    label="Phone"
                    value={phoneNo ? phoneNo : ''}
                    variant="outlined"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
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

export default EditActiveService
