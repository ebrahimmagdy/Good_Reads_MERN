const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: "Your first Name is required" },
    lastName: { type: String, required: "Your last Name is required" },
  
    email: {
        type: String, trim: true, lowercase: true, unique: true,
        required: 'Your email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address']
    },
    password: { type: String, required: "your password is required" },
    photo: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
});


const User = mongoose.model('users', userSchema);
module.exports = User;
