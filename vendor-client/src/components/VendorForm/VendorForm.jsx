import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";

const VendorForm = () => {
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
      <Grid item xs="12">
        <TextField
          fullWidth
          color="primary"
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12">
        <TextField
          fullWidth
          color="primary"
          type="number  "
          id="outlined-basic"
          label="Phone"
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12">
        <Button fullWidth variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default VendorForm;
