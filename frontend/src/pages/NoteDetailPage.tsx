import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Note } from '../types';
import { notesApi } from '../api/notesApi';
import './NoteDetailPage.css';

const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', content: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNote(id);
    }
  }, [id]);

  const loadNote = async (noteId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedNote = await notesApi.getNoteById(noteId);
      setNote(fetchedNote);
      setEditData({
        title: fetchedNote.title,
        content: fetchedNote.content
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to load note';
      setError(errorMessage);
      console.error('Error loading note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!note || !editData.title.trim() || !editData.content.trim()) return;

    try {
      setIsUpdating(true);
      setError(null);
      const updatedNote = await notesApi.updateNote(note.id, editData);
      setNote(updatedNote);
      setIsEditing(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update note';
      setError(errorMessage);
      console.error('Error updating note:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: note?.title || '',
      content: note?.content || ''
    });
  };

  const handleDelete = async () => {
    if (!note) return;

    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesApi.deleteNote(note.id);
        navigate('/notes');
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Failed to delete note';
        setError(errorMessage);
        console.error('Error deleting note:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="note-detail-page">
        <div className="loading">
          <p>Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="note-detail-page">
        <div className="error-state">
          <h2>Note not found</h2>
          <p>The note you're looking for doesn't exist or has been deleted.</p>
          <Link to="/notes" className="btn btn-primary">
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="note-detail-page">
      <div className="page-header">
        <div className="header-content">
          <Link to="/notes" className="back-link">← Back to Notes</Link>
          <h1>📝 Note Details</h1>
        </div>
        <div className="header-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating || !editData.title.trim() || !editData.content.trim()}
                className="btn btn-primary"
              >
                {isUpdating ? 'Saving...' : '💾 Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="btn btn-secondary"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="btn btn-primary">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <div className="note-detail-container">
        <div className="note-detail">
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="edit-input"
                  placeholder="Note title..."
                  maxLength={100}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="edit-textarea"
                  placeholder="Note content..."
                  rows={10}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="note-title">{note.title}</h2>
              <div className="note-content">
                <p>{note.content}</p>
              </div>
            </>
          )}
          
          <div className="note-meta">
            <div className="meta-item">
              <strong>Created:</strong> {formatDate(note.createdAt)}
            </div>
            {note.updatedAt !== note.createdAt && (
              <div className="meta-item">
                <strong>Updated:</strong> {formatDate(note.updatedAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
