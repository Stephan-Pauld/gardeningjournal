const { gql } = require('apollo-server-express');

const plantTypeDefs = gql`
type Plant {
  id: ID!
  name: String
  variety: String
  plantingDate: String
  harvestDate: String
  notes: String
}

  type Query {
    getAllPlants: [Plant]
    getPlantById(id: ID!): Plant
  }
  
type Mutation {
  addPlantToSeason(name: String!, variety: String, plantingDate: String, harvestDate: String, notes: String, seasonId: ID!): Plant
  updatePlant(id: ID!, name: String, variety: String, plantingDate: String, harvestDate: String, notes: String): Plant
}
`;

module.exports = plantTypeDefs;



