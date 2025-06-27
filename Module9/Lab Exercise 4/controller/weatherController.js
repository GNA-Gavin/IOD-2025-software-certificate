const weatherService = require("../services/weatherService");

// Query parameters: GET /api/weather?city=Bangkok
const getWeatherByQuery = (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.send({
      result: 400,
      error: "City parameter is required. Example: ?city=Bangkok",
    });
  }

  weatherService
    .getWeatherByCity(city)
    .then((weather) => {
      res.send({ result: 200, data: weather });
    })
    .catch((error) => {
      res.send({ result: 500, error: error.message });
    });
};

// Path parameters: GET /api/weather/city/:cityName
const getWeatherByCity = (req, res) => {
  const { cityName } = req.params;

  weatherService
    .getWeatherByCity(cityName)
    .then((weather) => {
      res.send({ result: 200, data: weather });
    })
    .catch((error) => {
      res.send({ result: 500, error: error.message });
    });
};

module.exports = {
  getWeatherByQuery,
  getWeatherByCity,
};
