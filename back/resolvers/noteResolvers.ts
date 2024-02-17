import {Season} from "../models/seasonSchema";
import {Plant} from "../models/plantSchema";
import {Note} from "../models/notesSchema";

export const noteResolvers = {
  Query: {
    // Retrieve all notes
    notes: async () => {
      try {
        return await Note.find();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    // Retrieve a note by ID
    note: async (_: any, { noteId }: { noteId: string }) => {
      try {
        const note = await Note.findById(noteId);
        if (!note) {
          throw new Error("Note not found");
        }
        return note;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    // Create a new note
    createNote: async (_: any, { content }: { content: string }) => {
      const newNote = new Note({
        content,
      });

      try {
        return await newNote.save();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    // Update a note by ID
    updateNote: async (_: any, { noteId, content }: { noteId: string, content: string }) => {
      try {
        const updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { content },
          { new: true }
        );
        if (!updatedNote) {
          throw new Error("Note not found");
        }
        return updatedNote;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    // Delete a note by ID
    deleteNote: async (_: any, { noteId }: { noteId: string }) => {
      try {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
          throw new Error("Note not found");
        }
        return "Note deleted successfully";
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    // Add a note to a season
    addNoteToSeason: async (_: any, { seasonId, content }: { seasonId: string, content: string }) => {
      try {
        const newNote = new Note({
          content,
        });
        const note = await newNote.save();
        const season = await Season.findByIdAndUpdate(
          seasonId,
          { $push: { notes: note._id } },
          { new: true }
        );
        if (!season) {
          throw new Error("Season not found");
        }
        return note;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    // Add a note to a plant
    addNoteToPlant: async (_: any, { plantId, content }: { plantId: string, content: string }) => {
      try {
        const newNote = new Note({
          content,
        });
        const note = await newNote.save();
        const plant = await Plant.findByIdAndUpdate(
          plantId,
          { $push: { notes: note._id } },
          { new: true }
        );
        if (!plant) {
          throw new Error("Plant not found");
        }
        return note;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
