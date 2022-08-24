const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONOGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
