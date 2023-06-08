const mongoose = require('mongoose');

const keyboardgallery = new mongoose.Schema({
  keyboard: {type: String, require: true},
  switches: {type: String, require: true},
  keycaps: {type: String, require: true},
  imageUrl: String,
  creator: {type: String, require: true},
  likes: {type: Number, default: 0}
});

const keyboard = mongoose.model('keyboard', keyboardgallery);

module.exports = keyboard;