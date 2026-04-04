const { Router } = require("express");
const users = Router();

const { postRegister } = require("../controllers/users.controller");

users.post("/register", postRegister);

module.exports = { users };
