const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const Multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");

const CircularJSON = require("circular-json");
const dotenv = require("dotenv");
const path = require("path");

//logger
const logger = require("./utils/logger");

//routes
const authRoute = require("./routes/auth");
const serviceRoute = require("./routes/service");
const vendorRoute = require("./routes/vendor");
const adminRoute = require("./routes/admin");
const customerRoute = require("./routes/customer");
const verifyToken = require("./middleware/authJWT");
const { UserType } = require("./constants/user-types");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONOGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const multer = Multer({
  storage: FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    credentials: {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    },
  }),
});

app.post(
  "/api/upload",
  [verifyToken(UserType.ADMIN), multer.single("file")],
  (req, res) => {
    logger.info("uploading imagee.....");
    res.status(200).json({
      imgUrl: `https://firebasestorage.googleapis.com/v0/b/mern-stack-service-app.appspot.com/o/${req.file.originalname}?alt=media`,
    });
  }
);

app.use("/api/user", authRoute);
app.use("/api/services", serviceRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/customer", customerRoute);

app.listen("5001", () => {
  console.log("Backend is running.");
});
