import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  LinearProgress,
  Stack,
  Alert,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import _ from "lodash";
import joi from "joi";
import { HttpClient } from "../http/http";

const schema = joi.object({
  email: joi
    .string()
    .min(3)
    .required()
    .email({ tlds: false }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    email && password && setDisableButton(false);
    const token = localStorage.getItem("token");
    token && navigate("/home");
  }, [email, password]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isValidSchema = schema.validate({
      email,
    });

    if (isValidSchema.error) {
      const err = _.get(isValidSchema, "error.details")
        .map((d) => d.message)
        .join(",");

      setError(err + "from front end");
    }
    try {
      setIsLoading(true);
      const res = await HttpClient.post("user/login", {
        email,
        password,
        userType: "CUSTOMER",
      });
      console.log("res: ", res);
      setIsLoading(false);
      if (_.get(res, "data.token")) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/home");
      }
    } catch (err) {
      console.log("err: ", _.get(err, "response.data"));
      if (_.get(err, "response.data.err")) {
        setError(_.get(err, "response.data.err"));
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setError(_.get(err, "response.data.message"));
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate replace to="/" />;
  }

  return (
    <Grid container item xs={12} sm={6} m="auto" rowGap={2} mt={"10%"}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          value={email}
          onChange={(e) => {
            setError();
            setEmail(e.target.value);
          }}
          label="Email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          type="password"
          value={password}
          onChange={(e) => {
            setError();
            setPassword(e.target.value);
          }}
          label="Password"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          disabled={disableButton}
          variant="contained"
          onClick={onSubmitHandler}
        >
          Login
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography align="center">
          Don't have an account? <Link href="/register">register here</Link>
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
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert icon={false} variant="filled" severity="error">
              {error}
            </Alert>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
