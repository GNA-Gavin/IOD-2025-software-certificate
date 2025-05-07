const axios = require('axios');

const getProducts = (req, res) => {
  axios.get("https://fakestoreapi.com/products")
    .then((res) => res.data)
    .then((data) => res.status(200).json(data))
    .catch(error => {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      });
};

const getCategories = (req, res) => {
  axios.get("https://fakestoreapi.com/products/categories")
    .then((res) => res.data)
    .then((data) => res.status(200).json(data))
    .catch(error => {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      });
};

module.exports = { getProducts, getCategories };
