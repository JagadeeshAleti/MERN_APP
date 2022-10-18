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

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await HttpClient.get(`services`);
    setServices(res);
  };

  const editService = (_id) => {
    navigate(`/admin/service/update/${_id}`);
  };

  console.log(services);

  return (
    <Grid>
      <Grid>
        <Grid>
          <Link
            href="service/new_service"
            m={"5%"}
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
        <Grid
          container
          item
          columnGap={2}
          rowGap={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 270,
                maxWidth: 270,
                border: "0.8px solid #F0F0F0",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={"bold"}>
                    {service.service}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button
                  onClick={() => {
                    editService(service._id);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => {}}>Delete</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
