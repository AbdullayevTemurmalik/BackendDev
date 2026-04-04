const { User } = require("../model/userSchema");

const postRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastnamr,
      birthday,
      jinsi,
      adress,
      phone,
    } = req.body;
    const existingUser = await User.findOne({ username });

    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tgan foydalanuvchi mavjud",
      });
    } else {
      const newUser = new User({
        username,
        firstname,
        lastname,
        birthday,
        jinsi,
        address,
        phone,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "Ro'yhatdan o'tish muvaffaqiyatli amalga oshirildi",
        data: newUser,
      });
    }
  } catch (error) {
    console.error("Xato:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Royxatdan otish jarayonida xatolik yuz berdi",
    });
  }
};
//  ----------------Get users-----------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar royxati olingan",
      innerData: users,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message:
        "Server xatosi: Foydalanuvchilar royxati olishda xatolik yuz berdi",
    });
  }
};

module.exports = {
  postRegister,
  getUsers,
};
