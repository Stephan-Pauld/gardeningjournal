import { plantResolvers } from "./plantResolvers";
import { seasonResolvers } from "./seasonResolvers";
import { noteResolvers } from "./noteResolvers";

// Correctly combine resolvers
const resolvers = {
  Query: {
    ...plantResolvers.Query,
    ...seasonResolvers.Query,
    ...noteResolvers.Query,
  },
  Mutation: {
    ...plantResolvers.Mutation,
    ...seasonResolvers.Mutation,
    ...noteResolvers.Mutation,
  },
};

export { resolvers };
