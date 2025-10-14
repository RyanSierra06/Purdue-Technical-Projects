import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';

import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();

app.use(compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
        if (req.path.includes('/image')) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

const allowedOrigins = [
    'http://localhost:5173',
    'https://purdue-csusb.github.io',
    'https://purdue-csusb.github.io/Purdue-Technical-Projects',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        console.log('CORS request from origin:', origin);

        if (!origin) {
            console.log('CORS: Allowing request with no origin');
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('CORS: Allowing exact match for:', origin);
            return callback(null, true);
        }

        if (origin && origin.startsWith('https://purdue-csusb.github.io')) {
            console.log('CORS: Allowing GitHub Pages origin:', origin);
            return callback(null, true);
        }
        
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/projects', projectRoutes);

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

export default app;