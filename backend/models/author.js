const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    photo: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    description: { type: String }
});

const Authers = mongoose.model('authors', authorSchema);
module.exports = Authers;