const db = require("../config/connection");
const { Game, User } = require("../models");
const cleanDB = require("./cleanDB");

const gameData = require("./gameData.json");
const userSeeds = require("./userSeeds.json");


db.once("open", async () => {
  await cleanDB("Game", "games");

  await cleanDB("User", "users");

  await User.create(userSeeds);

  await Game.insertMany(gameData);

  console.log("Games seeded!");
  process.exit(0);
});
