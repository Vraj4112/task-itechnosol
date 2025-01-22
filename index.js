require("dotenv").config();

const createDatabase = require("./src/database/db_connect").connectSqlDb;
const sequelize = require("./src/database/db_connect.js").sequelize;
const initAssociations = require("./src/database/models/associations.js");
const src = require("./src/appVersionRouter.js");

const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression")();
const cors = require("cors")();
const helmet = require("helmet")();

const app = express();

const PORT = process.env.PORT || 3002;

// Middleware
app.use(compression);
app.use(cors);
app.use(helmet);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Test Route
app.get("/", (req, res) => {
  res.send("App run success!");
});

app.use("/api", src); // app entry point

// Start the server
const initializeSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successfully.");
    await initAssociations();
    await sequelize.sync({});
    console.log("Database sync.");
  } catch (error) {
    console.error("Unable to connect to the database", error);
    throw error;
  }
};
const main = async () => {
  try {
    await createDatabase();
    await initializeSequelize();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};
main();

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ errorMsg: err, message: "Something went wrong!" });
});
