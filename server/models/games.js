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
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
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
