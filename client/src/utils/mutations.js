import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation login($email: String, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
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

export const DELETE_GAME = gql`
  mutation deleteGame($gameId: String!) {
    deleteGame(gameId: $gameId) {
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
