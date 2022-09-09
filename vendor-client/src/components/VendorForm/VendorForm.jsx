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

const VendorForm = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [vendorId, setVendorId] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const vendorInfo = { ...jwt.decode(token) };
    const { refUserID: vendorId, ...others } = vendorInfo;
    setVendorId(vendorId);
  };

  const submitHandler = async () => {
    const body = { name, phoneNo };
    try {
      const res = await axios.put(
        `http://localhost:5001/api/vendor/${vendorId}`,
        body
      );

      res && navigate("/vendor/vendor-view");
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
            setName(e.target.value);
          }}
          value={name}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          onChange={(e) => {
            setError();
            setPhoneNo(e.target.value);
          }}
          value={phoneNo}
          type="number"
          id="outlined-basic"
          label="Phone"
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
