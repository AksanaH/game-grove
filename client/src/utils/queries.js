import { gql } from '@apollo/client';


export const SINGLE_USER = gql`
  query getSingleUser($userId: ID, $username: String) {
    getSingleUser(userId: $userId, username: $username) {
      _id
      username
      email
      savedGames {
        id
        name
        released
        rating
        description
        background_image
        website
      }
    }
  }
`;


export const ALL_GAMES = gql`
  query getAllGames($query: String) {
    getAllGames(query: $query) {
      id
      name
      released
      rating
      description
      background_image
      website
    }
  }
`;


export const SINGLE_GAME = gql`
  query getSingleGame($gameId: String!) {
    getSingleGame(gameId: $gameId) {
      id
      name
      released
      rating
      description
      background_image
      website
    }
  }
`;
