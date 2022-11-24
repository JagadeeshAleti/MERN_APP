const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const dotenv = require("dotenv");

//routes
const uploadImg = require('./routes/uploadImg');
const productRoute = require('./routes/product');
const authRoute = require("./routes/auth");
const serviceRoute = require("./routes/service");
const vendorRoute = require("./routes/vendor");
const adminRoute = require("./routes/admin");
const customerRoute = require("./routes/customer");
const serviceProvider = require('./routes/serviceProvider');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieparser());


mongoose
    .connect(process.env.MONOGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/api/uploadImg", uploadImg)
app.use("/api/product", productRoute);
app.use("/api/user", authRoute);
app.use("/api/services", serviceRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/customer", customerRoute);
app.use("/api/serviceProvider", serviceProvider)

app.listen("5001", () => {
    console.log("Backend is running.");
});
