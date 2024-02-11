const { gql } = require('apollo-server-express');

const plantTypeDefs = gql`
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
  
type Query {
    getAllPlants: [Plant]
    getPlantById(id: ID!): Plant
  }
  
type Mutation {
  addPlantToSeason(name: String!, variety: String, plantingDate: String, harvestDate: String, notes: [ID], seasonId: ID!): Plant
  updatePlant(id: ID!, name: String, variety: String, plantingDate: String, harvestDate: String, notes: [ID]): Plant
}
`;

module.exports = plantTypeDefs;



