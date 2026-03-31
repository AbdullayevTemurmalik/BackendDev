const { Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {type: String, require: true, trim: true},
    password: {type: String, require: true},
    firstname: {type: String, default: ""},
    lastname: {type: String, default: ""},
    birthday: {type: String},
    gender: {type: String, enum: ["male", "female"], alias: "jinsi"},
    address: {type: String, default: ""},
    phone: {type: String, default: ""},
})

const User = model("User", userSchema)
module.exports = { User}