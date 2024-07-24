import { gql } from "@apollo/client";

export const SINGLE_USER = gql`
  {
    getSingleUser {
      _id
      username
      email
      savedGames {
        creators
        title
        description
        gameId
        image
        link
      }
    }
  }
`;
export const ALL_GAMES = gql`
  {
    getAllGames {
      Game {
        creators
        title
        description
        gameId
        image
        link
      }
    }
  }
`;

export const SINGLE_GAME = gql`
  {
    getSingleGame {
      _id
      Game {
        creators
        title
        description
        gameId
        image
        link
      }
    }
  }
`;
