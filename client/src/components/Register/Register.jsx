import React from "react";
import { Grid, Link, Typography } from "@mui/material";
import {
  Button,
  TextField,
  Box,
  LinearProgress,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";
import joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/home");
  }, []);

  const onSubmitHandler = async (e) => {
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
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:5001/api/user/register",
        user
      );
      console.log(res);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
      err.response.data.err
        ? setError(err.response.data.err)
        : setError("Something went wrong");
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
          onChange={(e) => {
            setIsError(false);
            setEmail(e.target.value);
          }}
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
          onChange={(e) => {
            setIsError(false);
            setUsername(e.target.value);
          }}
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
            setIsError(false);
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
            setIsError(false);
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
      <Grid item xs={12}>
        <Typography align="center">
          Already have an account <Link href="/login">login here</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        {isError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              sx={{ textAlign: "center" }}
              icon={false}
              variant="filled"
              severity="error"
            >
              {error}
            </Alert>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default register;
