import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Note, CreateNoteRequest } from '../types';
import { notesApi } from '../api/notesApi';
import NotesList from '../components/NotesList';
import './NotesListPage.css';

const NotesListPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | undefined>();
  const [updatingNoteId, setUpdatingNoteId] = useState<string | undefined>();
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

  const handleUpdateNote = async (id: string, data: Partial<CreateNoteRequest>) => {
    try {
      setUpdatingNoteId(id);
      setError(null);
      const updatedNote = await notesApi.updateNote(id, data);
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update note';
      setError(errorMessage);
      console.error('Error updating note:', err);
    } finally {
      setUpdatingNoteId(undefined);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="notes-list-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📝 All Notes</h1>
          <p>Manage and organize your notes</p>
        </div>
        <div className="header-actions">
          <Link to="/notes/create" className="btn btn-primary">
            ➕ Create New Note
          </Link>
          <Link to="/" className="btn btn-secondary">
            🏠 Home
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError} className="close-btn">×</button>
        </div>
      )}

      {isLoading ? (
        <div className="loading">
          <p>Loading notes...</p>
        </div>
      ) : (
        <NotesList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onUpdateNote={handleUpdateNote}
          deletingNoteId={deletingNoteId}
          updatingNoteId={updatingNoteId}
        />
      )}
    </div>
  );
};

export default NotesListPage;
