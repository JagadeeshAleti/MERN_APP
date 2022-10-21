import { Grid, Typography } from "@mui/material";
import React from "react";

const First = () => {
  return (
    <Grid
      container
      item
      mt={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        color="#00008B"
        fontWeight={"bold"}
        textAlign={"center"}
      >
        Welcome to the dashboard
      </Typography>

      <Typography variant="h6" mt={5} fontWeight={"bold"}>
        We much need your satisfication :)
      </Typography>
    </Grid>
  );
};

export default First;
