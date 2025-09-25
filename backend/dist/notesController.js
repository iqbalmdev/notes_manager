"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const notesService_1 = require("./notesService");
const validation_1 = require("./validation");
const createNote = async (req, res) => {
    try {
        const validatedData = validation_1.createNoteSchema.parse(req.body);
        const note = notesService_1.notesService.createNote(validatedData);
        res.status(201).json(note);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
exports.createNote = createNote;
const getAllNotes = async (req, res) => {
    try {
        const notes = notesService_1.notesService.getAllNotes();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllNotes = getAllNotes;
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = notesService_1.notesService.getNoteById(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getNoteById = getNoteById;
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = validation_1.updateNoteSchema.parse(req.body);
        const updatedNote = notesService_1.notesService.updateNote(id, validatedData);
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = notesService_1.notesService.deleteNote(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=notesController.js.map