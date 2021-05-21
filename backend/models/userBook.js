const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "The user is required",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: "The book is required",
    },
    shelve: {
      type: "String",
      enum: ["Want To Read", "Currently Reading", "Read"],
      required: "The shelve is required",
    },
  },
  {
    timestamps: true,
  }
);

const UserBook = mongoose.model("UserBook", userBookSchema);
module.exports = UserBook;
