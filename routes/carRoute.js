const express = require("express");
const CarRoute = express.Router();
const {
  postCar,
  getCars,
  getCarById,
  deleteCarById,
  updateCar,
  searchCars,
} = require("../controllers/car.controller");
const {
  registerCarValidationSchema,
  updateCarValidationSchema,
} = require("../validation/carValidation");

const validationSchema = (Schema) => (req, res, next) => {
  const result = Schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ success: false, message: result.error.details[0].message });
  next();
};

CarRoute.post(
  "/create",
  validationSchema(registerCarValidationSchema),
  postCar,
);
CarRoute.get("/all", getCars);
CarRoute.get("/search", searchCars);
CarRoute.get("/:id", getCarById);
CarRoute.delete("/:id", deleteCarById);
CarRoute.put("/:id", validationSchema(updateCarValidationSchema), updateCar);

module.exports = { CarRoute };
