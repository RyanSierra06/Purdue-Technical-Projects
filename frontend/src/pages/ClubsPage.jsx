import React, {useEffect, useState} from "react";
import Card from "../components/Card";


export default function ClubsPage() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/Clubs.json');
                const data = await res.json();
                setClubs(data.clubs || []);
            } catch (_) {
                setClubs([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading clubs...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Purdue <span className="text-blue-400">Technical Clubs</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover amazing clubs and organizations at Purdue University. 
                        Join communities that share your interests and passions!
                    </p>
                </div>

                <div className="space-y-8">
                    {clubs.map((club, index) => (
                        <Card key={index} item={club} type="club" />
                    ))}
                </div>

                {clubs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No clubs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}