import { gql } from "@apollo/client";

export const SINGLE_USER = gql`
  query getUser {
    getUser {
      _id
      username
      email
      savedGames {
        _id
        name
        description
        image
        rating
        played
      }
    }
  }
`;

export const ALL_GAMES = gql`
  query getAllGames {
    getAllGames {
      website
      released
      rating
      played
      name
      image
      id
      description
      creators
    }
  }
`;

export const SINGLE_GAME = gql`
  query getGame($getGameId: ID!) {
    getGame(id: $getGameId) {
      website
      released
      rating
      played
      name
      image
      id
      description
      creators
    }
  }
`;
