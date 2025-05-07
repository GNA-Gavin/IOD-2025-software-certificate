const express = require("express");
const fakeStoreApiController = require("../controllers/FakeStoreapiController");
const fakeStoreRouter = express.Router();

fakeStoreRouter.get("/products", (req, res) => {
  fakeStoreApiController.getProducts(req, res);
});

fakeStoreRouter.get("/categories", (req, res) => {
  fakeStoreApiController.getCategories(req, res);
});

module.exports = fakeStoreRouter; 