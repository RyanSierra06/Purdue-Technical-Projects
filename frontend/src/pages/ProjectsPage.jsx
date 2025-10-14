import React, {useEffect, useState} from "react";
import { SearchIcon } from "lucide-react";
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
        <div className="min-h-screen pt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Student Projects</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Explore amazing projects created by Purdue students. 
                        From personal projects to hackathon winners!
                    </p>
                    
                    <div className="max-w-lg mx-auto">
                        <div className="relative text-gray-300">
                            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by tags or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 backdrop-blur-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            All Projects
                        </button>
                        <button
                            onClick={() => setSelectedCategory('personal-project')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'personal-project'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Personal Projects
                        </button>
                        <button
                            onClick={() => setSelectedCategory('class-project')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'class-project'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Class Projects
                        </button>
                        <button
                            onClick={() => setSelectedCategory('hackathon')}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedCategory === 'hackathon'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Hackathons
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

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
        </div>
    );
}