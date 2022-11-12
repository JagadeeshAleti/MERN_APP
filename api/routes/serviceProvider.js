const { mongo } = require('mongoose');

const _ = require("lodash");
const logger = require('../utils/logger');

const verifyToken = require('../middleware/authJWT');


const { ErrorHandler } = require('../utils/error');
const { UserType } = require('../constants/user-types');
const { serviceProviderController } = require('../controllers/serviceProvider.controller');

const router = require('express').Router();

//Create service provider
router.post('', verifyToken(UserType.VENDOR), async (req, res) => {
    let { serviceId, price, startTime, endTime } = req.body
    const vendorId = _.get(req, "user.vendor[0]._id");
    serviceId = new mongo.ObjectId(serviceId)
    try {
        logger.info("inside serviceProvider route");
        const result = await serviceProviderController.provideService(serviceId, vendorId, { price, startTime, endTime })
        result.error ? logger.info(result.error) : logger.info('approval sent to admin')
        res.status(200).json(result)
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

module.exports = router;