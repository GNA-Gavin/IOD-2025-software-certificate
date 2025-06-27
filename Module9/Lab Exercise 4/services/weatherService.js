const axios = require("axios");

const BASE_URL = "https://goweather.xyz/weather";


// Fetch weather data for a given city
const getWeatherByCity = async (city) => {
  try {
    const url = `${BASE_URL}/${encodeURIComponent(city)}`;
    console.log(`Fetching weather for: ${url}`);

    const response = await axios.get(url);

    return {
      city: city,
      current: {
        temperature: response.data.temperature,
        description: response.data.description,
        wind: response.data.wind,
      },
    };
  } catch (error) {
    console.error(`Weather API error for ${city}:`, error.message);
    throw new Error(`Weather data not available for ${city}`);
  }
};

module.exports = {
  getWeatherByCity,
};
