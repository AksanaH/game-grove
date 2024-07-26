const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveGame,
  deleteGame,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveGame);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/games/:gameId').delete(authMiddleware, deleteGame);

module.exports = router;


