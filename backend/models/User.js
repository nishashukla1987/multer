const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newUser = new Schema(
  {
    // data structure

    picture: String,
    name: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', newUser);
module.exports = User;
