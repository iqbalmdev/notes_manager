import React from 'react';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, isDeleting = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
            className="delete-btn"
            title="Delete note"
          >
            {isDeleting ? 'Deleting...' : '🗑️'}
          </button>
        </div>
      </div>
      
      <div className="note-content">
        <p>{note.content}</p>
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
