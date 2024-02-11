const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  variety: String,
  plantingDate: String,
  harvestDate: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
