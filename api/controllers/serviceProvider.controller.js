const { ServiceProviderRepository } = require("../repositories/serviceProvider.repository")

module.exports.serviceProviderController = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        return await ServiceProviderRepository.provideService(serviceId, vendorId, { price, startTime, endTime })
    },

    getServiceProviderById: async(id) => {
        return await ServiceProviderRepository.getServiceProviderById(id);
    },

    getAllServiceProviders: async () => {
        return await ServiceProviderRepository.getAllServiceProviders();
    },

    updateServiceProvider: async (id, body) => {
        return await ServiceProviderRepository.updateServiceProvider(id, body)
    }
}