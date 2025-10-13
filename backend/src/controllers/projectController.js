import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        console.log("Retrieved projects from database:", projects.length);
        return res.status(200).json(projects);
    } catch (err) {
        console.error('Error reading projects from database:', err);
        return res.status(500).json({ message: err.message });
    }
};

export const createProject = async (req, res) => {
    try {
        // Create new project object for database
        const projectData = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            tags: JSON.parse(req.body.tags),
            members: JSON.parse(req.body.members),
            links: req.body.links,
            status: req.body.status,
            featured: req.body.featured === 'true' // Convert string to boolean
        };
        
        // Handle image upload
        if (req.file) {
            // Read the image file and store it as Buffer in database
            const imageBuffer = fs.readFileSync(req.file.path);
            const contentType = req.file.mimetype;
            
            projectData.image = {
                data: imageBuffer,
                contentType: contentType
            };
            
            // Clean up temporary file
            fs.unlinkSync(req.file.path);
            
            console.log("Image stored in database as Buffer, size:", imageBuffer.length, "bytes, type:", contentType);
        } else {
            // Create a default placeholder image buffer
            const defaultImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
            projectData.image = {
                data: defaultImageBuffer,
                contentType: 'image/png'
            };
        }
        
        // Create project in database
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
        const project = await Project.findById(projectId);
        
        if (!project || !project.image || !project.image.data) {
            return res.status(404).json({ message: 'Image not found' });
        }
        
        // Set the appropriate content type
        res.set('Content-Type', project.image.contentType);
        res.set('Content-Length', project.image.data.length);
        
        // Send the image data
        res.send(project.image.data);
        
    } catch (err) {
        console.error('Error retrieving project image:', err);
        return res.status(500).json({ message: err.message });
    }
};