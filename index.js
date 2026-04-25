const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
  }
}
connectToDB();

const { users } = require("./routes/userRoute");
app.use("/users", users);

const { Edu } = require("./routes/eduRoute");
app.use("/edu", Edu);

const { House } = require("./routes/houseRoute");
app.use("/house", House);

const { CarRoute } = require("./routes/carRoute");
app.use("/cars", CarRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger dokumentatsiya: http://localhost:${PORT}/api-docs`);
});
