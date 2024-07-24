const { Schema } = require("mongoose");

const gameSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  released: {
    type: String,
  },
  rating: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  background_image: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = gameSchema;
