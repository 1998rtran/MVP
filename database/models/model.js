const mongoose = require('mongoose');

const keyboardSchema = mongoose.Schema({
  keyboard: String,
  description: String,
  imageUrl: String,
  creator: String,
  likes: {type: Number, default: 0}
});

const keyboard = mongoose.model('keyboard', keyboardSchema);

module.exports = keyboard;