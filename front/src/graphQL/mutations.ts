import { gql } from "@apollo/client";

export const UPDATE_SEASON = gql`
  mutation Mutation(
    $updateSeasonId: ID!
    $name: String
    $plantingZone: String
    $lastFrostDate: String
    $seasonEndDate: String
  ) {
    updateSeason(
      id: $updateSeasonId
      name: $name
      plantingZone: $plantingZone
      lastFrostDate: $lastFrostDate
      seasonEndDate: $seasonEndDate
    ) {
      id
    }
  }
`;

export const ADD_PLANT_TO_SEASON = gql`
  mutation Mutation($seasonId: ID!, $name: String!, $variety: String) {
    addPlantToSeason(seasonId: $seasonId, name: $name, variety: $variety) {
      id
    }
  }
`;

export const EDIT_PLANT = gql`
  mutation Mutation(
    $updatePlantId: ID!
    $name: String
    $variety: String
    $plantingDate: String
    $harvestDate: String
  ) {
    updatePlant(
      id: $updatePlantId
      name: $name
      variety: $variety
      plantingDate: $plantingDate
      harvestDate: $harvestDate
    ) {
      id
    }
  }
`;
