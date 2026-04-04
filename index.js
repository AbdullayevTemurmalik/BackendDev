const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
  }
}
connectToDB();

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Routes
const { users } = require("./routes/userRoute");
app.use("/users", users);
