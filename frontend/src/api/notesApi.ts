import axios from 'axios';
import { Note, CreateNoteRequest } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  // Get all notes
  getAllNotes: async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
  },

  // Get a single note by ID
  getNoteById: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Create a new note
  createNote: async (noteData: CreateNoteRequest): Promise<Note> => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  // Update a note
  updateNote: async (id: string, noteData: Partial<CreateNoteRequest>): Promise<Note> => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  // Delete a note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};
