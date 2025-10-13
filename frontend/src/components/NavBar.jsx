import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, HelpCircle, Building2, Presentation, Code, Home, Menu, X } from 'lucide-react'

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    
    const isActive = (path) => {
        return location.pathname === path
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-b border-gray-700 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
                        <img
                            src="/PTP-Logo.png"
                            alt="USB PTP Icon"
                            className="w-10 h-10 object-contain"
                            draggable={false}
                        />
                        <span className="font-bold text-white select-none text-lg">Purdue Technical Projects</span>
                    </Link>

                    <div className="hidden md:flex space-x-1">
                        <Link to="/" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                            <span>Home</span>
                        </Link>
                        <Link to="/Clubs" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Clubs') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                            <span>Clubs</span>
                        </Link>
                        <Link to="/Competitions" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Competitions') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                            <span>Competitions</span>
                        </Link>
                        <Link to="/Projects" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Projects') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                            <span>Projects</span>
                        </Link>
                        <Link to="/Submit" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Submit') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                            <span>Submit</span>
                        </Link>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex items-center p-2 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-2 pt-4">
                            <Link to="/" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <span>Home</span>
                            </Link>
                            <Link to="/Clubs" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Clubs') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <span>Clubs</span>
                            </Link>
                            <Link to="/Competitions" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Competitions') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <span>Competitions</span>
                            </Link>
                            <Link to="/Projects" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Projects') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <span>Projects</span>
                            </Link>
                            <Link to="/Submit" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Submit') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <span>Submit</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
