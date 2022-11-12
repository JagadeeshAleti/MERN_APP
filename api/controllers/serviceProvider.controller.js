const { ServiceProviderRepository } = require("../repositories/serviceProvider.repository")

module.exports.serviceProviderController = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        return await ServiceProviderRepository.provideService(serviceId, vendorId, { price, startTime, endTime })
    }
}