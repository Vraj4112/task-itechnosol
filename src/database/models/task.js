const { DataTypes } = require("sequelize");
const sequelize = require("../db_connect").sequelize;
const Project = require("./project");

const Task = sequelize.define(
  "Task",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "done"],
      allowNull: false,
      defaultValue: "pending",
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: { model: Project, key: "id" },
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
  },
  { timestamps: true }
);

module.exports = Task;
