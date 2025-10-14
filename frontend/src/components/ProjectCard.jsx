import React from 'react';
import { ExternalLinkIcon, UsersIcon, TagIcon, FolderIcon } from 'lucide-react';

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
        <div className="bg-black/40 rounded-lg p-4 md:p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/projects/${project._id}/image`}
                        alt={project.name}
                        loading="lazy"
                        className="w-full md:w-80 h-80 md:h-80 object-contain rounded-lg bg-gray-800/50 p-2"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
                
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-0 mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{project.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                                {getStatusText(project.status)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-gray-300 leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TagIcon className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-500">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-700/30 text-blue-300 text-xs rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <UsersIcon className="w-4 h-4 text-blue-300" />
                            <span className="text-sm font-medium text-blue-300">Members:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.members.map((member, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-400/20 text-blue-100 text-xs rounded-md">
                                    {member}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FolderIcon className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-blue-300">Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-700/30 text-blue-300 text-xs rounded-md">
                                {getCategoryText(project.category_id)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center sm:justify-end mt-4 sm:mt-0">
                <a
                    href={project.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-black/60 hover:bg-black/80 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group w-full sm:w-auto justify-center"
                >
                    <span className="font-medium">Visit Project</span>
                    <ExternalLinkIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
            </div>
        </div>
    );
}
