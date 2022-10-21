import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";

import { HttpClient } from "../http/http";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => fetchServices();

  const fetchServices = async () => {
    const services = await HttpClient.get(`services`);
    setServices(services);
  };

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
    <Grid container item xs={12} sm={8} m="auto" rowGap={2} mt={"5%"}>
      <Grid item xs={12} mb={"5%"}>
        <Typography
          sx={{
            color: "blue",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 32,
            textDecoration: "underline",
          }}
        >
          Welcome, book our services
        </Typography>
      </Grid>
      <Grid container item xs={12} rowGap={2}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{}}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    fontWeight={"bold"}
                    textAlign="center"
                  >
                    {service.service}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
                    <Button variant="outlined" color="primary" fullWidth>
                      Book Service
                    </Button>
                  </Grid>
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
