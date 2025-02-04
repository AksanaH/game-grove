const API_KEY = "fea5a9b00570494e9ed634ed29b084b0";
const BASE_URL = "https://api.rawg.io/api";

/**
 * Function to search for games using the RAWG API.
 * @param {string} query - The search query (game name or keywords).
 * @returns {Promise<Array>} - The list of games with detailed information.
 */
export const searchGames = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&page_size=10&search=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    const detailedGamesPromises = data.results.map(async (game) => {
      const gameDetailsResponse = await fetch(
        `${BASE_URL}/games/${game.id}?key=${API_KEY}`
      );
      if (!gameDetailsResponse.ok) {
        throw new Error("Network response was not ok.");
      }
      return await gameDetailsResponse.json();
    });
    const detailedGames = await Promise.all(detailedGamesPromises);
    return detailedGames;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getAllGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return response;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
