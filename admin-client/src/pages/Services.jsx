import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { HttpClient } from "../http/http";

import {
  Link,
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
    const res = await HttpClient.get(`services`);
    setServices(res);
  };

  const editService = (_id) => {
    navigate(`/admin/service/update/${_id}`);
  };

  const deleteService = async (_id) => {
    await HttpClient.delete(`services/${_id}`);
    await fetchServices();
  };
  console.log(services);

  return (
    <Grid container>
      <ConfirmDialog />
      <Grid item xs={12}>
        <Link
          href="service/new_service"
          sx={{
            fontSize: 32,
            color: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "underline",
          }}
        >
          Create a new service here
        </Link>
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
