import React, { useEffect, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Globe, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

export default function HomePage() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    useEffect(() => {
        const loadFeaturedProjects = async () => {
            try {
                const projects = await getProjects();
                        // Get only featured projects
                        const featured = projects.filter(project => project.featured === true);
                // Shuffle and take 3 random projects
                const shuffled = featured.sort(() => 0.5 - Math.random());
                setFeaturedProjects(shuffled.slice(0, 3));
            } catch (error) {
                console.error('Error loading featured projects:', error);
                setFeaturedProjects([]);
            } finally {
                setLoading(false);
            }
        };
        loadFeaturedProjects();
    }, []);

    const goToPrevious = () => {
        setCurrentProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    const goToNext = () => {
        setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    return (
        <div className="min-h-screen pt-12">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-8">
                        <img 
                            src="/PTP-Logo.png" 
                            alt="Purdue Technical Projects Logo" 
                            className="w-20 h-20 mr-6 object-contain"
                        />
                        <h1 className="text-5xl md:text-7xl font-bold text-white">
                            Purdue <span className="text-blue-400">Technical Projects</span>
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                        Discover, explore, and showcase amazing technical projects created by Purdue students. 
                        From personal projects to hackathon winners, find inspiration and connect with fellow developers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/Projects" 
                            className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                        >
                            Explore Projects
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </a>
                        <a 
                            href="/Submit" 
                            className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 text-lg font-medium rounded-lg hover:bg-blue-600/10 transition-colors inline-flex items-center justify-center"
                        >
                            Submit Your Project
                        </a>
                    </div>
                </div>

                {/* Featured Projects Navigation */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Featured Projects
                    </h2>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-white text-xl">Loading featured projects...</div>
                        </div>
                    ) : featuredProjects.length > 0 ? (
                        <div className="relative">
                            <div className="flex items-center justify-center gap-16">
                                {/* Left Arrow */}
                                <button
                                    onClick={goToPrevious}
                                    className="flex-shrink-0 p-4 bg-black/60 hover:bg-black/80 text-white rounded-full border border-gray-600 hover:border-blue-500 transition-all duration-200 hover:scale-110"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                {/* Project Display */}
                                <div className="flex-1 max-w-7xl">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentProjectIndex}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ 
                                                duration: 0.3,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <ProjectCard project={featuredProjects[currentProjectIndex]} />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Right Arrow */}
                                <button
                                    onClick={goToNext}
                                    className="flex-shrink-0 p-4 bg-black/60 hover:bg-black/80 text-white rounded-full border border-gray-600 hover:border-blue-500 transition-all duration-200 hover:scale-110"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Project Indicators */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {featuredProjects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentProjectIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                            index === currentProjectIndex
                                                ? 'bg-blue-500'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No featured projects available.</p>
                        </div>
                    )}
                </div>

                {/* How It Works Section */}
                <div className="mb-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Browse & Discover</h3>
                            <p className="text-gray-300 text-sm">
                                Explore Student projects, project based clubs, and technical competitions to and explore all Purdue has to offer.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Get Inspired</h3>
                            <p className="text-gray-300 text-sm">
                                See some of Purdue's most innovative projects and learn more about what talented students are doing all across campus.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Create & Build</h3>
                            <p className="text-gray-300 text-sm">
                                Work on your own projects, join clubs, participate in competitions, and upload your own work to be featured.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-white">4</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Share & Connect</h3>
                            <p className="text-gray-300 text-sm">
                                Submit your projects to inspire others and build your portfolio outside of just your github.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Connect with USB Section */}
            <div className="mb-20">
                <h2 className="text-4xl font-bold text-white text-center mb-6">
                    Connect with USB
                </h2>
                <div className="text-center">
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                        Still have questions about undergraduate research or want to reach out? Check out our Instagram and website for more about Purdue USB.
                    </p>
                    <div className="flex justify-center items-center space-x-12">
                        <a
                            href="https://purdueusb.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-300 text-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
                        >
                            <Globe className="w-6 h-6"/>
                            <span>USB Website</span>
                        </a>
                        <a
                            href="https://www.instagram.com/purdueusb/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-pink-300 text-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
                        >
                            <Camera className="w-6 h-6"/>
                            <span>USB Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}