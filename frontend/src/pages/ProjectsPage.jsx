import React, {useEffect, useState} from "react";
import { SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

import { getProjects } from "../services/api";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getProjects();
                // Projects are already sorted by backend (newest first)
                setProjects(res);
            } catch (error) {
                console.error("API Error:", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const getCategoryDisplayName = (categoryId) => {
        switch (categoryId) {
            case 'personal-project':
                return 'Personal Projects';
            case 'class-project':
                return 'Class Projects';
            case 'hackathon':
                return 'Hackathon Projects';
            default:
                return 'All Projects';
        }
    };

    const filteredProjects = projects.filter(project => {
        // Only show featured projects
        const featuredMatch = project.featured === true;
        
        // Filter by category
        const categoryMatch = selectedCategory === 'all' || project.category_id === selectedCategory;
        
        // Filter by search query (name, tags, or description)
        const searchMatch = searchQuery === '' || 
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return featuredMatch && categoryMatch && searchMatch;
    });


    return (
        <motion.div 
            className="min-h-screen pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-6xl mx-auto px-6 py-12">
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Student Projects</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Explore amazing projects created by Purdue students. 
                        From personal projects to hackathon winners!
                    </p>
                    
                    <motion.div 
                        className="max-w-lg mx-auto"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="relative text-gray-300">
                            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by tags or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.button
                            onClick={() => setSelectedCategory('all')}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            All Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setSelectedCategory('personal-project')}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'personal-project'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Personal Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setSelectedCategory('class-project')}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'class-project'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Class Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setSelectedCategory('hackathon')}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }}
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'hackathon'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Hackathons
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedCategory}-${searchQuery}`}
                        className="space-y-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30, scale: 0.95, x: -20 }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                                transition={{ 
                                    type: "tween",
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                    delay: Math.min(index * 0.08, 0.6)
                                }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                            {searchQuery !== '' 
                                ? `No projects found matching "${searchQuery}".`
                                : selectedCategory === 'all' 
                                    ? 'No projects found.' 
                                    : `No ${getCategoryDisplayName(selectedCategory).toLowerCase()} found.`
                            }
                        </p>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">Loading...</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}