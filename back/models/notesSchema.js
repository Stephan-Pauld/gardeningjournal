const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;