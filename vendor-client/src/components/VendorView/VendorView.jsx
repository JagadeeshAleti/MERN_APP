import React from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import _ from "lodash";

import { useEffect, useState } from "react";
import { Grid, Typography, Link, Avatar, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { getConfig } from "../../config";

const VendorView = () => {
  const [user, setUser] = useState({ email: "", name: "", phoneNo: "" });
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const vendorInfo = { ...jwt.decode(token) };
    const { refUserID, ...others } = vendorInfo;

    const userInfo = await axios.get(
      `${getConfig().backend}/vendor/${refUserID}`,
      {
        headers: { Authorization: token },
      }
    );
    setUser(userInfo.data);
  };

  return (
    <Grid container item xs={12} mt={5}>
      <Grid container item xs={12} sm={4} rowGap={2} m="auto">
        <Grid item xs={12}>
          <Box width={150} height={150} m="auto">
            <Avatar
              variant={"rounded"}
              alt="The image"
              src={
                "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg"
              }
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            textAlign={"center"}
            fontSize={20}
            fontWeight={"bold"}
            color={"#0047AB"}
            sx={{ textDecoration: "underline" }}
          >
            {_.get(user, "vendor.name")}
          </Typography>
        </Grid>
        <Grid container rowGap={2} item width={200} m="auto">
          <Grid item xs={12}>
            <Box display={"flex"} width={200}>
              <Box width={75}>
                <Typography color={"#0047AB"}>Email</Typography>
              </Box>
              <Typography>{user.email}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} display={"flex"}>
            <Box display={"flex"} width={200}>
              <Box width={75}>
                <Typography color={"#0047AB"}>Phone</Typography>
              </Box>
              <Typography>{_.get(user, "vendor.phoneNo")}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box width={200} m="auto">
            <Typography textAlign={"center"}>
              Edit details? <Link href="/vendor/update">Click here</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VendorView;
