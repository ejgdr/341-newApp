const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

// Check my graphql documentation
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers, //has all the resolver functions and need to match the end point of our schema by name
        graphiql: true 
    })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustercse341.8zfoc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
      });
}).catch(err => {
    console.log(err);
});

