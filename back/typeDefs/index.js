const plantTypeDefs = require('./plant');
const seasonTypeDefs = require('./season');

// Use array, string, or other methods to combine typeDefs
const typeDefs = [plantTypeDefs,seasonTypeDefs];

module.exports = typeDefs;
