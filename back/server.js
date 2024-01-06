const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');

const app = express();

// Express middleware, if any, goes here


async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });


    mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB...', err));

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer()
