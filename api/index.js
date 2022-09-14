const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const vendorRoute = require("./routes/vendor");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());

mongoose
  .connect(process.env.MONOGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", authRoute);
app.use("/api/vendor", vendorRoute);

app.listen("5001", () => {
  console.log("Backend is running.");
});
