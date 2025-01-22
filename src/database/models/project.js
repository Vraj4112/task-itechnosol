const { DataTypes } = require("sequelize");
const sequelize = require("../db_connect").sequelize;
const User = require("./user");

const Project = sequelize.define(
  "Project",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Project;
