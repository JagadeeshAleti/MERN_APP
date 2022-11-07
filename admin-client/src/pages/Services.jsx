import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../http/http";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "./ConfirmDialog";
import { Box } from "@mui/system";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await fetchServices();
  };

  const fetchServices = async () => {
    const services = await HttpClient.get(`services`);
    setServices(services);
  };

  const editService = (_id) => {
    navigate(`/admin/service/update/${_id}`);
  };

  const deleteService = async (_id) => {
    await HttpClient.delete(`services/${_id}`);
    await fetchServices();
  };
  console.log(services);

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
            onClick={() => navigate("/admin/service/new_service")}
          >
            Create
          </Button>
        </Box>

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
                    src={service.photo}
                  ></Grid>
                  <Typography textAlign="center">{service.service}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item container xs={12}>
                  <Grid item xs={4}>
                    <Button variant="outlined" color="primary">
                      View
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => editService(service._id)}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        confirmDialog("Do you want to delete service?", () =>
                          deleteService(service._id)
                        );
                      }}
                    >
                      Delete
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
