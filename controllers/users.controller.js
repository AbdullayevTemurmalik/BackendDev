const { User } = require("../model/userSchema");

const postRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      gender,
      address,
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
        password,
        firstname,
        lastname,
        birthday,
        gender,
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

//  ----------------Get users by id-----------------

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  ----------------Delete user by id-----------------

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "Foydalanuvchi topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: O'chirishda xatolik yuz berdi",
    });
  }
};

//  ----------------Update user by id-----------------

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, lastname, phone, address, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, lastname, phone, address, password },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Failed to update user",
    });
  }
};

module.exports = {
  postRegister,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
};
