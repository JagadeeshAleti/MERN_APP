const { ServiceRepository } = require("../repositories/service.repository");

module.exports.ServiceController = {
  createService: async ({ service }) => {
    return await ServiceRepository.createService({ service });
  },

  getAllServices: async () => {
    return await ServiceRepository.getAllServices();
  },

  getDeletedService: async () => {
    return await ServiceRepository.getDeletedService();
  },

  getServiceById: async (id) => {
    return await ServiceRepository.getServiceById(id);
  },

  updateServiceById: async (id, { service }) => {
    return await ServiceRepository.updateServiceById(id, { service });
  },

  deleteServiceById: async (id) => {
    return await ServiceRepository.deleteServiceById(id);
  },
};
