const express = require("express");
const router = express.Router();
const Controllers = require("../controller");

// Query parameter routes
// GET /api/weather?city=Bangkok
router.get("/", (req, res) => {
  Controllers.weatherController.getWeatherByQuery(req, res);
});

// Path parameter routes
// GET /api/weather/city/Bangkok
router.get("/city/:cityName", (req, res) => {
  Controllers.weatherController.getWeatherByCity(req, res);
});

module.exports = router;
