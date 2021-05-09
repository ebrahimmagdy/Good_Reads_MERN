const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
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

const Rate = mongoose.model('rate', rateSchema);
module.exports = Rate;