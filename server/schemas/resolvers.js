const { User } = require("../models");
const Game = require("../models/Games");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }
      const foundUser = await User.findById(context.user._id).populate(
        "savedGames"
      );
      if (!foundUser) {
        throw new Error("Cannot find a user with this id!");
      }
      return foundUser;
    },

    getAllGames: async () => {
      const games = await Game.find();
      return games;
    },
    getGame: async (parent, { id }) => {
      const game = await Game.findOne({ gameId: id });

      if (!game) {
        throw new Error("Cannot find a game with this id!");
      }

      return game;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveGame: async (parent, { gameData }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        // Ensure the gameData.id is a valid string, if necessary
        if (!gameData.id || typeof gameData.id !== "string") {
          throw new Error("Invalid Game ID format");
        }

        // Find the game by the provided gameData.id
        let game = await Game.findOne({ id: gameData.id });

        if (!game) {
          // Create the game if it does not exist in the database
          game = await Game.create(gameData);
        }

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedGames: game._id } },
          { new: true, runValidators: true }
        ).populate("savedGames");

        return updatedUser;
      } catch (err) {
        console.error("Failed to save game with error:", err);
        throw new Error(`Error saving game: ${err.message}`);
      }
    },

    deleteGame: async (parent, { gameId }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        if (!gameId || typeof gameId !== "string") {
          throw new Error("Invalid Game ID format");
        }
        const game = await Game.findById(gameId);
        if (!game) {
          throw new Error("Game not found!");
        }

        await Game.findByIdAndDelete(gameId);

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedGames: gameId } },
          { new: true }
        ).populate("savedGames");

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (err) {
        console.error("Error deleting game:", err);
        throw new Error("Error deleting game!");
      }
    },

    rateGame: async (parent, { gameId, rating }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        if (!gameId || typeof gameId !== "string") {
          throw new Error("Invalid Game ID format");
        }

        const game = await Game.findOne({ _id: gameId });
        if (!game) {
          throw new Error("Game not found!");
        }

        game.rating = rating;

        await game.save();

        const updatedUser = await User.findById(context.user._id).populate(
          "savedGames"
        );
        updatedUser.savedGames = updatedUser.savedGames.filter(
          (game) => game.gameId
        );
        return updatedUser;
      } catch (err) {
        console.error("Error rating game");
        throw new Error(`Error rating game: ${err.message}`);
      }
    },

    playedGame: async (parent, { gameId }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        if (!gameId || typeof gameId !== "string") {
          throw new Error("Invalid Game ID format");
        }

        const game = await Game.findOne({ _id: gameId });
        if (!game) {
          throw new Error("Game not found!");
        }

        game.played = true;
        await game.save();

        const updatedUser = await User.findById(context.user._id).populate(
          "savedGames"
        );

        return updatedUser;
      } catch (err) {
        throw new Error("Error marking game as played!");
      }
    },
    uploadFile: ({ file }) => {
      // Handle file upload logic here
      return `File ${file.filename} uploaded successfully.`;
    },
    updateUserBio: async (parent, { bio }, context) => {
      // Update the user bio in the database

      if (!context.user) throw new Error("Not authenticated");

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { bio },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
