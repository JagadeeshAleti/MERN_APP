const logger = require("../utils/logger");
const ServiceProvider = require("../models/ServiceProvider");
const { ServiceRepository } = require("./service.repository");
const { VendorRepository } = require("./vendor.repository");
const Product = require("../models/Product");

module.exports.ServiceProviderRepository = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        logger.info('creating a new service provider entry....');
        const provider = new ServiceProvider({
            serviceId, vendorId, price, startTime, endTime
        })
        return await provider.save();
    },

    getServiceProviderById: async (id) => {
        return await ServiceProvider.findById(id);
    },

    getAllServiceProviders: async () => {
        logger.info('fetching all service request....');
        const serviceProvider = await ServiceProvider.find({ status: 'waitng for approval' });
        const p = serviceProvider.map(async (s) => {
            const { serviceId, vendorId, _id } = s;
            const requestDetails = await ServiceProvider.findById(_id).lean();
            const serviceDetails = await ServiceRepository.getServiceById(serviceId);
            const vendorDetails = await VendorRepository.getVendorByID(vendorId);
            const productDetails = await Product.find({ serviceId, vendorId });
            return { request: requestDetails, service: serviceDetails, vendor: vendorDetails, product: productDetails };
        })
        const result = await Promise.all(p);
        return result;
    },

    updateServiceProvider: async (id, body) => {
        logger.info('updating the request.....');
        await ServiceProvider.findByIdAndUpdate(id, body);
        logger.info('Service provider updated successfully')
        return await ServiceProvider.findById(id);
    }
}