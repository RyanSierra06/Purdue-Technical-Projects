import express from 'express';
import multer from 'multer';
import { getProjects, createProject, getProjectImage } from '../controllers/projectController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Temporary upload directory
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', getProjects);
router.post('/', upload.single('image'), createProject);
router.get('/:id/image', getProjectImage);

export default router;