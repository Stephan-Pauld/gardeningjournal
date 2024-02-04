const Plant = require('../models/plantSchema');
const Season = require('../models/seasonSchema');

const plantResolvers = {
  Query: {
    // Fetch all plants
    getAllPlants: async () => {
      try {
        return await Plant.find({});
      } catch (error) {
        throw new Error('Failed to fetch plants');
      }
    },
    // Fetch a single plant by ID
    getPlantById: async (_, { id }) => {
      try {
        return await Plant.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch plant');
      }
    },
  },
  Mutation: {
    // Add a new plant
    addPlantToSeason: async (_, { name, variety, plantingDate, harvestDate, notes, seasonId }) => {
      try {
        // First, create the new plant
        const newPlant = new Plant({ name, variety, plantingDate, harvestDate, notes });
        const savedPlant = await newPlant.save();

        // Then, associate the new plant with the specified season
        if (seasonId) {
          await Season.findByIdAndUpdate(seasonId, {
            $push: { plants: savedPlant._id }
          }, { new: true }); // You might not need to use the returned value here unless you want to return it or check something
        }

        // Optionally, return the new plant and/or updated season data
        // For now, returning the new plant; adjust based on your needs
        return savedPlant;
      } catch (error) {
        console.log("Error adding plant to season:", error);
        throw new Error('Failed to add plant to season');
      }
    },
    // Update an existing plant
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
