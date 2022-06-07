const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const app = express();

const events = [];

app.use(bodyParser.json());

// Check my graphql documentation
app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
                date: String!
            }

            type RootQuery {
                events: [Event!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return events;
            },
            createEvent: (args) => {
                const event = {
                    _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: args.eventInput.date
                };
                events.push(event);
                return event;
            }
        }, //has all the resolver functions and need to match the end point of our schema by name
        graphiql: true 
    })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustercse341.8zfoc.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
      });
}).catch(err => {
    console.log(err);
});

