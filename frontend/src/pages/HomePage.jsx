import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Globe, Camera, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/api';

export default function HomePage() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const lastClickTime = useRef(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        const loadRandomProjects = async () => {
            try {
                const projects = await getProjects();
                
                if (!isMounted) return;

                const shuffled = [...projects];
                const selectedProjects = [];

                if (shuffled.length >= 3) {
                    for (let i = 0; i < 3; i++) {
                        const randomIndex = Math.floor(Math.random() * shuffled.length);
                        selectedProjects.push(shuffled[randomIndex]);
                        shuffled.splice(randomIndex, 1);
                    }
                } else {
                    selectedProjects.push(...shuffled);
                }

                setFeaturedProjects(selectedProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error loading random projects:', error);
                if (isMounted) {
                    setFeaturedProjects([]);
                    setLoading(false);
                }
            }
        };
        
        loadRandomProjects();
        
        return () => {
            isMounted = false;
        };
    }, []);

    const goToPrevious = () => {
        const now = Date.now();
        if (now - lastClickTime.current < 800 || isNavigating) {
            return;
        }
        
        lastClickTime.current = now;
        setIsNavigating(true);
        setCurrentProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

        setTimeout(() => {
            setIsNavigating(false);
        }, 800);
    };

    const goToNext = () => {
        const now = Date.now();
        if (now - lastClickTime.current < 800 || isNavigating) {
            return;
        }
        
        lastClickTime.current = now;
        setIsNavigating(true);
        setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);

        setTimeout(() => {
            setIsNavigating(false);
        }, 800);
    };

    return (
        <>
        <div className="min-h-screen pt-16">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-8">
                        <img 
                            src={`${import.meta.env.BASE_URL}PTP-Logo.png`}
                            alt="Purdue Technical Projects Logo" 
                            className="w-20 h-20 mr-6 object-contain"
                        />
                        <h1 className="text-5xl md:text-7xl font-bold text-white">
                            Purdue <span className="text-blue-400">Technical Projects</span>
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                        From innovative personal creations, to award-winning hackathon entries, dive into a showcase of what makes Purdue CS great.
                        Get inspired, submit your own projects, and explore the creativity and technical excellence of the Purdue community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/Purdue-Technical-Projects/Projects"
                            className="px-8 py-4 bg-black/60 hover:bg-black/80 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 text-lg font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 inline-flex items-center justify-center group"
                        >
                            Explore Projects
                            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                        <a
                            href="Purdue-Technical-Projects//Submit"
                            className="px-8 py-4 bg-transparent border-2 border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 text-lg font-medium rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 inline-flex items-center justify-center group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                            <span>Submit Your Project</span>
                        </a>
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Featured Projects
                    </h2>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="text-white text-xl">Loading projects...</div>
                        </div>
                    ) : featuredProjects.length > 0 ? (
                        <div className="relative">
                            <div className="flex items-center justify-center gap-16">
                                <button
                                    onClick={goToPrevious}
                                    disabled={isNavigating}
                                    className={`flex-shrink-0 p-4 bg-black/60 text-white rounded-full border border-gray-600 transition-all duration-200 ${
                                        isNavigating 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:bg-black/80 hover:border-blue-500 hover:scale-110'
                                    }`}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

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

                                <button
                                    onClick={goToNext}
                                    disabled={isNavigating}
                                    className={`flex-shrink-0 p-4 bg-black/60 text-white rounded-full border border-gray-600 transition-all duration-200 ${
                                        isNavigating 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : 'hover:bg-black/80 hover:border-blue-500 hover:scale-110'
                                    }`}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

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

                <div className="mb-4 bg-black/40 rounded-lg p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Our Goals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500/60 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-300">1</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Browse & Discover</h3>
                            <p className="text-gray-300 text-base">
                                Explore a comprehensive showcase of technical projects created by Purdue students.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500/60 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-300">2</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Get Inspired</h3>
                            <p className="text-gray-300 text-base">
                                Find inspiration from innovative developers and connect with the talented Purdue community.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500/60 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-300">3</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Create & Build</h3>
                            <p className="text-gray-300 text-base">
                                Join clubs and participate in events to build your own technical projects.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500/60 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-300">4</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Share & Connect</h3>
                            <p className="text-gray-300 text-base">
                                Submit your technical projects to showcase your work and inspire fellow students.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <footer className="bg-black/40 border-t border-gray-700/50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Connect with USB
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                        Still have questions about undergraduate research or want to reach out? Check out our Instagram and website for more about Purdue USB.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <a
                            href="https://purdueusb.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-black/60 hover:bg-black/80 border border-yellow-500/30 hover:border-yellow-400/60 text-yellow-300 hover:text-yellow-200 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 group"
                        >
                            <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200"/>
                            <span className="font-medium">USB Website</span>
                        </a>
                        <a
                            href="https://www.instagram.com/purdueusb/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-black/60 hover:bg-black/80 border border-pink-500/30 hover:border-pink-400/60 text-pink-300 hover:text-pink-200 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group"
                        >
                            <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"/>
                            <span className="font-medium">USB Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}