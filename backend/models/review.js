const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "books",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
