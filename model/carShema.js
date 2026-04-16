const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  title: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String },
  color: { type: String, required: true },
  horsePower: { type: Number, required: true },
  carType: { type: String, required: true },
  charging: { type: String },
  weight: { type: String, required: true },
  gasoline: { type: String, required: true },
  yearMachine: { type: String, required: true },
  price: { type: Number, required: true },
});

const Car = model("car", carSchema);
module.exports = { Car };
