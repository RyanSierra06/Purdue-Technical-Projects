import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';

export default function Card({ item, type = 'item' }) {
    return (
        <div className="bg-black/40 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex gap-6">
                <div className="flex-shrink-0">
                    <img
                        src={`/${item.image}`}
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
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                            Visit Website
                            <ExternalLinkIcon className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
