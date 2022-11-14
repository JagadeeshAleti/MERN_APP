const { ServiceProviderRepository } = require("../repositories/serviceProvider.repository")

module.exports.serviceProviderController = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        return await ServiceProviderRepository.provideService(serviceId, vendorId, { price, startTime, endTime })
    },

    getAllServiceProviders: async () => {
        return await ServiceProviderRepository.getAllServiceProviders();
    },

    updateServiceProvider: async (id, {status}) => {
        return await ServiceProviderRepository.updateServiceProvider(id, {status})
    }
}