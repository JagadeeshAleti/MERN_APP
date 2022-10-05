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
import _ from "lodash";
import joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HttpClient } from "../http/http";

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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    email && username && password && confirmPassword && setDisableButton(false);
    const token = localStorage.getItem("token");
    token && navigate("/home");
  }, [email, username, password, confirmPassword]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const isValidSchema = schema.validate({
      email,
      username,
      password,
      confirmPassword,
    });
    if (isValidSchema.error) {
      const err = _.get(isValidSchema, "error.details")
        .map((d) => d.message)
        .join(",");

      setError(err + "from front end");
    }

    const user = {
      username,
      email,
      password,
      confirmPassword,
      usertype: "ADMIN",
    };

    try {
      setIsLoading(true);
      const res = await HttpClient.post("user/register", user);
      console.log("res: " + res);
      setError(_.get(res, "response.data.err"));
      setIsLoading(false);
      navigate("/login");
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

  return (
    <Grid container item xs={12} sm={6} m={"auto"} rowGap={2} mt={"10%"}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Register
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          color="primary"
          value={email}
          onChange={(e) => {
            setError("");
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
          value={username}
          onChange={(e) => {
            setError("");
            setUsername(e.target.value);
          }}
          label="Username"
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setError("");
            setConfirmPassword(e.target.value);
          }}
          variant="outlined"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          disabled={disableButton}
          onClick={onSubmitHandler}
          variant="contained"
        >
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
        {error && (
          <Stack sx={{ width: "100%" }}>
            <Alert icon={false} variant="filled" severity="error">
              {error}
            </Alert>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default register;
