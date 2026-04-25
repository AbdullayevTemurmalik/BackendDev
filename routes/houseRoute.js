const express = require("express");
const House = express.Router();

const {
  postHouse,
  getHouses,
  getHouseById,
  deleteHouseById,
  updateHouse,
  searchHouses,
} = require("../controllers/house.controller");

const {
  registerHouseValidationSchema,
  updateHouseValidationSchema,
} = require("../validation/houseValidation");

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

/**
 * @swagger
 * tags:
 *   name: House
 *   description:  Uylarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /house/create:
 *   post:
 *     summary: Yangi uy ro'yxatdan o'tkazish
 *     tags: [House]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region:
 *                 type: string
 *               city:
 *                 type: string
 *               house_number:
 *                 type: number
 *               street:
 *                 type: string
 *               family_members:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Uy muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validation xatosi
 */
House.post(
  "/create",
  validationSchema(registerHouseValidationSchema),
  postHouse,
);

/**
 * @swagger
 * /house/all:
 *   get:
 *     summary: Barcha uylarni olish
 *     tags: [House]
 *     responses:
 *       200:
 *         description: Uylar ro'yxati qaytarildi
 */
House.get("/all", getHouses);

/**
 * @swagger
 * /house/search:
 *   get:
 *     summary: Uylarni qidirish
 *     tags: [House]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Qidiruv so'zi (viloyat, shahar yoki ko'cha)
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
House.get("/search", searchHouses);

/**
 * @swagger
 * /house/{id}:
 *   get:
 *     summary: ID bo'yicha uyni olish
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uy ma'lumotlari topildi
 */
House.get("/:id", getHouseById);

/**
 * @swagger
 * /house/{id}:
 *   delete:
 *     summary: Uyni o'chirish
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uy o'chirildi
 */
House.delete("/:id", deleteHouseById);

/**
 * @swagger
 * /house/{id}:
 *   put:
 *     summary: Uy ma'lumotlarini yangilash
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region:
 *                 type: string
 *               city:
 *                 type: string
 *               house_number:
 *                 type: number
 *               street:
 *                 type: string
 *               family_members:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Uy ma'lumotlari yangilandi
 */
House.put("/:id", validationSchema(updateHouseValidationSchema), updateHouse);

module.exports = { House };
