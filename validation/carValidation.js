const joi = require("joi");

const registerCarValidationSchema = joi.object({
  title: joi.string().required().trim().min(2).max(50),
  model: joi.string().required().trim(),
  description: joi.string().allow(""),
  color: joi.string().required(),
  horsePower: joi.number().required().min(1),
  carType: joi.string().required(),
  charging: joi.string().allow(""),
  weight: joi.string().required(),
  gasoline: joi.string().required(),
  yearMachine: joi.string().required(),
  price: joi.number().required().min(0),
});

const updateCarValidationSchema = joi.object({
  title: joi.string().trim().min(2).max(50),
  model: joi.string(),
  description: joi.string().allow(""),
  color: joi.string(),
  horsePower: joi.number().min(1),
  carType: joi.string(),
  charging: joi.string().allow(""),
  weight: joi.string(),
  gasoline: joi.string(),
  yearMachine: joi.string(),
  price: joi.number().min(0),
});

module.exports = { registerCarValidationSchema, updateCarValidationSchema };
