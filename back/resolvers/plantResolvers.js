const Plant = require('../models/plantSchema');
const Season = require('../models/seasonSchema');

const plantResolvers = {
  Query: {
    getAllPlants: async () => {
      try {
        return await Plant.find({});
      } catch (error) {
        throw new Error('Failed to fetch plants');
      }
    },
    getPlantById: async (_, { id }) => {
      try {
        return await Plant.findById(id).populate('notes');
      } catch (error) {
        throw new Error('Failed to fetch plant');
      }
    },
  },
  Mutation: {
    addPlantToSeason: async (_, { name, variety, plantingDate, harvestDate, notes, seasonId }) => {
      try {
        const newPlant = new Plant({ name, variety, plantingDate, harvestDate, notes });
        const savedPlant = await newPlant.save();
        if (seasonId) {
          await Season.findByIdAndUpdate(seasonId, {
            $push: { plants: savedPlant._id }
          }, { new: true });
        }
        return savedPlant;
      } catch (error) {
        console.log("Error adding plant to season:", error);
        throw new Error('Failed to add plant to season');
      }
    },
    updatePlant: async (_, { id, name, variety, plantingDate, harvestDate, notes }) => {

      try {
        const updatedPlant = await Plant.findByIdAndUpdate(
          id,
          { name, variety, plantingDate, harvestDate, notes },
          { new: true }
        );
        return updatedPlant;
      } catch (error) {
        throw new Error('Failed to update plant');
      }
    },
  },
};

module.exports = plantResolvers;
