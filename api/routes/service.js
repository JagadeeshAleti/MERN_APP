
const router = require("express").Router();
const mongoose = require('mongoose');
const logger = require("../utils/logger");

const verifyToken = require("../middleware/authJWT");

const { ServiceController } = require("../controllers/service.controller");
const { ErrorHandler } = require("../utils/error");
const { UserType } = require("../constants/user-types");

//create a new service
router.post("/create", verifyToken(UserType.ADMIN), async (req, res) => {
    const { service, photo } = req.body;
    try {
        logger.info(`/create: creating service ${service}`);
        const result = await ServiceController.createService({ service, photo });
        res.status(201).json(result);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

//get all services
router.get(
    "/",
    verifyToken(UserType.ADMIN, UserType.CUSTOMER, UserType.VENDOR),
    async (req, res) => {
        try {
            logger.info(`/: fetching all services`);
            const services = await ServiceController.getAllServices();
            res.status(200).json(services);
        } catch (err) {
            logger.error(err.message);
            const r = ErrorHandler.handle(err);
            res.status(r.status).json(r);
        }
    }
);

//get deleted services
router.get(
    "/deletedServices",
    verifyToken(UserType.ADMIN),
    async (req, res) => {
        try {
            logger.info(`/: fetching deleted services`);
            const services = await ServiceController.getDeletedService();
            res.status(200).json(services);
        } catch (err) {
            logger.error(err.message);
            const r = ErrorHandler.handle(err);
            res.status(r.status).json(r);
        }
    }
);

//get service by id
router.get("/:id", verifyToken(UserType.ADMIN, UserType.VENDOR), async (req, res) => {
    const id = req.params.id;
    try {
        logger.info(`/:${id} fetching service ....`);
        const services = await ServiceController.getServiceById(id);
        res.status(200).json(services);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

//get accepted services for the vendor customer
router.get("/vendor/:id", verifyToken(UserType.VENDOR), async (req, res) => {
    logger.info(`fetching services for vendors....`);
    const vendorId = mongoose.Types.ObjectId(req.params.id)
    console.log("Vendor id is : ", vendorId);
    try {
        const services = await ServiceController.getServicesForVednors(vendorId);
        res.status(200).json(services);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

//get  accepted services for the customers
router.get("/activeServices/customers", verifyToken(UserType.CUSTOMER, UserType.VENDOR), async (req, res) => {
    try {
        logger.info(`fetching services for customers....`);
        const services = await ServiceController.getServicesForCustomers();
        res.status(200).json(services);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

//update service by id
router.put("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
    const id = req.params.id;
    const { service, photo } = req.body;
    try {
        logger.info(`/${id} updating service....`);
        const updatedService = await ServiceController.updateServiceById(id, {
            service,
            photo,
        });
        res.status(200).json(updatedService);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

router.delete("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
    const id = req.params.id;
    try {
        const deletedService = await ServiceController.deleteServiceById(id);
        res.status(200).json(deletedService);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
});

module.exports = router;
