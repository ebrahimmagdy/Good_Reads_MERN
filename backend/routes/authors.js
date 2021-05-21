const express = require("express");
const { getLimits } = require("../helper/pagination");
const authorRouter = express.Router();
const Author = require("../models/author");
const User = require("../models/user");
const jwt_functions = require("../helper/jwt_functions") 

/**
 * Adding a new Author
 */
authorRouter.post("/", (req, res, next) => {
  const user = User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).send("user not found");
  } else {
    Author.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((author) => {
      if (author)
        return res
          .status(400)
          .json({ massege: "Your Author is already exists !" });
      else {
        const author = new Author({
          // photo: req.file.path || 'No photo till the moment',
          photo: req.body.photo,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          description: req.body.description || "",
        });

        author
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Author Was Created Successfully..",
            });
          })
          .catch((err) => {
            console.log("You got an error : " + err);
            res.status(500).json({ error: err });
          });
      }
    });
  }
});

/**
 * Return Authors
 */
authorRouter.get("/", async (req, res) => {
  let { page, size } = req.query;
  let { skip, limit } = getLimits(page, size);

  try {
    const authors = await Author.find().limit(limit).skip(skip);
    res.send({ page, size, data: authors });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

/**
 * Return Author with a specific id
 */
authorRouter.get("/:id", (req, res) => {
  Author.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("Error While getting data : " + err);
    });
});

authorRouter.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedAuthor = await Author.findById(_id);
    if (!deletedAuthor) {
      res.status(404).send({ error: "Author not found!" });
      return;
    }
    try {
      deletedAuthor.remove();
    } catch (error) {
      res.status(500).send(error);
    }
    res.send(deletedAuthor);
  } catch (error) {
    res.status(500).send(error);
  }
});



authorRouter.patch("/update/:id", jwt_functions.isAuthorizedAsAdmin, async (request, response) => {
  try{
      const id = request.params.id
      console.log(`update spicefic author with id = ${id}`);
      const authorData = request.body
      const author = await Author.findByIdAndUpdate(id, authorData)
      console.log(author);
      response.send("author updated")
  } catch (e){
      console.log(e);
  }
})
module.exports = authorRouter;
