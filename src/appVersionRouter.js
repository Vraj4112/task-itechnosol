const express = require("express");
const app = express();
const version1 = require("./appV1/v1Routes");

app.use("/v1", version1);

module.exports = app;
