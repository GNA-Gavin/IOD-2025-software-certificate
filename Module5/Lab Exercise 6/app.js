const express = require('express')
const app = express();

const calculatorRoutes = require("./routes/calculatorroutes");

app.use("/calculator", calculatorRoutes);

module.exports = app;