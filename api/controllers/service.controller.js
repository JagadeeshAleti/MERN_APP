const { ServiceRepository } = require("../repositories/service.repository");

module.exports.ServiceController = {
    createService: async ({ service, photo }) => {
        return await ServiceRepository.createService({ service, photo });
    },

    getAllServices: async () => {
        return await ServiceRepository.getAllServices();
    },

    getServicesForVednors: async () => {
        return await ServiceRepository.getServicesForVednors()
    },

    getServicesForCustomers: async () => {
        return await ServiceRepository.getServicesForCustomers()
    },
    

    getDeletedService: async () => {
        return await ServiceRepository.getDeletedService();
    },

    getServiceById: async (id) => {
        return await ServiceRepository.getServiceById(id);
    },

    updateServiceById: async (id, { service, photo }) => {
        return await ServiceRepository.updateServiceById(id, { service, photo });
    },

    deleteServiceById: async (id) => {
        return await ServiceRepository.deleteServiceById(id);
    },
};
