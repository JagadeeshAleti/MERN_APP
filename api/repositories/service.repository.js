const Service = require("../models/Service");
const logger = require("../utils/logger");

module.exports.ServiceRepository = {
  createService: async ({ service }) => {
    logger.info(`creating a service.....`);
    const newService = new Service({
      service,
    });
    return await newService.save();
  },

  getAllServices: async () => {
    logger.info(`fetching all services from db...`);
    return await Service.find({ isDeleted: false });
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

  updateServiceById: async (id, { service }) => {
    logger.info(`updating service in db...`);
    await Service.findByIdAndUpdate(id, { service });
    return Service.findById(id);
  },

  deleteServiceById: async (id) => {
    logger.info(`deleting service ...`);
    await Service.findByIdAndUpdate(id, { isDeleted: true });
    return await Service.findById(id);
  },
};
