const express = require("express");
const Router = express.Router();
const Rate = require("../models/rate");
const Book = require("../models/book");
const jwt_functions = require("../helper/jwt_functions");
const { getLimits } = require("../helper/pagination");
const mongoose = require("mongoose");

Router.post(
  "/",
  jwt_functions.isAuthenticated,
  async (request, response, next) => {
    try {
      const rateData = request.body;
      const rateInstance = new Rate({
        rate: rateData.rate,
        userId: rateData.userId,
        bookId: rateData.bookId,
      });
      const rate = await rateInstance.save();
      console.log(rate);
      response.send("rate created");
    } catch (e) {
      console.log(e);
      response.status(500).send(e.message);
    }
  }
);

Router.get("/", async (req, res) => {
  try {
    let { page, size } = req.query;
    let { skip, limit } = getLimits(page, size);

    const rates = await Rate.find()
      .limit(limit)
      .skip(skip)
      .populate("userId")
      .populate("bookId");
    res.send({ page, size, data: rates });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

Router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const rate = await Rate.findById(id);
    response.json(rate);
  } catch (e) {}
});

Router.get("/books/avg", async (req, res) => {
  try {
    let { page, size } = req.query;
    let { skip, limit } = getLimits(page, size);

    console.log(
      "========================== H E R E ================================="
    );

    const data = await Rate.aggregate([
      { $match: { rate: { $ne: null } } },
      {
        $lookup: {
          from: Book.collection.name,
          localField: "bookId",
          foreignField: "_id",
          as: "bookData",
        },
      },
      { $unwind: "$bookData" },
      {
        $group: {
          _id: "$bookData",
          averageRating: { $avg: "$rate" },
          rateCount: { $sum: 1 },
        },
      },
      { $sort: { averageRating: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    console.log(data);

    res.json(data);
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

Router.get("/books/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const rate = await Rate.find({ bookId: id });
    response.json(rate);
  } catch (e) {}
});

Router.get("/books/:id/avg", async (req, res) => {
  try {
    const bookId = mongoose.Types.ObjectId(req.params.id);
    console.log(bookId);

    const bookData = await Rate.aggregate([
      { $match: { rate: { $ne: null }, bookId: bookId } },
      {
        $group: { _id: bookId, average: { $avg: "$rate" }, count: { $sum: 1 } },
      },
    ]);

    console.log(bookData);

    res.json(bookData);
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

Router.patch(
  "/update/:id",
  jwt_functions.isAuthenticated,
  async (request, response) => {
    try {
      const id = request.params.id;
      console.log(`update spicefic rate with id = ${id}`);
      const rateData = request.body;
      const rate = await Rate.findByIdAndUpdate(id, rateData);
      console.log(rate);
      response.send("rate updated");
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
      const rate = await Rate.findByIdAndDelete(id);
      response.send("rate deleted");
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = Router;
