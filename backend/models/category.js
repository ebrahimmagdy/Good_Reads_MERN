const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

const Catogries = mongoose.model('catogries', categorySchema);
module.exports = Catogries;

