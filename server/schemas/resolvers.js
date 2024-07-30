const { User } = require("../models");
const Game = require("../models/Games");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, { }, context) => {

      const foundUser = await User.findById(context.user._id);

      if (!foundUser) {
        throw new Error("Cannot find a user with this id!");
      }

      return foundUser;
    },
    getAllGames: async () => {
      try {
        console.log("==============QUERY GET ALL GAMES==============");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      const games = await Game.find();
      return games;
    },
    getGame: async (parent, { gameId }) => {
      try {
        console.log("==============QUERY GET GAME==============");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      const game = await Game.findOne({ gameId });

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
    saveGame: async (parent, { input }, context) => {
      try {
        console.log("==============MUTATION SAVE GAME=============");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        const game = new Game(input);
        await game.save();

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedGames: game } },
          { new: true, runValidators: true }
        ).populate("savedGames");

        return updatedUser;
      } catch (err) {
        throw new Error("Error saving game!");
      }
    },

    deleteGame: async (parent, { gameId }, context) => {
      try {
        console.log("===========MUTATION DELETE GAME===========");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        const deletedGame = await Game.findOneAndDelete({ gameId });

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedGames: { gameId } } },
          { new: true }
        ).populate("savedGames");

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (err) {
        throw new Error("Error deleting game!");
      }
    },

    rateGame: async (parent, { gameId, rating }, context) => {
      try {
        console.log("============RATE GAME==========");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        const game = await Game.findOne({ gameId });
        if (!game) {
          throw new Error("Game not found!");
        }

        game.rating = rating;
        await game.save();

        const updatedUser = await User.findById(context.user._id).populate(
          "savedGames"
        );

        return updatedUser;
      } catch (err) {
        throw new Error("Error rating game!");
      }
    },

    playedGame: async (parent, { gameId }, context) => {
      try {
        console.log("=============MUTATOIN PLAYED GAME=========");
        return User.find();
      } catch (err) {
        console.log(err);
      }
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      try {
        const game = await Game.findOne({ gameId });
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

      if (!context.user) throw new Error('Not authenticated');

      const updatedUser = await User.findByIdAndUpdate(context.user._id, { bio }, { new: true });
      return updatedUser;
    },
  },
};

module.exports = resolvers;
