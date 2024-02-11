const Season = require('../models/seasonSchema');


const seasonResolvers = {
  Plant: {
    // Convert MongoDB _id to GraphQL's id field for each Plant
    id: (plant) => plant._id.toString(),
  },
  Query: {
    getAllSeasons: async () => {
      try {
        //TODO:
        // we dont need to populate notes for now
        // and really we dont need to get all plants... thats a bit insane
        // all we do is plants.length to display how many plants there is...
        // need to fix this
        return await Season.find({}).populate('plants');
      } catch (error) {
        throw new Error('Failed to fetch seasons');
      }
    },
    //TODO:
    // this populate would limit 5 and bring back the 5 most recently created notes
    // sorted by createdAt (date), this could become helpful when/if we had dozens of plants or seasons
    // that have dozens of notes each...
    // .populate('notes', null, null, { limit: 5, sort: { createdAt: -1 } })
    getSeasonById: async (_, { id }) => {
      try {
        const season = await Season.findById(id).populate('plants').populate('notes');
        return season;
      } catch (error) {
        throw new Error('Failed to fetch season');
      }
    },
  },
  Mutation: {
    addSeason: async (_, { name, plantingZone, lastFrostDate, seasonEndDate, notes, plants }) => {
      try {
        const newSeason = new Season({ name, plantingZone, lastFrostDate, seasonEndDate, notes, plants });
        return await newSeason.save();
      } catch (error) {
        console.log("err?", error)
        throw new Error('Failed to add season');
      }
    },
    updateSeason: async (_, { id, name, plantingZone, lastFrostDate, seasonEndDate, notes, plants }) => {

      try {
        const updatedSeason = await Season.findByIdAndUpdate(
          id,
          { name, plantingZone, lastFrostDate, seasonEndDate, notes, plants },
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