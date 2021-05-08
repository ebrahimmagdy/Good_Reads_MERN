const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    },
    shelve: { type: 'String', enum: ['Want To Read','Currently Reading','Read'] },
});

const UserBook = mongoose.model('userBooks', userBookSchema);
module.exports = UserBook ;