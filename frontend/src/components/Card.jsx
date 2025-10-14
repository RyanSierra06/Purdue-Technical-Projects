import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';

export default function Card({ item }) {
    return (
        <div className="bg-black/40 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <img
                        src={`${import.meta.env.BASE_URL}${item.image}`}
                        alt={item.name}
                        className="w-48 h-48 object-contain rounded-lg bg-gray-800/50 p-2"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
                
                <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-4">{item.name}</h3>
                    
                    <div className="flex-1 mb-4">
                        <p className="text-gray-300 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                    
                    <div className="flex justify-end">
                        <a
                            href={item.links}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-black/60 hover:bg-black/80 border border-blue-500/30 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                        >
                            <span className="font-medium">Visit Website</span>
                            <ExternalLinkIcon className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
