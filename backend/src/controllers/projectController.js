import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        console.log("data" + projects)
        return res.status(201).json(projects);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};