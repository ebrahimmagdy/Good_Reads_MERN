const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: 'Category name is required' }
});

const Catogries = mongoose.model('catogries', categorySchema);
module.exports = Catogries;

