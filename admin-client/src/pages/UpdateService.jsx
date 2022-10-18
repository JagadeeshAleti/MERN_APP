import { Grid, TextField, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpClient } from "../http/http";

const UpdateService = () => {
  const [service, setService] = useState("");
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
    const res = await HttpClient.put(`services/${params.id}`, { service });
    res && navigate("/admin/services");
  };
  return (
    <Grid container item xs={"12"} sm={6} m="auto" mt={"10%"} rowGap={2}>
      <Grid item xs={"12"}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Update service
        </Typography>
      </Grid>
      <Grid xs={"12"}>
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
      <Grid item xs={"12"}>
        <Button fullWidth variant="contained" onClick={onSubmitHandler}>
          Update Service
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateService;
