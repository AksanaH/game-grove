const typeDefs = `
    input GameInput {
        id: ID!             
        name: String!        
        description: String
        released: String    
        background_image: String  
        website: String     
        creators: [String]  
    }

    type Game {
        id: ID!              
        name: String!        
        description: String
        released: String
        background_image: String
        website: String
        creators: [String]
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
        getUser(userId: ID!): User
        getAllGames: [Game]
        getGame(id: ID!): Game  
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveGame(input: GameInput!): Game
        deleteGame(id: ID!): Game
    }
`;

module.exports = typeDefs;
