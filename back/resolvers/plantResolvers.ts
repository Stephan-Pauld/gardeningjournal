import {Plant} from "../models/plantSchema";
import {Season} from "../models/seasonSchema";

interface BasePlantArgs {
  name: string;
  variety: string;
  plantingDate: Date;
  harvestDate: Date;
  notes: string[];
}

interface SeasonArgs extends BasePlantArgs {
  seasonId: string;
}

interface PlantArgs extends BasePlantArgs {
  id: string;
}
export const plantResolvers = {
  Query: {
    getAllPlants: async () => {
      try {
        return await Plant.find({});
      } catch (error) {
        throw new Error("Failed to fetch plants");
      }
    },
    getPlantById: async (_: any, { id }: { id: string }) => {
      try {
        return await Plant.findById(id).populate("notes");
      } catch (error) {
        throw new Error("Failed to fetch plant");
      }
    },
  },
  Mutation: {
    addPlantToSeason: async (
      _: any,
      { name, variety, plantingDate, harvestDate, notes, seasonId }:SeasonArgs
    ) => {
      try {
        const newPlant = new Plant({
          name,
          variety,
          plantingDate,
          harvestDate,
          notes,
        });
        const savedPlant = await newPlant.save();
        if (seasonId) {
          await Season.findByIdAndUpdate(
            seasonId,
            {
              $push: { plants: savedPlant._id },
            },
            { new: true }
          );
        }
        return savedPlant;
      } catch (error) {
        console.log("Error adding plant to season:", error);
        throw new Error("Failed to add plant to season");
      }
    },
    updatePlant: async (
      _:any,
      { id, name, variety, plantingDate, harvestDate, notes }:PlantArgs
    ) => {
      try {
        return await Plant.findByIdAndUpdate(
          id,
          {name, variety, plantingDate, harvestDate, notes},
          {new: true}
        );
      } catch (error) {
        throw new Error("Failed to update plant");
      }
    },
  },
};
