const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  name:String,
  plantingZone:String,
  lastFrostDate: String,
  seasonEndDate: String,
  notes: [String],
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }]
});

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
