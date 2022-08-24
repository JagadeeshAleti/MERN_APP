import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import joi from "joi";

const schema = joi.object({
  email: joi
    .string()
    .min(3)
    .required()
    .email({ tlds: false }),
  password: joi
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isValidUser = schema.validate({
    email,
    password,
  });

  console.log(isValidUser);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

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
    </Grid>
  );
};

export default Login;
