import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface NotesListProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
  deletingNoteId?: string;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDeleteNote, deletingNoteId }) => {
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
            isDeleting={deletingNoteId === note.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
