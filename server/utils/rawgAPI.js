const axios = require('axios');

const API_KEY = 'fea5a9b00570494e9ed634ed29b084b0';
const BASE_URL = 'https://api.rawg.io/api/';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

const fetchGames = async (searchQuery) => {
  try {
    const response = await api.get('games', {
      params: { ...searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

module.exports = {
  fetchGames,
};

