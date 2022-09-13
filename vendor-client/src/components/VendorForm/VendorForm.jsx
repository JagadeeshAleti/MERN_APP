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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getConfig } from "../../config";

const VendorForm = () => {
  const [vendor, setVendor] = useState({ name: "", phoneNo: "" });
  const [vendorId, setVendorId] = useState();
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    setToken(token);
    const tokenInfo = { ...jwt.decode(token) };
    const { userID, refUserID: vendorId, ...others } = tokenInfo;
    setVendorId(vendorId);

    const userInfo = await axios.get(
      `${getConfig().backend}/vendor/${userID}`,
      {
        headers: { Authorization: token },
      }
    );
    setVendor(userInfo.data.vendor);
  };

  const submitHandler = async () => {
    const body = { name: vendor.name, phoneNo: vendor.phoneNo };
    try {
      const res = await axios.put(
        `${getConfig().backend}/vendor/${vendorId}`,
        body,
        {
          headers: { Authorization: token },
        }
      );
      res && navigate("/vendor/view");
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
          Vendor Form
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          onChange={(e) => {
            setError();
            setVendor({ name: e.target.value, phoneNo: vendor.phoneNo });
          }}
          value={vendor.name}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          onChange={(e) => {
            setError();
            setVendor({ name: vendor.name, phoneNo: e.target.value });
          }}
          value={vendor.phoneNo}
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
    </Grid>
  );
};

export default VendorForm;
