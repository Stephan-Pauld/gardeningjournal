const Season = require('../models/seasonSchema');


const seasonResolvers = {
  Plant: {
    // Convert MongoDB _id to GraphQL's id field for each Plant
    id: (plant) => plant._id.toString(),
  },
  Query: {
    getAllSeasons: async () => {
      try {
        return await Season.find({});
      } catch (error) {
        throw new Error('Failed to fetch seasons');
      }
    },
    getSeasonById: async (_, { id }) => {
      try {
        // Just populate 'plants', GraphQL handles the rest
        const season = await Season.findById(id).populate('plants');
        return season;
      } catch (error) {
        throw new Error('Failed to fetch season');
      }
    },
  },
  Mutation: {
    addSeason: async (_, { name, seasonStartDate, seasonEndDate, notes, plants }) => {
      try {
        const newSeason = new Season({ name, seasonStartDate, seasonEndDate, notes, plants });
        return await newSeason.save();
      } catch (error) {
        console.log("err?",error)
        throw new Error('Failed to add season');
      }
    },
    updateSeason: async (_, { id, name, seasonStartDate, seasonEndDate, notes, plants }) => {

      try {
        const updatedSeason = await Season.findByIdAndUpdate(
          id,
          { name, seasonStartDate, seasonEndDate, notes, plants },
          { new: true }
        );
        return updatedSeason;
      } catch (error) {
        throw new Error('Failed to update season');
      }
    },
  },
};

module.exports = seasonResolvers;