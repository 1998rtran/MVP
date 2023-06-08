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

module.exports = {
  createBuild,
  getBuilds,
  updateLikes
};
