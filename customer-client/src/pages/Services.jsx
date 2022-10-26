import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useState, useEffect } from "react";

import { HttpClient } from "../http/http";

const Services = () => {
  const [services, setServices] = useState([]);
  const [vendors, setVednors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const PF = "http://localhost:5001/images/";

  useEffect(() => {
    init();
  }, []);

  const init = () => fetchServices();

  const fetchServices = async () => {
    const services = await HttpClient.get(`services`);
    const vendors = await HttpClient.get(`vendor`);
    setVednors(vendors);
    setServices(services);
  };

  const handleChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  console.log(selectedVendor);
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
      <Grid container item xs={12}>
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
                    src={PF + service.photo}
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
                      <Select
                        size="small"
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={selectedVendor}
                        label="Select Vendor"
                        onChange={handleChange}
                      >
                        {vendors.map((vendor) => (
                          <MenuItem key={vendor._id} value={vendor.name}>
                            {vendor.name}
                          </MenuItem>
                        ))}
                      </Select>
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
