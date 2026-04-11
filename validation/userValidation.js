const joi = require("joi");

const registerValidationSchema = joi.object({
  username: joi.string().required().trim().min(3).max(30),

  password: joi
    .string()
    .required()
    .trim()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    ),

  firstname: joi.string(),
  lastname: joi.string(),
  birthday: joi.date(),
  gender: joi.string(),
  address: joi.string(),
  phone: joi.string().pattern(/^\+998\d{9}$/),
});

const updateValidationSchema = joi.object({
  username: joi.string().trim().min(3).max(30),

  password: joi
    .string()
    .trim()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    ),

  firstname: joi.string(),
  lastname: joi.string(),
  birthday: joi.date(),
  gender: joi.string(),
  address: joi.string(),
  phone: joi.string().pattern(/^\+998\d{9}$/),
});

module.exports = {
  registerValidationSchema,
  updateValidationSchema,
};
