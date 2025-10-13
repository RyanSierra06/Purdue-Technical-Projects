import express from 'express';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes.js';

// make an error handler later

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes)
// add error handler

export default app;