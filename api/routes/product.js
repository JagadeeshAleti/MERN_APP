const router = require('express').Router()
const logger = require('../utils/logger');
const verifyToken = require('../middleware/authJWT');
const { mongo, default: mongoose } = require('mongoose');
const { UserType } = require('../constants/user-types');
const { ProductController } = require('../controllers/product.controller');
const { ErrorHandler } = require('../utils/error');


//Create Product
router.post('/', verifyToken(UserType.VENDOR), async (req, res) => {
    logger.info(`inside create product route`)
    try {
        const { serviceId: sid, vendorId: vid, ...others } = req.body;
        if (sid === undefined || vid === undefined) {
            throw new Error("sid and vid are null");
        }
        const serviceId = new mongo.ObjectId(sid);
        const vendorId = new mongo.ObjectId(vid);
        let body = { ...others, serviceId, vendorId };
        console.log("Body is : ", body);
        const product = await ProductController.createProduct(body);
        res.status(201).json(product);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

//get product by id 
router.get('/:id', verifyToken(UserType.VENDOR), async (req, res) => {
    logger.info(`inside get product by id route`);
    try {
        const id = new mongo.ObjectId(req.params.id);
        const product = await ProductController.getProductById(id);
        res.status(200).json(product);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

//get products by service
router.get('/:serviceId/:vendorId', verifyToken(UserType.VENDOR), async (req, res) => {
    logger.info(`inside get products by service`);
    try {
        const [serviceId, vendorId] = [new mongo.ObjectId(req.params.serviceId), new mongo.ObjectId(req.params.vendorId)];
        const products = await ProductController.getProductsByService(serviceId, vendorId);
        res.status(200).json(products);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

//update product by id
router.put('/:id', verifyToken(UserType.VENDOR, UserType.ADMIN), async (req, res) => {
    logger.info(`inside update product route`)
    try {
        const product = await ProductController.updateProduct(req.params.id, req.body);
        res.status(201).json(product);
    } catch (err) {
        logger.error(err.message);
        const r = ErrorHandler.handle(err);
        res.status(r.status).json(r);
    }
})

module.exports = router