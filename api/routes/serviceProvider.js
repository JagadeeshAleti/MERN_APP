const router = require('express').Router();
const { mongo } = require('mongoose');

const _ = require("lodash");
const logger = require('../utils/logger');
const verifyToken = require('../middleware/authJWT');

const { ErrorHandler } = require('../utils/error');
const { UserType } = require('../constants/user-types');
const { serviceProviderController } = require('../controllers/serviceProvider.controller');


//Create service request
router.post('', verifyToken(UserType.VENDOR), async (req, res) => {
    let { serviceId, price, startTime, endTime } = req.body
    const vendorId = _.get(req, "user.vendor[0]._id");
    serviceId = new mongo.ObjectId(serviceId)
    try {
        logger.info("creating request for the vendor");
        const result = await serviceProviderController.provideService(serviceId, vendorId, { price, startTime, endTime })
        result.error ? logger.info(result.error) : logger.info('approval sent to admin')
        res.status(200).json(result)
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

//get service request by id
router.get('/:id', verifyToken(UserType.VENDOR), async (req, res) => { 
    logger.info('inside get service provider route');
    const id = new mongo.ObjectId(req.params.id);
    try {
        const result = await serviceProviderController.getServiceProviderById(id);
        res.status(201).json(result);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }

})

//get all service requests
router.get('', verifyToken(UserType.ADMIN), async (req, res) => {
    logger.info('get all the requests for admin')
    try {
        const result = await serviceProviderController.getAllServiceProviders();
        res.status(201).json(result)
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

//update a service request by id
router.put('/:id', verifyToken(UserType.ADMIN, UserType.VENDOR), async (req, res) => {
    logger.info('inside updating service provider route')
    const id = req.params.id;
    const body = req.body
    console.log("Body is : ", body);
    try {
        const updatedReq = await serviceProviderController.updateServiceProvider(id, body)
        res.status(201).json(updatedReq)
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

module.exports = router;