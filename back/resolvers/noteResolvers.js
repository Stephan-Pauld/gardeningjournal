const Season = require('../models/seasonSchema');
const Plant = require('../models/plantSchema');
const Note = require('../models/notesSchema');

const noteResolvers = {
    Query: {
        // Retrieve all notes
        notes: async () => {
            try {
                const notes = await Note.find();
                return notes;
            } catch (err) {
                throw new Error(err);
            }
        },
        // Retrieve a note by ID
        note: async (_, { noteId }) => {
            try {
                const note = await Note.findById(noteId);
                if (!note) {
                    throw new Error('Note not found');
                }
                return note;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        // Create a new note
        createNote: async (_, { content }) => {
            const newNote = new Note({
                content,
            });

            try {
                const note = await newNote.save();
                return note;
            } catch (err) {
                throw new Error(err);
            }
        },
        // Update a note by ID
        updateNote: async (_, { noteId, content }) => {
            try {
                const updatedNote = await Note.findByIdAndUpdate(
                    noteId,
                    { content },
                    { new: true }
                );
                if (!updatedNote) {
                    throw new Error('Note not found');
                }
                return updatedNote;
            } catch (err) {
                throw new Error(err);
            }
        },
        // Delete a note by ID
        deleteNote: async (_, { noteId }) => {
            try {
                const note = await Note.findByIdAndDelete(noteId);
                if (!note) {
                    throw new Error('Note not found');
                }
                return 'Note deleted successfully';
            } catch (err) {
                throw new Error(err);
            }
        },
        // Add a note to a season
        addNoteToSeason: async (_, { seasonId, content }) => {
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
                    throw new Error('Season not found');
                }
                return note;
            } catch (err) {
                throw new Error(err);
            }
        },
        // Add a note to a plant
        addNoteToPlant: async (_, { plantId, content }) => {
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
                    throw new Error('Plant not found');
                }
                return note;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};

module.exports = noteResolvers;