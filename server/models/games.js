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
  description: {
    type: String,
    required: true,
  },
  background_image: {
    type: String,
  },
  creators: [String],
  played: {
    type: Boolean,
    default: false,
  },
});

const Game = model("Game", gameSchema);

module.exports = Game;
