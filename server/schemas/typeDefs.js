const typeDefs = `
    input GameInput {
        id: String!             
        name: String!        
        description: String!
        released: String    
        image: String  
        website: String     
        creators: [String]  
    }

    type Game {
        id: String!              
        name: String!        
        description: String!
        released: String
        image: String
        website: String
        creators: [String]
        rating: Float
        played: Boolean!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!  
        savedGames: [Game]
        bio: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getUser: User!
        getAllGames: [Game]
        getGame(id: ID!): Game  
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveGame(gameData: GameInput!): User
        rateGame(gameId: String!, rating: Float!): User
        playedGame(gameId: String!): User
        deleteGame(gameId: String!): User
        uploadFile(file: Upload!): String
        updateUserBio(bio: String!): User
    }
    scalar Upload

`;

module.exports = typeDefs;
