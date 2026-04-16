const { Car } = require("../model/carShema");

//  ----------------Post car-----------------

const postCar = async (req, res) => {
  try {
    const {
      title,
      model,
      description,
      color,
      horsePower,
      carType,
      charging,
      weight,
      gasoline,
      yearMachine,
      price,
    } = req.body;

    const existingCar = await Car.findOne({ title, model, yearMachine });

    if (existingCar) {
      return res.status(400).json({
        success: false,
        message: "Bu mashina allaqachon mavjud",
      });
    } else {
      const newCar = new Car({
        title,
        model,
        description,
        color,
        horsePower,
        carType,
        charging,
        weight,
        gasoline,
        yearMachine,
        price,
      });
      await newCar.save();
      return res.status(201).json({
        success: true,
        message: "Mashina muvaffaqiyatli qo'shildi",
        data: newCar,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//  ----------------Get cars-----------------

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({
      success: true,
      innerData: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//  ----------------Get car by id-----------------

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Mashina topilmadi" });
    }
    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi" });
  }
};

//  ----------------Delete car by id-----------------

const deleteCarById = async (req, res) => {
  try {
    const carId = req.params.id;

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "O'chirilishi kerak bo'lgan mashina topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Mashina muvaffaqiyatli o'chirildi",
      data: deletedCar,
    });
  } catch (error) {
    console.error("Xato:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: O'chirishda xatolik yuz berdi",
    });
  }
};

//  ----------------Update car by id-----------------

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      model,
      description,
      color,
      horsePower,
      carType,
      charging,
      weight,
      gasoline,
      yearMachine,
      price,
    } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        title,
        model,
        description,
        color,
        horsePower,
        carType,
        charging,
        weight,
        gasoline,
        yearMachine,
        price,
      },
      { returnDocument: "after" },
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Mashina topilmadi",
      });
    }
    res.json({
      success: true,
      message: "Mashina muvaffaqiyatli yangilandi",
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//  ----------------Search cars-----------------

const searchCars = async (req, res) => {
  try {
    const { query } = req.query;
    const result = await Car.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Topilmadi",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = {
  postCar,
  getCars,
  getCarById,
  deleteCarById,
  updateCar,
  searchCars,
};
