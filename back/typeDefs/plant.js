"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const plantTypeDefs = (0, apollo_server_express_1.gql) `
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
    addPlantToSeason(
      name: String!
      variety: String
      plantingDate: String
      harvestDate: String
      notes: [ID]
      seasonId: ID!
    ): Plant
    updatePlant(
      id: ID!
      name: String
      variety: String
      plantingDate: String
      harvestDate: String
      notes: [ID]
    ): Plant
  }
`;
exports.plantTypeDefs = plantTypeDefs;
