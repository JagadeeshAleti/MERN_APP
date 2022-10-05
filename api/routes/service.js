const router = require("express").Router();
const logger = require("../utils/logger");
const { ServiceController } = require("../controllers/service.controller");
const verifyToken = require("../middleware/authJWT");
const { ErrorHandler } = require("../utils/error");
const { UserType } = require("../constants/user-types");

router.post("/create", verifyToken(UserType.ADMIN), async (req, res) => {
  const { service } = req.body;
  try {
    logger.info(`/create: creating service ${service}`);
    const result = await ServiceController.createService({ service });
    res.status(201).json(result);
  } catch (err) {
    logger.error(err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

router.get("/", verifyToken(UserType.ADMIN), async (req, res) => {
  try {
    logger.info(`/: fetching all services`);
    const services = await ServiceController.getAllServices();
    res.status(200).json(services);
  } catch (err) {
    logger.error(err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

router.get(
  "/deletedServices",
  verifyToken(UserType.ADMIN),
  async (req, res) => {
    try {
      logger.info(`/: fetching deleted services`);
      const services = await ServiceController.getDeletedService();
      res.status(200).json(services);
    } catch (err) {
      logger.error(err.message);
      const r = ErrorHandler.handle(err);
      res.status(r.status).json(r);
    }
  }
);

router.get("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
  const id = req.params.id;
  try {
    logger.info(`/:${id} fetching service ....`);
    const services = await ServiceController.getServiceById(id);
    res.status(200).json(services);
  } catch (err) {
    logger.error(err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

router.put("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
  const id = req.params.id;
  const { service } = req.body;
  try {
    logger.info(`/${id} updating service....`);
    const updatedService = await ServiceController.updateServiceById(id, {
      service,
    });
    res.status(200).json(updatedService);
  } catch (err) {
    logger.error(err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

router.delete("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
  const id = req.params.id;
  try {
    const deletedService = await ServiceController.deleteServiceById(id);
    res.status(200).json(deletedService);
  } catch (err) {
    logger.error(err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

module.exports = router;
