import React from "react";
import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { HttpClient } from "../http/http";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
  const [service, setService] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async () => {
    const res = await HttpClient.post(`services/create`, { service });
    res && navigate("/admin/services");
  };

  return (
    <Grid container item sm={6} m="auto" mt={"10%"} rowGap={2}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
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
          value={service}
          onChange={(e) => {
            setService(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          disabled={service ? false : true}
          fullWidth
          variant="contained"
          onClick={onSubmitHandler}
        >
          Create Service
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateService;
