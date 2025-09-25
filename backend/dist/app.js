"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notesController_1 = require("./notesController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const HEALTH_CHECK_PATH = process.env.HEALTH_CHECK_PATH || '/health';
// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
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
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
// Middleware
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
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
app.post('/api/notes', notesController_1.createNote);
app.get('/api/notes', notesController_1.getAllNotes);
app.get('/api/notes/:id', notesController_1.getNoteById);
app.put('/api/notes/:id', notesController_1.updateNote);
app.delete('/api/notes/:id', notesController_1.deleteNote);
// Legacy routes for backward compatibility
app.post('/notes', notesController_1.createNote);
app.get('/notes', notesController_1.getAllNotes);
app.get('/notes/:id', notesController_1.getNoteById);
app.put('/notes/:id', notesController_1.updateNote);
app.delete('/notes/:id', notesController_1.deleteNote);
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
app.use((err, req, res, next) => {
    const logLevel = process.env.LOG_LEVEL || 'info';
    if (logLevel === 'debug' || NODE_ENV === 'development') {
        console.error('Error details:', err.stack);
    }
    else {
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
exports.default = app;
//# sourceMappingURL=app.js.map