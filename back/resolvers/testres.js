const YourModel = require('../models/testmodel');

const resolvers = {
    Query: {
        // Query resolvers
    },
    Mutation: {
        addYourData: async (_, args) => {
            const newData = new YourModel(args);
            await newData.save();
            return newData;
        },
    },
};

module.exports = resolvers;
