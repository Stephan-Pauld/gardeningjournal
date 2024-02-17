"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteResolvers = void 0;
const seasonSchema_1 = require("../models/seasonSchema");
const plantSchema_1 = require("../models/plantSchema");
const notesSchema_1 = require("../models/notesSchema");
exports.noteResolvers = {
    Query: {
        // Retrieve all notes
        notes: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield notesSchema_1.Note.find();
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // Retrieve a note by ID
        note: (_, { noteId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const note = yield notesSchema_1.Note.findById(noteId);
                if (!note) {
                    throw new Error("Note not found");
                }
                return note;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    },
    Mutation: {
        // Create a new note
        createNote: (_, { content }) => __awaiter(void 0, void 0, void 0, function* () {
            const newNote = new notesSchema_1.Note({
                content,
            });
            try {
                return yield newNote.save();
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // Update a note by ID
        updateNote: (_, { noteId, content }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedNote = yield notesSchema_1.Note.findByIdAndUpdate(noteId, { content }, { new: true });
                if (!updatedNote) {
                    throw new Error("Note not found");
                }
                return updatedNote;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // Delete a note by ID
        deleteNote: (_, { noteId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const note = yield notesSchema_1.Note.findByIdAndDelete(noteId);
                if (!note) {
                    throw new Error("Note not found");
                }
                return "Note deleted successfully";
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // Add a note to a season
        addNoteToSeason: (_, { seasonId, content }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newNote = new notesSchema_1.Note({
                    content,
                });
                const note = yield newNote.save();
                const season = yield seasonSchema_1.Season.findByIdAndUpdate(seasonId, { $push: { notes: note._id } }, { new: true });
                if (!season) {
                    throw new Error("Season not found");
                }
                return note;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
        // Add a note to a plant
        addNoteToPlant: (_, { plantId, content }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newNote = new notesSchema_1.Note({
                    content,
                });
                const note = yield newNote.save();
                const plant = yield plantSchema_1.Plant.findByIdAndUpdate(plantId, { $push: { notes: note._id } }, { new: true });
                if (!plant) {
                    throw new Error("Plant not found");
                }
                return note;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }),
    },
};
