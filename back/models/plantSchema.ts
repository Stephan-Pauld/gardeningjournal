import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: String,
  variety: String,
  plantingDate: String,
  harvestDate: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

export const Plant = mongoose.model("Plant", plantSchema);
