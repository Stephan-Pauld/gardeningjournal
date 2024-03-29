"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const noteTypeDefs = (0, apollo_server_express_1.gql) `
  type Note {
    id: ID!
    content: String!
    createdAt: String!
  }

  type Query {
    notes: [Note!]!
    note(noteId: ID!): Note!
  }

  type Mutation {
    createNote(content: String!): Note!
    updateNote(noteId: ID!, content: String!): Note!
    deleteNote(noteId: ID!): String!
    addNoteToSeason(seasonId: ID!, content: String!): Note!
    addNoteToPlant(plantId: ID!, content: String!): Note!
  }
`;
exports.noteTypeDefs = noteTypeDefs;
