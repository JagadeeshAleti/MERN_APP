import React from "react";
import jwt from "jsonwebtoken";
import axios from "axios";

import { useEffect, useState } from "react";
import { Grid, TextField, Typography, Link } from "@mui/material";

const VendorView = () => {
  const [user, setUser] = useState({ email: "", name: "", phoneNo: "" });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const vendorInfo = { ...jwt.decode(token) };
    const { userID, ...others } = vendorInfo;

    const userInfo = await axios.get(
      `http://localhost:5001/api/vendor/${userID}`
    );
    setUser(userInfo.data);
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
          Vendor Details
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          id="outlined-basic"
          value={user.email}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          id="outlined-basic"
          value={user && user.vendor && user.vendor.name}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          type="number  "
          id="outlined-basic"
          value={user && user.vendor && user.vendor.phoneNo}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography align="center">
          Edit details? <Link href="/vendor/vendor-form">Click here</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VendorView;
