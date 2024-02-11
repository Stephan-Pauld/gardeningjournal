const plantResolvers = require('./plantResolvers');
const seasonResolvers = require('./seasonResolvers');
const noteResolvers = require('./noteResolvers');

// Correctly combine resolvers
const resolvers = {
  Query: {
    ...plantResolvers.Query,
    ...seasonResolvers.Query,
    ...noteResolvers.Query
  },
  Mutation: {
    ...plantResolvers.Mutation,
    ...seasonResolvers.Mutation,
    ...noteResolvers.Mutation,
  }
}


module.exports = resolvers;
