import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";

import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";

const Services = () => {
  const [services, setServices] = useState([]);
  //const [vendors, setVednors] = useState([]);
  //const [selectedVendor, setSelectedVendor] = useState([]);

  const PF =
    "https://firebasestorage.googleapis.com/v0/b/mern-stack-service-app.appspot.com/o/";
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = () => fetchServices();

  const fetchServices = async () => {
    const services = await HttpClient.get(`services`);
    //const vendors = await HttpClient.get(`vendor`);
    //setVednors(vendors);
    setServices(services);
  };

  // const handleChange = (event, index) => {
  //   const currentSelectedVendor = [...selectedVendor];
  //   currentSelectedVendor[index] = event.target.value;
  //   setSelectedVendor(currentSelectedVendor);
  // };

  return services.length === 0 ? (
    <Grid>
      <Typography
        sx={{
          fontSize: 32,
          color: "blue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "underline",
        }}
      >
        Loading your services.....
      </Typography>
    </Grid>
  ) : (
    <Grid container>
      <ConfirmDialog />
      <Grid container item xs={12} columnGap={2}>
        <Box sx={{ float: "right" }}>
          <Button
            variant="outlined"
            onClick={() => {
              confirmDialog("Are you sure want to logout?", () => {
                localStorage.clear();
                navigate("/login");
              });
            }}
          >
            Logout
          </Button>
        </Box>
      </Grid>
      <Grid container item xs={12} rowGap={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Grid
                    component="img"
                    sx={{
                      height: 150,
                      width: 350,
                      maxHeight: { xs: 150, md: 175 },
                      maxWidth: { xs: 350, md: 375 },
                      objectFit: "cover",
                    }}
                    alt="The house from the offer."
                    src={
                      PF +
                      service.photo +
                      "?alt=media&token=c19f2d0a-f254-4391-b589-ef7ee3cad9f5"
                    }
                  ></Grid>
                  <Grid item xs={12}>
                    <Typography textAlign="center">
                      {service.service}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                      <InputLabel id="demo-select-small">
                        Select Vendor
                      </InputLabel>
                      {/* <Select
                        size="small"
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={selectedVendor[index] || ""}
                        label="Select Vendor"
                        onChange={(e) => handleChange(e, index)}
                      >
                        {vendors.map((vendor) => (
                          <MenuItem
                            key={vendor._id}
                            value={vendor.name}
                            id={vendor.name}
                          >
                            {vendor.name}
                          </MenuItem>
                        ))}
                      </Select> */}
                    </FormControl>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Book Service
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Services;
