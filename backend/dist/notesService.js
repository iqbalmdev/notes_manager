"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesService = void 0;
class NotesService {
    constructor() {
        this.notes = new Map();
    }
    createNote(noteData) {
        const id = this.generateId();
        const now = new Date();
        const note = {
            id,
            title: noteData.title,
            content: noteData.content,
            createdAt: now,
            updatedAt: now
        };
        this.notes.set(id, note);
        return note;
    }
    getAllNotes() {
        return Array.from(this.notes.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    getNoteById(id) {
        return this.notes.get(id);
    }
    updateNote(id, updateData) {
        const existingNote = this.notes.get(id);
        if (!existingNote) {
            return undefined;
        }
        const updatedNote = {
            ...existingNote,
            ...updateData,
            updatedAt: new Date()
        };
        this.notes.set(id, updatedNote);
        return updatedNote;
    }
    deleteNote(id) {
        return this.notes.delete(id);
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
exports.notesService = new NotesService();
//# sourceMappingURL=notesService.js.map