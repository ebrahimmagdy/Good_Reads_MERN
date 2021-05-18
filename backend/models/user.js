const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Your last name is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Your email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill in a valid email address",
    ],
  },
  password: { type: String, required: "your password is required", trim: true },
  photo: Buffer,
  isAdmin: {
    type: Boolean,
    default: false,
  },
=======
    firstName: { type: String, required: "Your first Name is required" },
    lastName: { type: String, required: "Your last Name is required" },
  
    email: {
        type: String, trim: true, lowercase: true, unique: true,
        required: 'Your email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address']
    },
    password: { type: String, required: "your password is required" },
    photo: { type: String },
    isAdmin: {
        type: Boolean,
        default: false
    },
>>>>>>> d2f72ddb10d3e28318a00a5b905c7b7a06cc9eb5
});

userSchema.pre("save", function (next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
