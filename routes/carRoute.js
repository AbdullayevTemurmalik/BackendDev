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
  if (result.error) {
    return res.status(400).json({
      success: false,
      message: result.error.details[0].message,
    });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Avtomobillarni boshqarish API
 */

/**
 * @swagger
 * /cars/create:
 *   post:
 *     summary: Yangi avtomobil qo‘shish
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Chevrolet Malibu 2
 *               model:
 *                 type: string
 *                 example: Malibu
 *               description:
 *                 type: string
 *                 example: Comfortable car
 *               color:
 *                 type: string
 *                 example: Black
 *               horsePower:
 *                 type: number
 *                 example: 250
 *               carType:
 *                 type: string
 *                 example: Sedan
 *               charging:
 *                 type: string
 *                 example: ""
 *               weight:
 *                 type: string
 *                 example: 1500kg
 *               gasoline:
 *                 type: string
 *                 example: Petrol
 *               yearMachine:
 *                 type: string
 *                 example: "2022"
 *               price:
 *                 type: number
 *                 example: 25000
 *             required:
 *               - title
 *               - model
 *               - color
 *               - horsePower
 *               - carType
 *               - weight
 *               - gasoline
 *               - yearMachine
 *               - price
 *     responses:
 *       201:
 *         description: Avtomobil qo‘shildi
 *       400:
 *         description: Xato request
 *       500:
 *         description: Server xatosi
 */
CarRoute.post(
  "/create",
  validationSchema(registerCarValidationSchema),
  postCar,
);

/**
 * @swagger
 * /cars/all:
 *   get:
 *     summary: Barcha avtomobillar
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of cars
 */
CarRoute.get("/all", getCars);

/**
 * @swagger
 * /cars/search:
 *   get:
 *     summary: Avtomobil qidirish
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: model yoki title bo‘yicha qidirish
 *     responses:
 *       200:
 *         description: Natija qaytdi
 *       404:
 *         description: Topilmadi
 */
CarRoute.get("/search", searchCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: ID bo‘yicha olish
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topildi
 *       404:
 *         description: Topilmadi
 */
CarRoute.get("/:id", getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: O‘chirish
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: O‘chirildi
 */
CarRoute.delete("/:id", deleteCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Yangilash
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               model:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               horsePower:
 *                 type: number
 *               carType:
 *                 type: string
 *               charging:
 *                 type: string
 *               weight:
 *                 type: string
 *               gasoline:
 *                 type: string
 *               yearMachine:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Xato
 */
CarRoute.put("/:id", validationSchema(updateCarValidationSchema), updateCar);

module.exports = { CarRoute };
