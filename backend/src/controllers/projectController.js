import Project from '../models/Project.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
            .select('-image.data')
            .lean()
            .sort({ created_at: -1 });
        
        console.log("Retrieved projects from database:", projects.length);
        return res.status(200).json(projects);
    } catch (err) {
        console.error('Error reading projects from database:', err);
        return res.status(500).json({ message: err.message });
    }
};

export const createProject = async (req, res) => {
    try {
        const projectData = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            tags: JSON.parse(req.body.tags),
            members: JSON.parse(req.body.members),
            links: req.body.links,
            status: req.body.status,
            featured: req.body.featured === 'true'
        };

        if (req.file) {
            try {
                const imageBuffer = req.file.buffer;
                const contentType = req.file.mimetype;
                
                projectData.image = {
                    data: imageBuffer,
                    contentType: contentType
                };
                
                console.log("Image stored in database as Buffer, size:", imageBuffer.length, "bytes, type:", contentType);
            } catch (fileError) {
                console.error('Error processing uploaded file:', fileError);
                return res.status(400).json({ message: 'Error processing uploaded file' });
            }
        } else {
            const defaultImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
            projectData.image = {
                data: defaultImageBuffer,
                contentType: 'image/png'
            };
        }

        const newProject = await Project.create(projectData);
        
        console.log("Created new project in database:", newProject.name);
        return res.status(201).json({ 
            success: true, 
            message: 'Project created successfully',
            project: newProject
        });
        
    } catch (err) {
        console.error('Error creating project in database:', err);
        return res.status(500).json({ message: err.message });
    }
};

export const getProjectImage = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findById(projectId).select('image');
        
        if (!project || !project.image || !project.image.data) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.set('Cache-Control', 'public, max-age=86400');
        res.set('Content-Type', project.image.contentType);
        res.set('Content-Length', project.image.data.length);

        res.send(Buffer.from(project.image.data));
        
    } catch (err) {
        console.error('Error retrieving project image:', err);
        return res.status(500).json({ message: err.message });
    }
};