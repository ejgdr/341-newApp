const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

// Check my graphql documentation
app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
            type RootQuery {
                events: [String!]!
            }

            type RootMutation {
                createEvent(name: String): String
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return ['Grade 9', 'Grade 10', 'Grade 11'];
            },
            createEvent: (args) => {
                const eventName =  args.name;
                return eventName;
            }
        }, //has all the resolver functions and need to match the end point of our schema by name
        graphiql: true 
    })
);

app.listen(4000);