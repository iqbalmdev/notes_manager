import { Request, Response } from 'express';
import { notesService } from './notesService';
import { createNoteSchema, updateNoteSchema } from './validation';

export const createNote = async (req: Request, res: Response) => {
  try {
    const validatedData = createNoteSchema.parse(req.body);
    const note = notesService.createNote(validatedData);
    res.status(201).json(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = notesService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = notesService.getNoteById(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateNoteSchema.parse(req.body);
    
    const updatedNote = notesService.updateNote(id, validatedData);
    
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(200).json(updatedNote);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = notesService.deleteNote(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
