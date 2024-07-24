const db = require("../config/connection");
const { games, User } = require("../models");
const cleanDB = require("./cleanDB");

const gameData = require("./gameData.json");

db.once("open", async () => {
  await cleanDB("Game", "games");

  await cleanDB("User", "users");

  await User.create(userSeeds);

  await games.insertMany(gameData);

  console.log("Games seeded!");
  process.exit(0);
});
