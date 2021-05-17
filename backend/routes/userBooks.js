const express = require("express");
const Router = express.Router();
const UserBook = require("../models/userBook");
const jwt_functions = require("../helper/jwt_functions");
const { getLimits } = require("../helper/pagination");

Router.post(
  "/",
  jwt_functions.isAuthenticated,
  async (request, response, next) => {
    try {
      const userBookData = request.body;
      const userBookInstance = new UserBook({
        shelve: userBookData.shelve,
        userId: userBookData.userId,
        bookId: userBookData.bookId,
      });
      const userBook = await userBookInstance.save();
      console.log(userBook);
      response.send("userBook created");
    } catch (e) {
      console.log(e);
      response.status(500).send("Error happend!");
    }
  }
);

Router.get("/", async (request, response) => {
  try {
    let { page, size } = req.query;
    let { skip, limit } = getLimits(page, size);

    const userBooks = await UserBook.find()
      .limit(limit)
      .skip(skip)
      .populate("userId")
      .populate("bookId");
    return res.send({ page, size, data: userBooks });
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
});

Router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const userBook = await UserBook.findById(id)
      .populate("userId")
      .populate("bookId");
    response.json(userBook);
  } catch (e) {}
});

Router.get(
  "/user/:id",
  jwt_functions.isAuthenticated,
  async (request, response) => {
    try {
      const id = request.params.id;
      const userBook = await UserBook.find({ userId: id })
        .populate("userId")
        .populate("bookId");
      response.json(userBook);
    } catch (e) {}
  }
);

Router.patch(
  "/update/:id",
  jwt_functions.isAuthenticated,
  async (request, response) => {
    try {
      const id = request.params.id;
      console.log(`update spicefic userBook with id = ${id}`);
      const userBookData = request.body;
      const userBook = await UserBook.findByIdAndUpdate(id, userBookData);
      console.log(userBook);
      response.send("userBook updated");
    } catch (e) {
      console.log(e);
    }
  }
);

Router.delete(
  "/:id",
  jwt_functions.isAuthenticated,
  async (request, response) => {
    try {
      const id = request.params.id;
      const userBook = await UserBook.findByIdAndDelete(id);
      response.send("userBook deleted");
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = Router;
