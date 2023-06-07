const keyboard = require('../models/model.js')

const createBuild = (buildData) => {
  keyboard.create({
    keyboard: buildData.keyboard,
    description: buildData.description,
    imageUrl: buildData.imageUrl,
    creator: buildData.creator
  })
};

// const updateLikes = (buildData) => {
//   return keyboard.findByIdAndUpdate({

//   })
// }

module.exports = createBuild;
