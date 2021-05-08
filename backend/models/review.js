const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;