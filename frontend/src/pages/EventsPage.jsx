import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                // Use absolute path from public folder
                const res = await fetch('/Competitons.json');
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data.competitions || []);
            } catch (error) {
                console.error('Error loading events:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading events...</div>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-6xl mx-auto px-6 py-12">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Events & Competitions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover exciting competitions, hackathons, and events at Purdue University.
                        Challenge yourself and showcase your skills!
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.95, x: -20 }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                            whileHover={{ 
                                scale: 1.015,
                                x: 8,
                                transition: {
                                    type: "tween",
                                    duration: 0.15,
                                    ease: [0.4, 0, 0.2, 1]
                                }
                            }}
                            transition={{ 
                                type: "tween",
                                duration: 0.6,
                                ease: [0.4, 0, 0.2, 1],
                                delay: Math.min(index * 0.1, 0.8) // Cap delay at 0.8s to prevent long waits
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Card item={event} type="event" />
                        </motion.div>
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No events found.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
