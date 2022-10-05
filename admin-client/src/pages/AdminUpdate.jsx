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
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";
import _ from "lodash";

const AdminUpdate = () => {
  const [admin, setAdmin] = useState({ name: "", phoneNo: "" });
  const [adminID, setadminID] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const tokenInfo = { ...jwt.decode(token) };
    const { userID, refUserID: adminID } = tokenInfo;
    setadminID(adminID);
    const adminInfo = await HttpClient.get(`admin/${userID}`);
    console.log(_.get(adminInfo, "admin[0]"));
    setAdmin(_.get(adminInfo, "admin[0]"));
  };

  const submitHandler = async () => {
    const body = { name: admin.name, phoneNo: admin.phoneNo };
    try {
      const res = await HttpClient.put(`admin/${adminID}`, body);
      res && navigate("/admin/view");
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
            setAdmin({ name: e.target.value, phoneNo: admin.phoneNo });
          }}
          value={admin.name}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          color="primary"
          onChange={(e) => {
            setError();
            setAdmin({ name: admin.name, phoneNo: e.target.value });
          }}
          value={admin.phoneNo}
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

export default AdminUpdate;
