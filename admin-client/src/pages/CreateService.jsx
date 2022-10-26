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
  const [file, setFile] = useState(null);
  const [creatingService, setCreatingService] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    setCreatingService(true);
    const newService = {
      service,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("name", fileName);
      data.append("file", file);
      newService.photo = fileName;
      console.log(newService);
      try {
        await HttpClient.post("upload", data);
      } catch (err) {}
    }
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
          onChange={(e) => setFile(e.target.files[0])}
          variant="outlined"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={service ? false : true}
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
