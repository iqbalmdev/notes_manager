import React, { useState, useEffect } from 'react';
import { Note, CreateNoteRequest } from './types';
import { notesApi } from './api/notesApi';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedNotes = await notesApi.getAllNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError('Failed to load notes. Please make sure the backend server is running.');
      console.error('Error loading notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (noteData: CreateNoteRequest) => {
    try {
      setIsAdding(true);
      setError(null);
      const newNote = await notesApi.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create note';
      setError(errorMessage);
      console.error('Error creating note:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      setDeletingNoteId(id);
      setError(null);
      await notesApi.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to delete note';
      setError(errorMessage);
      console.error('Error deleting note:', err);
    } finally {
      setDeletingNoteId(undefined);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Notes Manager</h1>
        <p>Organize your thoughts and ideas</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={clearError} className="close-btn">×</button>
          </div>
        )}

        <NoteForm onSubmit={handleAddNote} isLoading={isAdding} />

        {isLoading ? (
          <div className="loading">
            <p>Loading notes...</p>
          </div>
        ) : (
          <NotesList
            notes={notes}
            onDeleteNote={handleDeleteNote}
            deletingNoteId={deletingNoteId}
          />
        )}
      </main>
    </div>
  );
}

export default App;