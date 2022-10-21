import React from "react";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
  Box,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";
import _ from "lodash";

const CustomerUpdate = () => {
  const [customer, setCustomer] = useState({ name: "", phoneNo: "" });
  const [customerId, setCustomerId] = useState();
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const tokenInfo = { ...jwt.decode(token) };
    const { userID, refUserID: customerId } = tokenInfo;
    setCustomerId(customerId);
    const customerInfo = await HttpClient.get(`customer/${userID}`);
    console.log(customerInfo);

    setCustomer(_.get(customerInfo, "customer[0]"));
  };

  const submitHandler = async () => {
    setUpdating(true);
    const body = { name: customer.name, phoneNo: customer.phoneNo };
    try {
      const res = await HttpClient.put(`customer/${customerId}`, body);
      res && navigate("/customer/view");
    } catch (err) {
      setError(err.response.data.err);
    }
  };

  return (
    <Grid container item xs={12} sm={4} m="auto" rowGap={2} mt={"10%"}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Customer Form
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          label="Name"
          onChange={(e) => {
            setError();
            setCustomer({ name: e.target.value, phoneNo: customer.phoneNo });
          }}
          value={_.get(customer, "name")}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          label="Phone"
          onChange={(e) => {
            setError();
            setCustomer({ name: customer.name, phoneNo: e.target.value });
          }}
          value={_.get(customer, "phoneNo")}
          type="number"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={submitHandler}>
          Submit
        </Button>
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
      <Grid item xs={12}>
        {updating && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default CustomerUpdate;
