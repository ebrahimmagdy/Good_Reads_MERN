const mongoose = require("mongoose");
const bookModel = require("./book");

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    photo: {
      type: Buffer,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// post hook to cascade delete author books on deleting the author
authorSchema.post("remove", async function (doc, next) {
  const deletedAuthor = this;
  await bookModel.deleteMany({ authorId: deletedAuthor._id });
  return next();
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
