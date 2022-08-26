import React from "react";
import { Grid, Typography } from "@mui/material";
import { Button, TextField, Box, LinearProgress } from "@mui/material";
import axios from "axios";
import joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = joi.object({
  email: joi
    .string()
    .min(3)
    .required()
    .email({ tlds: false }),
  username: joi
    .string()
    .min(3)
    .alphanum(),
  password: joi.string().regex(pwdRegex),
  confirmPassword: joi.string().regex(pwdRegex),
});

const register = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const isValidUser = schema.validate({
      email,
      username,
      password,
      confirmPassword,
    });

    console.log(isValidUser);
    const user = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const res = axios.post("http://localhost:5001/api/user/register", user);
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container item xs={12} sm={4} m={"auto"} rowGap={2} mt={"10%"}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Register
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth onClick={onSubmitHandler} variant="contained">
          Register
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

export default register;
