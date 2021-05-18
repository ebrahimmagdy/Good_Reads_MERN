const express = require("express");
const Router = express.Router();
const Category = require("../models/category");
const jwt_functions = require("../helper/jwt_functions");
const { getLimits } = require("../helper/pagination");

Router.post(
  "/",
  jwt_functions.isAuthorizedAsAdmin,
  async (request, response, next) => {
    try {
      const categoryData = request.body;
      const categoryInstance = new Category({
        name: categoryData.name,
      });
      const category = await categoryInstance.save();
      console.log(category);
      response.send("category created");
    } catch (e) {
      console.log(e);
      response.status(500).json({ event: e });
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    let { page, size } = req.query;
    let { skip, limit } = getLimits(page, size);

    const categories = await Category.find().limit(limit).skip(skip);
    res.send({ page, size, data: categories });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

Router.get(
  "/:id",
  async (request, response) => {
    try {
      const id = request.params.id;
      const category = await Category.findById(id);
      response.json(category);
    } catch (e) {}
  }
);

Router.patch(
  "/update/:id",
  jwt_functions.isAuthorizedAsAdmin,
  async (request, response) => {
    try {
      const id = request.params.id;
      console.log(`update spicefic category with id = ${id}`);
      const categoryData = request.body;
      const category = await Category.findByIdAndUpdate(id, categoryData);
      console.log(category);
      response.send("category updated");
    } catch (e) {
      console.log(e);
    }
  }
);

Router.delete(
  "/:id",
  jwt_functions.isAuthorizedAsAdmin,
  async (request, response) => {
    try {
      const id = request.params.id;
      const category = await Category.findByIdAndDelete(id);
      response.send("category deleted");
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = Router;
