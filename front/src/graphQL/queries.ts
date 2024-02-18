import { gql } from "@apollo/client";

export const GET_SEASON_BY_ID = gql`
  query GetSeasonById($getSeasonById: ID!) {
    getSeasonById(id: $getSeasonById) {
      id
      lastFrostDate
      name
      notes {
        content
        createdAt
        id
      }
      plantingZone
      seasonEndDate
      plants {
        harvestDate
        id
        name
        plantingDate
        variety
      }
    }
  }
`;

export const GET_ALL_SEASONS = gql`
  query Query {
    getAllSeasons {
      id
      name
      plants {
        name
      }
      lastFrostDate
      seasonEndDate
    }
  }
`;
