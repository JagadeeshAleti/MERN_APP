const logger = require("../utils/logger");
const ServiceProvider = require("../models/ServiceProvider");
const { ServiceRepository } = require("./service.repository");
const { VendorRepository } = require("./vendor.repository");

module.exports.ServiceProviderRepository = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        logger.info('creating a new service provider entry....');
        const provider = new ServiceProvider({
            serviceId, vendorId, price, startTime, endTime
        })
        return await provider.save();
    },

    getAllServiceProviders: async () => {
        logger.info('fetching all service request....');
        const serviceProvider = await ServiceProvider.find({ status: 'waitng for approval' });
        const p = serviceProvider.map(async (s) => {
            const { serviceId, vendorId, _id } = s;
            const requestDetails = await ServiceProvider.findById(_id).lean();
            const serviceDetails = await ServiceRepository.getServiceById(serviceId);
            const vendorDetails = await VendorRepository.getVendorByID(vendorId);
            return { request: requestDetails, service: serviceDetails, vendor: vendorDetails };
        })
        const result = await Promise.all(p);
        return result;
    },

    updateServiceProvider: async (id, { status }) => {
        logger.info('updating the request.....');
        await ServiceProvider.findByIdAndUpdate(id, { status });
        !status ?
            logger.info('the status of the requst is not modified') :
            logger.info(`admin ${status} your request`)
        return await ServiceProvider.findById(id);
    }
}