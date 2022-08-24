import React from "react";
import { Grid, Typography } from "@mui/material";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import joi from "joi";
import { useState } from "react";

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

  const onSubmitHandler = (e) => {
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

    axios
      .post("http://localhost:5000/api/user/register", user)
      .then((res) => console.log(res.data));

    // setEmail("");
    // setUsername("");
    // setPassword("");
    // setConfirmPassword("");
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
    </Grid>
  );
};

export default register;
