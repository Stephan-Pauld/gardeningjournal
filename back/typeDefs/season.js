const { gql } = require('apollo-server-express');

const seasonTypeDefs = gql`
type Plant {
  id: ID!
  name: String
  variety: String
  plantingDate: String
  harvestDate: String
  notes: String
}

type Season {
  id: ID!
  name: String!
  seasonStartDate: String
  seasonEndDate: String
  notes: [String]
  plants: [Plant]
}

type Query {
  getAllSeasons: [Season]
  getSeasonById(id: ID!): Season
}

type Mutation {
  addSeason(name: String!, seasonStartDate: String, seasonEndDate: String, notes: [String], plants: [ID]): Season
  updateSeason(id: ID!, name: String, seasonStartDate: String, seasonEndDate: String, notes: [String], plants: [ID]): Season
}
`;

module.exports = seasonTypeDefs;



