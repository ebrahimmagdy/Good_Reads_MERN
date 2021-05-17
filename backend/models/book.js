const mongoose = require("mongoose");
const rateModel = require("./rate");
const reviewModel = require("./review");
const userBookModel = require("./userBook");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "catogries",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    photo: { type: Buffer },
  },
  {
    timestamps: true,
  }
);

bookSchema.post("remove", async function (doc, next) {
  const deletedBook = this;
  await rateModel.deleteMany({ bookId: deletedBook._id });
  await reviewModel.deleteMany({ bookId: deletedBook._id });
  await userBookModel.deleteMany({ bookId: deletedBook._id });
  return next();
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
