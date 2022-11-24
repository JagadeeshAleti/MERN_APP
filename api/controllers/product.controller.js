const { ProductRepository } = require("../repositories/product.reposiory")

module.exports.ProductController = {
    createProduct: async (body) => {
        return await ProductRepository.createProduct(body);
    },

    getProductById: async (id) => {
        return await ProductRepository.getProductById(id);
    },

    getProductsByService: async (serviceId, vendorId) => {
        return await ProductRepository.getProductsByService(serviceId, vendorId);
    },

    updateProduct: async (id, body) => {
        return await ProductRepository.updateProduct(id, body);
    }
}