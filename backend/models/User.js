const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },

  password: {
    type: String,
    required: true,
  },

  resetToken: {
    type: String,
    default: null,
  },

  tokenExpire: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
