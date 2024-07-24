const { User } = require('../models'); 
const Game = require('../models/games'); 
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (parent, { userId }) => {
      const foundUser = await User.findById(userId).populate('savedGames');

      if (!foundUser) {
        throw new Error('Cannot find a user with this id!');
      }

      return foundUser;
    },
    getAllGames: async () => {
      const games = await Game.find();
      return games;
    },
    getGame: async (parent, { gameId }) => {
      const game = await Game.findOne({ gameId });

      if (!game) {
        throw new Error('Cannot find a game with this id!');
      }

      return game;
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new Error('Something went wrong!');
      }

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
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveGame: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error('You need to be logged in!');
      }

      try {
        const game = new Game(input);
        await game.save(); 

        
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedGames: game } },
          { new: true, runValidators: true }
        ).populate('savedGames');

        return updatedUser;
      } catch (err) {
        throw new Error('Error saving game!');
      }
    },
    deleteGame: async (parent, { gameId }, context) => {
      if (!context.user) {
        throw new Error('You need to be logged in!');
      }

      try {
        
        const deletedGame = await Game.findOneAndDelete({ gameId });

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedGames: { gameId } } },
          { new: true }
        ).populate('savedGames');

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (err) {
        throw new Error('Error deleting game!');
      }
    },
  },
};

module.exports = resolvers;
