const Models = require("../models");
const weatherService = require("../services/weatherService");

// Since I updated the model, I probably should just have one controller and route for posts
// This is for practice mostly 

// Create post with automatic weather data
const createPostWithWeather = (data, res) => {
  console.log("Creating post with weather data:", data);

  // First get weather data if city is provided
  if (data.city) {
    weatherService
      .getWeatherByCity(data.city)
      .then((weather) => {
        // Create post with weather data included
        const postData = {
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          image_url: data.image_url || "",
          city: data.city,
          weather_temperature: weather.current.temperature,
          weather_description: weather.current.description,
          weather_wind: weather.current.wind,
        };

        console.log("Creating post with weather data:", postData);
        return new Models.Post(postData).save();
      })
      .then((post) => {
        res.send({ result: 200, data: post });
      })
      .catch((error) => {
        console.error("Error creating post with weather:", error);
        res.send({ result: 500, error: error.message });
      });
  } else {
    // Create regular post without weather
    new Models.Post(data)
      .save()
      .then((post) => {
        res.send({ result: 200, data: post });
      })
      .catch((error) => {
        console.error("Error creating regular post:", error);
        res.send({ result: 500, error: error.message });
      });
  }
};

// Update enhanced post: PUT /api/enhanced-posts/:id
const updateEnhancedPost = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if city is being updated to fetch new weather data
  const newCity = updateData.city;

  if (newCity) {
    console.log(`Updating post ${id} with new city: ${newCity}`);
    weatherService
      .getWeatherByCity(newCity)
      .then((weather) => {
        console.log(`Fetched weather for ${newCity}:`, weather);

        // Update post data with new weather info
        const updatedData = {
          ...updateData,
          city: newCity,
          weather_temperature: weather.current.temperature,
          weather_description: weather.current.description,
          weather_wind: weather.current.wind,
        };

        console.log("Final update data:", updatedData);
        return Models.Post.findByIdAndUpdate(id, updatedData, { new: true });
      })
      .then((post) => {
        if (!post) {
          return res.send({ result: 404, error: "Post not found" });
        }
        console.log("Updated post with weather:", post);
        res.send({ result: 200, data: post });
      })
      .catch((error) => {
        console.error("Error updating enhanced post:", error);
        res.send({ result: 500, error: error.message });
      });
  } else {
    // Regular update without weather data
    Models.Post.findByIdAndUpdate(id, updateData, { new: true })
      .then((post) => {
        if (!post) {
          return res.send({ result: 404, error: "Post not found" });
        }
        res.send({ result: 200, data: post });
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        res.send({ result: 500, error: error.message });
      });
  }
};

// Delete enhanced post: DELETE /api/enhanced-posts/:id
const deleteEnhancedPost = (req, res) => {
  const { id } = req.params;

  Models.Post.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }
      res.send({
        result: 200,
        data: post,
        message: "Enhanced post deleted successfully",
      });
    })
    .catch((error) => {
      console.error("Error deleting enhanced post:", error);
      res.send({ result: 500, error: error.message });
    });
};

// Get enhanced post by ID: GET /api/enhanced-posts/:id
const getEnhancedPostById = (req, res) => {
  const { id } = req.params;

  Models.Post.findById(id)
    .populate("user_id", "username email")
    .then((post) => {
      if (!post) {
        return res.send({ result: 404, error: "Post not found" });
      }
      res.send({ result: 200, data: post });
    })
    .catch((error) => {
      console.error("Error getting enhanced post by ID:", error);
      res.send({ result: 500, error: error.message });
    });
};

module.exports = {
  createPostWithWeather,
  updateEnhancedPost,
  deleteEnhancedPost,
  getEnhancedPostById,
};
