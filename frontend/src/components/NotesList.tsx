import React from 'react';
import type { Note, CreateNoteRequest } from '../types';
import NoteItem from './NoteItem';

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  onUpdateNote: (id: string, data: Partial<CreateNoteRequest>) => void;
  deletingNoteId?: string;
  updatingNoteId?: string;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDeleteNote, onUpdateNote, deletingNoteId, updatingNoteId }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No notes yet</h3>
        <p>Create your first note using the form above!</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      <h2>Your Notes ({notes.length})</h2>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
            onUpdate={onUpdateNote}
            isDeleting={deletingNoteId === note.id}
            isUpdating={updatingNoteId === note.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
