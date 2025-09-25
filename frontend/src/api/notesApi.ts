import axios from 'axios';
import type { Note, CreateNoteRequest } from '../types';
import config from '../config/env';

// Get configuration from environment
const { apiBaseUrl, nodeEnv, enableLogging } = config;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (requestConfig) => {
    if (nodeEnv === 'development' && enableLogging) {
      console.log(`📤 API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    }
    return requestConfig;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    if (nodeEnv === 'development' && enableLogging) {
      console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

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
