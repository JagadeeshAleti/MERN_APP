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
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../http/http";

import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

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
        }}
      >
        Loading your services.....
      </Typography>
    </Grid>
  ) : (
    <Grid container>
      <ConfirmDialog />
      <Grid item xs={12} columnGap={2}>
        <Box sx={{ float: "right" }}>
          <Button
            variant="outlined"
            color="error"
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
                    src={service.photo}
                  ></Grid>
                  <Grid item xs={12}>
                    <Typography textAlign="center">
                      {service.service}
                    </Typography>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" fullWidth>
                    Provide Service
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
