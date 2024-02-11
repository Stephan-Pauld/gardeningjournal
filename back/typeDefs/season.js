const { gql } = require('apollo-server-express');

const seasonTypeDefs = gql`
type Note {
  id: ID!
  content: String!
  createdAt: String!
}

type Plant {
  id: ID!
  name: String
  variety: String
  plantingDate: String
  harvestDate: String
  notes: [Note]
}

type Season {
  id: ID!
  name: String!
  plantingZone: String
  lastFrostDate: String
  seasonEndDate: String
  notes: [Note]
  plants: [Plant]
}

type Query {
  getAllSeasons: [Season]
  getSeasonById(id: ID!): Season
}

type Mutation {
  addSeason(name: String!, plantingZone: String,lastFrostDate: String, seasonEndDate: String, notes: [ID], plants: [ID]): Season
  updateSeason(id: ID!, name: String, plantingZone: String,lastFrostDate: String, seasonEndDate: String, notes: [ID], plants: [ID]): Season
}
`;

module.exports = seasonTypeDefs;
