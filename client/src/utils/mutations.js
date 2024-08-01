import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        username
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
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
      username
      password
      email
      _id
      savedGames {
        creators
        description
        id
        image
        name
        played
        rating
        released
        website
      }
    }
  }
`;

export const RATE_GAME = gql`
  mutation rateGame($gameId: ID!, $rating: Float!) {
    rateGame(gameId: $gameId, rating: $rating) {
      username
      _id
      username
      savedGames {
        gameId
        name
        rating
      }
    }
  }
`;

export const PLAYED_GAME = gql`
  mutation playedGame($gameId: ID!) {
    playedGame(gameId: $gameId) {
      username
      _id
      savedGames {
        gameId
        name
        description
        rating
        image
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($gameId: ID!) {
    deleteGame(gameId: $gameId) {
      username
      _id
      savedGames {
        gameId
        description
        nams
      }
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const UPDATE_USER_BIO = gql`
  mutation UpdateUserBio($bio: String!) {
    updateUserBio(bio: $bio) {
      bio
    }
  }
`;
