const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rate: {type: Number,default: 0},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }
});

const Rates = mongoose.model('reviews', reviewSchema);
module.exports = Review;