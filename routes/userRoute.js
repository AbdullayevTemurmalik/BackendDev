const { Router } = require("express");
const users = Router();
const {
  postRegister,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
  searchUsers,
  postLogin,
} = require("../controllers/users.controller");

const {
  registerValidationSchema,
  updateValidationSchema,
} = require("../validation/userValidation");

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
 *   name: Users
 *   description: Foydalanuvchilarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Foydalanuvchi ro'yxatdan o'tkazish
 *     tags:
 *       - Users
 *     description: Yangi foydalanuvchini tizimga ro'yxatdan o'tkazish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi nomi
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *               firstname:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *               lastname:
 *                 type: string
 *                 description: Foydalanuvchi familiyasi
 *               birthday:
 *                 type: string
 *                 description: Foydalanuvchi tug'ilgan sanasi
 *               gender:
 *                 type: string
 *                 description: Foydalanuvchi jinsi
 *               address:
 *                 type: string
 *                 description: Foydalanuvchi manzili
 *               phones:
 *                 type: string
 *                 description: Foydalanuvchi telefon raqamlari
 *                 items:
 *                   type: string
 *               car_id:
 *                 type: string
 *                 description: Foydalanuvchining avtomobil ID raqami
 *               house_id:
 *                 type: string
 *                 description: Foydalanuvchining uy ID raqami
 *               edu_id:
 *                 type: string
 *                 description: Foydalanuvchining ta'lim ID raqami
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Noto'g'ri so'rov yuborildi
 *       500:
 *         description: Ichki server xatoligi
 */
users.post(
  "/register",
  validationSchema(registerValidationSchema),
  postRegister,
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kirishi
 *     tags: [Users]
 *     description: Username va password orqali login qilish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi nomi
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli tizimga kirdi
 *       401:
 *         description: Noto'g'ri username yoki password
 *       500:
 *         description: Ichki server xatosi
 */
users.post("/login", postLogin);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     description: Tizimdagi barcha foydalanuvchilar ro'yxatini qaytaradi
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati muvaffaqiyatli qaytarildi
 *       500:
 *         description: Ichki server xatosi
 */
users.get("/all", getUsers);

/**
 * @swagger
 * /users/searchUser:
 *   get:
 *     summary: Foydalanuvchilarni qidirish
 *     tags: [Users]
 *     description: Foydalanuvchilarni qidirish (masalan, ism yoki email bo‘yicha)
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so‘rovi orqali foydalanuvchini izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
users.get("/searchUser", searchUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: ID bo'yicha foydalanuvchini olish
 *     tags: [Users]
 *     description: foydalanuvchini ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Foydalanuvchini olish uchun ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli olindi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Ichki server xatoligi
 */
users.get("/:id", getUserById);

users.delete("/:id", deleteUserById);
users.put("/:id", validationSchema(updateValidationSchema), updateUser);

module.exports = { users };
