const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    rate: { type: Number, min: 0, max: 5, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.model("Rate", rateSchema);
module.exports = Rate;
