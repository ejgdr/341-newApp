const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Tracking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    dateBirth: String!
    age: Int!
    originallyFrom: String!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    firstName: String!
    lastName: String!
    dateBirth: String!
    age: Int!
    originallyFrom: String!
    email: String!
    password: String!
}

type RootQuery {
    events: [Event!]!
    trackings: [Tracking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    trackEvent(eventId: ID!): Tracking!
    cancelTracking(trackingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);