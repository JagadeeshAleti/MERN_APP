const ServiceProvider = require("../models/ServiceProvider")
const logger = require("../utils/logger")

module.exports.ServiceProviderRepository = {
    provideService: async (serviceId, vendorId, { price, startTime, endTime }) => {
        logger.info('creating a new service provider entry....')
        const record = await ServiceProvider.find({serviceId, vendorId})
        if(record.length === 1) {
            return {
                error: "You are alredy providing this service, for more details contact admin"
            }
        }
        const provider = new ServiceProvider({
            serviceId, vendorId, price, startTime, endTime
        })
        return await provider.save()
    }
}