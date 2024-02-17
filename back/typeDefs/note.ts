import { gql } from "apollo-server-express";

const noteTypeDefs = gql`
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

export { noteTypeDefs };
