const express = require("express");
const Router = express.Router();
const Book = require("../models/book");
const jwt_functions = require("../helper/jwt_functions");
const { getLimits } = require("../helper/pagination");

Router.post(
  "/",
  jwt_functions.isAuthorizedAsAdmin,
  async (request, response, next) => {
    try {
      const bookData = request.body;
      const bookInstance = new Book({
        name: bookData.name,
        photo: bookData.photo,
        categoryId: bookData.categoryId,
        authorId: bookData.authorId,
      });
      const book = await bookInstance.save();
      console.log(book);
      response.send("book created");
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

    const books = await Book.find()
      .limit(limit)
      .skip(skip)
      .populate("categoryId")
      .populate("authorId");
    return res.send({ page, size, data: books });
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
});

Router.get(
  "/:id",
  async (request, response) => {
    try {
      const id = request.params.id;
      const book = await Book.findById(id);
      response.json(book);
    } catch (e) {}
  }
);

Router.patch(
  "/update/:id",
  jwt_functions.isAuthorizedAsAdmin,
  async (request, response) => {
    try {
      const id = request.params.id;
      console.log(`update spicefic book with id = ${id}`);
      const bookData = request.body;
      const book = await Book.findByIdAndUpdate(id, bookData);
      console.log(book);
      response.send("book updated");
    } catch (e) {
      console.log(e);
    }
  }
);

Router.delete("/:id", jwt_functions.isAuthorizedAsAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedBook = await Book.findById(_id);
    if (!deletedBook) {
      res.status(404).send({ error: "Book not found!" });
      return;
    }
    try {
      deletedBook.remove();
    } catch (error) {
      res.status(500).send(error);
    }
    res.send(deletedBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = Router;
