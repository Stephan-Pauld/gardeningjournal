import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";
import mongoose from "mongoose";

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  mongoose
    .connect("mongodb://127.0.0.1:27017/garden", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
