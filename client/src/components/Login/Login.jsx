import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import joi from "joi";
import axios from "axios";

const schema = joi.object({
  email: joi
    .string()
    .min(3)
    .required()
    .email({ tlds: false }),
});
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isValidUser = schema.validate({
      email,
    });
    console.log(isValidUser);
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5001/api/user/login", {
        email,
        password,
      });

      setIsLoading(false);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    return <Navigate replace to="/home" />;
  }

  return (
    <Grid container item xs={12} sm={4} m="auto" rowGap={2} mt={"10%"}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Login
        </Typography>
      </Grid>
      <Grid item xs="12">
        <TextField
          fullWidth
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12">
        <TextField
          fullWidth
          color="primary"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12">
        <Button fullWidth variant="contained" onClick={onSubmitHandler}>
          Login
        </Button>
      </Grid>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Grid>
  );
};

export default Login;
