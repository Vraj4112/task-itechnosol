const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE || "task_management_dB",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "123456",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
      insecureAuth: true,
    },
    //logging: console.log,
    define: {
      charset: "utf8mb4",
    },
  }
);
// -- just creating task_management_dB schema in mysql local database
var mysql = require("mysql2/promise");
let localConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  multipleStatements: true,
  insecureAuth: true,
  charset: "utf8mb4",
};
let connectSqlDb = async function () {
  console.log("---DB connecting:---");
  const schema_query_string =
    "CREATE DATABASE IF NOT EXISTS `task_management_dB`";
  try {
    let sqlConnect = await mysql.createConnection(localConfig);
    console.log("Connected as id " + sqlConnect.threadId);
    const [results, fields] = await sqlConnect.execute(schema_query_string);
    if (results) {
      console.log("Schema 'task_management_dB' created or already exists.");
    }
    await sqlConnect.end();
  } catch (err) {
    console.error("Error connecting: " + err.stack);
  }
};

module.exports = { sequelize, connectSqlDb };
