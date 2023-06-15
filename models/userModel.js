const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPhoto: {
    type: String,
    default: ""
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  first_login: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

//end of page
module.exports = mongoose.model("User", userSchema);
