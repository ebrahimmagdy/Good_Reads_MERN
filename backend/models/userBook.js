const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: "The user is required",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required: "The book is required",
    },
    shelve: { 
        type: 'String', 
        enum: ['Want To Read','Currently Reading','Read'],
        required: "The shelve is required",
    },
});

const UserBook = mongoose.model('userBooks', userBookSchema);
module.exports = UserBook ;