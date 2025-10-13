import React from 'react';
import { ExternalLinkIcon, UsersIcon, TagIcon } from 'lucide-react';

export default function ProjectCard({ project }) {
    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-blue-500' : 'bg-gray-600';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Active' : 'Completed';
    };

    return (
        <div className="bg-black/40 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-80 h-80 object-contain rounded-lg bg-gray-800/50 p-2"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
                
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{project.name}</h3>
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
                </div>
            </div>
            
            <div className="flex justify-end mt-4">
                <a
                    href={project.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                    Visit Project
                    <ExternalLinkIcon className="w-4 h-4 ml-2" />
                </a>
            </div>
        </div>
    );
}
