const mongoose = require("mongoose");

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

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
