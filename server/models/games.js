const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
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

const Game = model("Game", gameSchema);

module.exports = Game;
