const express = require("express");
const Edu = express.Router();
const {
  postEdu,
  getEdus,
  getEduById,
  deleteEduById,
  updateEdu,
  searchEdus,
} = require("../controllers/edu.controller");

const {
  registerEduValidationSchema,
  updateEduValidationSchema,
} = require("../validation/eduValidation");

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
 *   name: Edu
 *   description:  O'quv markazlarini boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /edu/create:
 *   post:
 *     summary: Yangi o'quv markazi qo'shish
 *     tags: [Edu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               center_name:
 *                  type: string
 *               branch:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: O'quv markazi muvaffaqiyatli yaratildi
 *       400:
 *         description: Validation xatosi
 */
Edu.post("/create", validationSchema(registerEduValidationSchema), postEdu);

/**
 * @swagger
 * /edu/all:
 *   get:
 *     summary: Barcha o'quv markazlarini olish
 *     tags: [Edu]
 *     responses:
 *       200:
 *         description: Ma'lumotlar muvaffaqiyatli qaytarildi
 */
Edu.get("/all", getEdus);

/**
 * @swagger
 * /edu/search:
 *   get:
 *     summary: O'quv markazlarini qidirish
 *     tags: [Edu]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Qidiruv so'zi (nomi yoki shahri)
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
Edu.get("/search", searchEdus);

/**
 * @swagger
 * /edu/{id}:
 *   get:
 *     summary: ID bo'yicha o'quv markazini olish
 *     tags: [Edu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'quv markazi topildi
 */
Edu.get("/:id", getEduById);

/**
 * @swagger
 * /edu/{id}:
 *   delete:
 *     summary: O'quv markazini o'chirish
 *     tags: [Edu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli o'chirildi
 */
Edu.delete("/:id", deleteEduById);

/**
 * @swagger
 * /edu/{id}:
 *   put:
 *     summary: O'quv markazi ma'lumotlarini yangilash
 *     tags: [Edu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     properties:
 *       city:
 *         type: string
 *       street:
 *         type: string
 *       center_name:
 *         type: string
 *       branch:
 *         type: string
 *       rating:
 *         type: number
 *     responses:
 *       200:
 *         description: Ma'lumotlar yangilandi
 */
Edu.put("/:id", validationSchema(updateEduValidationSchema), updateEdu);

module.exports = { Edu };
