import { Note, CreateNoteRequest, UpdateNoteRequest } from './types';

class NotesService {
  private notes: Map<string, Note> = new Map();

  createNote(noteData: CreateNoteRequest): Note {
    const id = this.generateId();
    const now = new Date();
    
    const note: Note = {
      id,
      title: noteData.title,
      content: noteData.content,
      createdAt: now,
      updatedAt: now
    };

    this.notes.set(id, note);
    return note;
  }

  getAllNotes(): Note[] {
    return Array.from(this.notes.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getNoteById(id: string): Note | undefined {
    return this.notes.get(id);
  }

  updateNote(id: string, updateData: UpdateNoteRequest): Note | undefined {
    const existingNote = this.notes.get(id);
    if (!existingNote) {
      return undefined;
    }

    const updatedNote: Note = {
      ...existingNote,
      ...updateData,
      updatedAt: new Date()
    };

    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  deleteNote(id: string): boolean {
    return this.notes.delete(id);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const notesService = new NotesService();
