const express = require("express");
const Router = express.Router();
const Review = require("../models/review");
const jwt_functions = require("../helper/jwt_functions");
const { getLimits } = require("../helper/pagination");

Router.post(
  "/",
  jwt_functions.isAuthenticated,
  async (request, response, next) => {
    try {
      const reviewData = request.body;
      const reviewInstance = new Review({
        body: reviewData.body,
        userId: reviewData.userId,
        bookId: reviewData.bookId,
      });
      const review = await reviewInstance.save();
      console.log(review);
      response.send("review created");
    } catch (e) {
      console.log(e);
      response.status(500).send("Error happend!");
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    let { page, size } = req.query;
    let { skip, limit } = getLimits(page, size);

    const reviews = await Review.find()
      .limit(limit)
      .skip(skip)
      .populate("userId")
      .populate("bookId");
    res.send({ page, size, data: reviews });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

Router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const review = await Review.findById(id);
    response.json(review);
  } catch (e) {}
});

Router.get("/book/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const review = await Review.find({ bookId: id });
    response.json(review);
  } catch (e) {}
});

Router.patch(
  "/update/:id",
  jwt_functions.isAuthenticated,
  async (request, response) => {
    try {
      const id = request.params.id;
      console.log(`update spicefic review with id = ${id}`);
      const reviewData = request.body;
      const review = await Review.findByIdAndUpdate(id, reviewData);
      console.log(review);
      response.send("review updated");
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
      const review = await Review.findByIdAndDelete(id);
      response.send("review deleted");
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = Router;
