import express from 'express';
import cors from 'cors';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from './notesController';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/notes', createNote);
app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteById);
app.put('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
