import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export const Note = mongoose.model("Note", noteSchema);
