const Service = require("../models/Service");
const ServiceProvider = require("../models/ServiceProvider");
const logger = require("../utils/logger");

module.exports.ServiceRepository = {
    createService: async ({ service, photo }) => {
        logger.info(`creating a service.....`);
        const newService = new Service({
            service,
            photo,
        });
        return await newService.save();
    },

    getAllServices: async () => {
        logger.info(`fetching all services from db...`);
        return await Service.find({ isDeleted: false });
    },

    getServicesForVednors: async (id) => {
        logger.info('fetching services for the vendor...')
        const acceptedServices = await ServiceProvider.find({ vendorId: id, status: { $in: ["accepted", "waitng for approval"] } });
        let acceptedSIds = acceptedServices.map(a => a.serviceId.toString());
        const allServices = await Service.find({ isDeleted: false });
        let filteredService = allServices.filter(s => {
            return !acceptedSIds.includes(s._id.toString());
        })
        return filteredService;
    },

    getServicesForCustomers: async () => {
        logger.info(`fetching services for the customers`);
        const acceptedServices = await ServiceProvider.find({ status: "accepted" });
        const res = acceptedServices.map(async s => {
            const service = await Service.findById(s.serviceId);
            return {service,  vendor: s};
        })
        const r = Promise.all(res);
        return r;
    },

    getDeletedService: async () => {
        logger.info(`fetching deleted services from db...`);
        return await Service.find({ isDeleted: true });
    },

    getServiceById: async (id) => {
        logger.info(`fetching services with id ${id}`);
        const service = await Service.findById(id);
        if (service.isDeleted === false) {
            return service;
        }
        return null;
    },

    updateServiceById: async (id, { service, photo }) => {
        logger.info(`updating service in db...`);
        await Service.findByIdAndUpdate(id, { service, photo });
        return Service.findById(id);
    },

    deleteServiceById: async (id) => {
        logger.info(`deleting service ...`);
        await Service.findByIdAndUpdate(id, { isDeleted: true });
        return await Service.findById(id);
    },
};
