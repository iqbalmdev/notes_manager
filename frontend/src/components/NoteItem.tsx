import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Note, CreateNoteRequest } from '../types';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<CreateNoteRequest>) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onUpdate, isDeleting = false, isUpdating = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: note.title,
      content: note.content
    });
  };

  const handleSave = () => {
    if (editData.title.trim() && editData.content.trim()) {
      onUpdate(note.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: note.title,
      content: note.content
    });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        {isEditing ? (
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-title-input"
            placeholder="Note title..."
            maxLength={100}
          />
        ) : (
          <Link to={`/notes/${note.id}`} className="note-title-link">
            <h3 className="note-title">{note.title}</h3>
          </Link>
        )}
        <div className="note-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating || !editData.title.trim() || !editData.content.trim()}
                className="save-btn"
                title="Save changes"
              >
                {isUpdating ? 'Saving...' : '💾'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="cancel-btn"
                title="Cancel editing"
              >
                ❌
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                disabled={isDeleting || isUpdating}
                className="edit-btn"
                title="Edit note"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(note.id)}
                disabled={isDeleting}
                className="delete-btn"
                title="Delete note"
              >
                {isDeleting ? 'Deleting...' : '🗑️'}
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="note-content">
        {isEditing ? (
          <textarea
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            className="edit-content-textarea"
            placeholder="Note content..."
            rows={4}
          />
        ) : (
          <Link to={`/notes/${note.id}`} className="note-content-link">
            <p>{note.content}</p>
          </Link>
        )}
      </div>
      
      <div className="note-meta">
        <span className="note-date">
          Created: {formatDate(note.createdAt)}
        </span>
        {note.updatedAt !== note.createdAt && (
          <span className="note-date">
            Updated: {formatDate(note.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
