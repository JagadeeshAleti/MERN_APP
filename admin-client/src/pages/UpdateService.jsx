import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpClient } from "../http/http";

const UpdateService = () => {
  const [service, setService] = useState("");
  const [file, setFile] = useState(null);
  const [updatingService, setIsUpdatingService] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const service = await HttpClient.get(`services/${params.id}`);
    setService(service.service);
  };

  const onSubmitHandler = async () => {
    setIsUpdatingService(true);

    const newService = {
      service,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newService.photo = fileName;
      console.log(newService);
      try {
        await HttpClient.post("upload", data);
      } catch (err) {}
    }

    const updatedService = await HttpClient.put(
      `services/${params.id}`,
      newService
    );
    updatedService && navigate("/admin/services");
  };
  return (
    <Grid container item sm={6} m="auto" mt={"10%"} rowGap={2}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: 32,
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Update service
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          type="text"
          label="service"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          label="Upload image"
          onChange={(e) => setFile(e.target.files[0])}
          variant="outlined"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={onSubmitHandler}>
          Update Service
        </Button>
      </Grid>
      <Grid item xs={12}>
        {updatingService && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default UpdateService;
