import { Note, CreateNoteRequest, UpdateNoteRequest } from './types';
declare class NotesService {
    private notes;
    createNote(noteData: CreateNoteRequest): Note;
    getAllNotes(): Note[];
    getNoteById(id: string): Note | undefined;
    updateNote(id: string, updateData: UpdateNoteRequest): Note | undefined;
    deleteNote(id: string): boolean;
    private generateId;
}
export declare const notesService: NotesService;
export {};
//# sourceMappingURL=notesService.d.ts.map