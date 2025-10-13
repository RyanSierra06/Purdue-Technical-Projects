import React, {useEffect, useState} from "react";
import Card from "../components/Card";

export default function CompetitionsPage() {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/Competitons.json');
                const data = await res.json();
                setCompetitions(data.competitions || []);
            } catch (_) {
                setCompetitions([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading competitions...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Competitions & Events</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover exciting competitions, hackathons, and events at Purdue University.
                        Challenge yourself and showcase your skills!
                    </p>
                </div>

                <div className="space-y-8">
                    {competitions.map((competition, index) => (
                        <Card key={index} item={competition} type="competition" />
                    ))}
                </div>

                {competitions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No competitions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}