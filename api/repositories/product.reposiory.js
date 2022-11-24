const logger = require("../utils/logger");
const Product = require('../models/Product');

module.exports.ProductRepository = {
    createProduct: async (body) => {
        logger.info(`vendor is creating product...`);
        const newProduct = new Product(body);
        const product = await newProduct.save();
        logger.info(`product created successfully`);
        return product;
    },

    getProductById: async (id) => {
        return await Product.findById(id);
    },

    getProductsByService: async (serviceId, vendorId) => {
        logger.info(`fetching products by service`);
        const products = await Product.find({ serviceId, vendorId });
        products.length >= 1 ?
            logger.info(`Products are : ${products}`) :
            logger.info(`No products with this service id`)
        return products;
    },

    updateProduct: async (id, body) => {
        logger.info('updating product');
        const updatedProduct = await Product.findByIdAndUpdate(id, body);
        updatedProduct ?
            logger.info('product updated successfully') :
            logger.info('there is no product with the given id');
        return await Product.findById(id);
    }
}