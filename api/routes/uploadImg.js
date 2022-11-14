const router = require('express').Router()
const dotenv = require("dotenv");

const Multer = require("multer");
const verifyToken = require('../middleware/authJWT');
const FirebaseStorage = require("multer-firebase-storage");

const logger = require('../utils/logger');
const { UserType } = require('../constants/user-types');

dotenv.config()

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

router.post(
    "",
    [verifyToken(UserType.ADMIN), multer.single("file")],
    (req, res) => {
        logger.info("Inside uploadImg route");
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/mern-stack-service-app.appspot.com/o/${req.file.originalname}?alt=media`;
        res.status(200).json({imgUrl});
    }
);

module.exports = router