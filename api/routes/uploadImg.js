const router = require('express').Router()

const logger = require('../utils/logger');
const verifyToken = require('../middleware/authJWT');

const { ErrorHandler } = require('../utils/error');
const { UserType } = require('../constants/user-types');
const { StorageService } = require('../services/storage-service');

router.post(
    "",
    [verifyToken(UserType.ADMIN)],
    async (req, res) => {
        logger.info('uploading an image....')
        try {
            if (!req.files) {
                throw new Error("File is required to upload");
            }
            const file = req.files.file

            //upload it to storage (S3/Filrebase)
            const imgUrl = await StorageService.uploadFile(file);
            imgUrl && logger.info('image uploaded successfully!!')
            res.status(201).json({ imgUrl });
        } catch (err) {
            logger.error("Error is :", err.message);
            const r = ErrorHandler.handle(err);
            res.status(r.status).json(r);
        }
    }
);

module.exports = router