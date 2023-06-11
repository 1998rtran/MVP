const keyboard = require('../models/model.js');

const getBuilds = () => {
  return keyboard.find({}).exec();
};

const createBuild = (buildData) => {
  return keyboard.create({
    keyboard: buildData.keyboard,
    switches: buildData.switches,
    keycaps: buildData.keycaps,
    imageUrl: buildData.imageUrl,
    creator: buildData.creator
  });
};

const updateLikes = (id) => {
  return keyboard.findByIdAndUpdate(id, { $inc: {likes: 1}})
}

const editKeyboard = (id, response) => {
  console.log(id, response);
  return keyboard.findByIdAndUpdate(id, {
    keyboard: response.editKeyboard,
    switches: response.editSwitches,
    keycaps: response.editKeycaps
  });
}

const deleteKeyboard = (id) => {
  return keyboard.findByIdAndDelete(id);
}

module.exports = {
  createBuild,
  getBuilds,
  updateLikes,
  editKeyboard,
  deleteKeyboard
};
