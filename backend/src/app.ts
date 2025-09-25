import express from 'express';
import cors from 'cors';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from './notesController';

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const HEALTH_CHECK_PATH = process.env.HEALTH_CHECK_PATH || '/health';

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const allowedOrigins = [
      CORS_ORIGIN,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    port: PORT
  });
});

// Notes API Routes
app.post('/api/notes', createNote);
app.get('/api/notes', getAllNotes);
app.get('/api/notes/:id', getNoteById);
app.put('/api/notes/:id', updateNote);
app.delete('/api/notes/:id', deleteNote);

// Legacy routes for backward compatibility
app.post('/notes', createNote);
app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteById);
app.put('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

// Health check (legacy)
app.get(HEALTH_CHECK_PATH, (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    port: PORT
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const logLevel = process.env.LOG_LEVEL || 'info';
  
  if (logLevel === 'debug' || NODE_ENV === 'development') {
    console.error('Error details:', err.stack);
  } else {
    console.error('Error occurred:', err.message);
  }
  
  res.status(500).json({ 
    error: NODE_ENV === 'production' ? 'Something went wrong!' : err.message 
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Notes Manager API',
    version: '1.0.0',
    environment: NODE_ENV,
    endpoints: {
      health: '/api/health',
      notes: '/api/notes',
      legacy: '/notes'
    }
  });
});

// 404 handler - catch all routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

export default app;
