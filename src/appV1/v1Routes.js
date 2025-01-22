const express = require("express");
const app = express();

const user = require("./user/router");
const project = require("./project/router");
const task = require("./task/router");

app.use("/users", user);
app.use("/project", project);
app.use("/task", task);

module.exports = app;
