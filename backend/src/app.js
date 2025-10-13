import express from 'express';
import cors from 'cors';

// import routes later

// make an error handler later

const app = express();

app.use(cors());
app.use(express.json());

// add use routes
// add error handler

export default app;