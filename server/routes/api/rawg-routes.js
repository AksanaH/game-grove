const express = require('express');
const router = express.Router();
const { fetchGames } = require('../../utils/rawgAPI');

router.get('/games', async (req, res) => {
  try {
    const { query } = req.query;
    const games = await fetchGames({ query });
    res.json(games);
  } catch (error) {
    console.error('Error in /games route:', error);
    res.status(500).send('Failed to fetch games');
  }
});

module.exports = router;
