import React, {useEffect, useState} from "react";
import Card from "../components/Card";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${import.meta.env.BASE_URL}Competitons.json`);
                const data = await res.json();
                setEvents(data.competitions || []);
                    } catch {
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
        <div className="min-h-screen pt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Events & Competitions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover exciting competitions, hackathons, and events at Purdue University.
                        Challenge yourself and showcase your skills!
                    </p>
                </div>

                <div className="space-y-8">
                    {events.map((event, index) => (
                        <Card key={index} item={event} type="event" />
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
