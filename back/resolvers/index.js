const plantResolvers = require('./plantResolvers');
const seasonResolvers = require('./seasonResolvers');

// Correctly combine resolvers
const resolvers = {
  Query: {
    ...plantResolvers.Query,
    ...seasonResolvers.Query
  },
  Mutation: {
    ...plantResolvers.Mutation,
    ...seasonResolvers.Mutation,
  }}


  module.exports = resolvers;
