import React from "react";
import { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    LinearProgress,
} from "@mui/material";
import { HttpClient } from "../http/http";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
    const [service, setService] = useState("");
    const [photo, setPhoto] = useState(null);
    const [disable, setDisable] = useState(true)
    const [imgUploading, setImgUploading] = useState(false)
    const [creatingService, setCreatingService] = useState(false);

    const navigate = useNavigate();

    const uploadImage = async (e) => {
        setImgUploading(true)
        const img = e.target.files[0];
        if (img) {
            const data = new FormData();
            const fileName = img.name;
            data.append("name", fileName);
            data.append("file", img);
            try {
                const res = await HttpClient.post("uploadImg", data);
                if (res.data.imgUrl) {
                    setImgUploading(false)
                    setDisable(false)
                    setPhoto(res.data.imgUrl);
                }
            } catch (err) { }
        }
    };

    const onSubmitHandler = async () => {
        setCreatingService(true);
        const newService = {
            service,
            photo,
        };
        console.log("New service is : ", service);
        const res = await HttpClient.post(`services/create`, newService);
        res && navigate("/admin/services");
    };

    return (
        <Grid container item sm={6} m="auto" rowGap={2}>
            <Grid item xs={12}>
                <Typography
                    sx={{
                        color: "teal",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 32,
                    }}
                >
                    New service
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="primary"
                    type="text"
                    label="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    color="primary"
                    label="Upload image"
                    onChange={(e) => {
                        uploadImage(e);
                    }}
                    variant="outlined"
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            {imgUploading && <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                </Box>
            </Grid>}
            <Grid item xs={12}>
                <Button
                    disabled={disable}
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={onSubmitHandler}
                >
                    Create Service
                </Button>
            </Grid>

            <Grid item xs={12}>
                {creatingService && (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

export default CreateService;
