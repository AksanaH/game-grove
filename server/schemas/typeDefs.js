const typeDefs = `
    type Game {
        creators: [String]
         title: String!
        description: String!
        gameId: String!
        image: String
        link: String
    
    }

    type User {
    _id: ID!
        username: String!
        email: String!
        password: String!
        savedGames: [Game]
    }   

    type Auth {
        token: ID!
        user: User
    }
    type Query {
        getSingleUser(userId: ID, username: String): User
        getAllGames: [Game]
        getSingleGame(gameId: String!): Game
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth 
        login(email: String, password: String!): Auth
        saveGame(gameId: String!, description: String!, title: String!, creators: [String], image: String, link: String): Game
        deleteGame(gameId: String!): Game
    }
`;

module.exports = typeDefs;
