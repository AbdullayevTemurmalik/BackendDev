const { Router } = require("express");
const users = Router();
const {
  postRegister,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
} = require("../controllers/users.controller");

const {
  registerValidationSchema,
  updateValidationSchema,
} = require("../validation/userValidation");
const { Schema } = require("mongoose");

const validationSchema = (Schema) => (req, res, next) => {
  const validationResult = Schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].message,
    });
  }
  next();
};

users.post(
  "/register",
  validationSchema(registerValidationSchema),
  postRegister,
);
users.get("/all", getUsers);
users.get("/:id", getUserById);
users.delete("/:id", deleteUserById);
users.put("/:id", validationSchema(updateValidationSchema), updateUser);

module.exports = { users };
