import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';

import projectRoutes from './routes/projectRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Compression middleware - compress all responses
app.use(compression({
    level: 6, // Compression level (0-9, 6 is default balance)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
        // Don't compress images (they're already compressed)
        if (req.path.includes('/image')) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// CORS configuration - allow multiple origins
const allowedOrigins = [
    'http://localhost:5173',  // Local development
    'https://purdue-csusb.github.io',  // GitHub Pages
    process.env.FRONTEND_URL  // Environment variable (if set)
].filter(Boolean);  // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

export default app;