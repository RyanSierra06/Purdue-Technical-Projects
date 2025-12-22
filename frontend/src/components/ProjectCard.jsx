import React from 'react';
import { ExternalLinkIcon, UsersIcon, TagIcon, FolderIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-blue-500' : 'bg-blue-800';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Active' : 'Completed';
    };

    const getCategoryText = (categoryId) => {
        switch (categoryId) {
            case 'personal-project':
                return 'Personal Project';
            case 'class-project':
                return 'Class Project';
            case 'hackathon':
                return 'Hackathon Project';
            default:
                return 'Other Project';
        }
    };

    return (
        <motion.div 
            className="bg-black/40 rounded-lg p-4 md:p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -10,
                scale: 1.015,
                transition: {
                    type: "tween",
                    duration: 0.15,
                    ease: [0.4, 0, 0.2, 1]
                }
            }}
            transition={{ 
                type: "tween",
                duration: 0.1,
                ease: [0.4, 0, 0.2, 1]
            }}
            style={{ willChange: "transform" }}
        >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/projects/${project._id}/image`}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full md:w-80 h-80 md:h-80 object-contain rounded-lg bg-gray-800/50 p-2"
                        onError={(e) => {
                            // Hide broken images gracefully
                            e.target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                            // Ensure image is visible when loaded
                            e.target.style.display = 'block';
                        }}
                    />
                </div>
                
                <div className="flex-1">
                    <motion.div 
                        className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-0 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05, duration: 0.15 }}
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>
                        <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                                {getStatusText(project.status)}
                            </span>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.08, duration: 0.15 }}
                    >
                        <p className="text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.15 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <motion.div
                                whileHover={{ 
                                    rotate: 360,
                                    scale: 1.2,
                                    transition: { 
                                        type: "tween",
                                        duration: 0.15,
                                        ease: [0.4, 0, 0.2, 1]
                                    }
                                }}
                                transition={{ 
                                    type: "tween",
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                style={{ willChange: "transform" }}
                            >
                                <TagIcon className="w-4 h-4 text-blue-500" />
                            </motion.div>
                            <span className="text-sm font-medium text-blue-500">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                                <motion.span 
                                    key={index} 
                                    className="px-2 py-1 bg-blue-700/30 text-blue-300 text-xs rounded-md cursor-default"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.12 + index * 0.03, duration: 0.15 }}
                                    whileHover={{ 
                                        scale: 1.1, 
                                        backgroundColor: "rgba(59, 130, 246, 0.5)",
                                        transition: {
                                            type: "tween",
                                            duration: 0.15,
                                            ease: [0.4, 0, 0.2, 1]
                                        }
                                    }}
                                    transition={{ 
                                        type: "tween",
                                        duration: 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.15 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <motion.div
                                whileHover={{ 
                                    scale: 1.3,
                                    rotate: 15,
                                    transition: { 
                                        type: "tween",
                                        duration: 0.15,
                                        ease: [0.4, 0, 0.2, 1]
                                    }
                                }}
                                transition={{ 
                                    type: "tween",
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                style={{ willChange: "transform" }}
                            >
                                <UsersIcon className="w-4 h-4 text-blue-300" />
                            </motion.div>
                            <span className="text-sm font-medium text-blue-300">Members:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.members.map((member, index) => (
                                <motion.span 
                                    key={index} 
                                    className="px-2 py-1 bg-blue-400/20 text-blue-100 text-xs rounded-md cursor-default"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.18 + index * 0.03, duration: 0.15 }}
                                    whileHover={{ 
                                        scale: 1.1, 
                                        backgroundColor: "rgba(96, 165, 250, 0.3)",
                                        transition: {
                                            type: "tween",
                                            duration: 0.15,
                                            ease: [0.4, 0, 0.2, 1]
                                        }
                                    }}
                                    transition={{ 
                                        type: "tween",
                                        duration: 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    {member}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.15 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <motion.div
                                whileHover={{ 
                                    rotate: 20,
                                    scale: 1.2,
                                    transition: { 
                                        type: "tween",
                                        duration: 0.15,
                                        ease: [0.4, 0, 0.2, 1]
                                    }
                                }}
                                transition={{ 
                                    type: "tween",
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                style={{ willChange: "transform" }}
                            >
                                <FolderIcon className="w-4 h-4 text-blue-500" />
                            </motion.div>
                            <span className="text-sm font-medium text-blue-300">Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <motion.span 
                                className="px-2 py-1 bg-blue-700/30 text-blue-300 text-xs rounded-md"
                                whileHover={{ 
                                    scale: 1.1,
                                    transition: {
                                        type: "tween",
                                        duration: 0.15,
                                        ease: [0.4, 0, 0.2, 1]
                                    }
                                }}
                                transition={{ 
                                    type: "tween",
                                    duration: 0.1,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                            >
                                {getCategoryText(project.category_id)}
                            </motion.span>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <motion.div 
                className="flex justify-center sm:justify-end mt-4 sm:mt-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.15 }}
            >
                <motion.a
                    href={project.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-black/60 hover:bg-black/80 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group w-full sm:w-auto justify-center"
                    whileHover={{ 
                        scale: 1.05,
                        y: -3,
                        transition: {
                            type: "tween",
                            duration: 0.15,
                            ease: [0.4, 0, 0.2, 1]
                        }
                    }}
                    whileTap={{ 
                        scale: 0.97,
                        transition: {
                            type: "tween",
                            duration: 0.1,
                            ease: [0.4, 0, 0.2, 1]
                        }
                    }}
                    transition={{ 
                        type: "tween",
                        duration: 0.1,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{ willChange: "transform" }}
                >
                    <span className="font-medium">Visit Project</span>
                    <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        style={{ willChange: "transform" }}
                    >
                        <ExternalLinkIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </motion.div>
                </motion.a>
            </motion.div>
        </motion.div>
    );
}
