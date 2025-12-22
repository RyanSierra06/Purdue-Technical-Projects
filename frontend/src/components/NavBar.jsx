import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Menu, X, Users, Trophy, FolderOpen, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
                    <motion.div
                        whileHover={{ 
                            scale: 1.03,
                            y: -1,
                            transition: { 
                                duration: 0.15, 
                                ease: [0.4, 0, 0.2, 1] 
                            }
                        }}
                        whileTap={{ 
                            scale: 1.01,
                            y: 0,
                            transition: { 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }
                        }}
                        transition={{ 
                            duration: 0.1, 
                            ease: [0.4, 0, 0.2, 1] 
                        }}
                        style={{ willChange: "transform" }}
                        className="rounded-lg"
                    >
                        <Link to="/" className="flex items-center space-x-3 hover:drop-shadow-[0_0_15px_rgba(74,144,226,0.6)] transition-all duration-200" onClick={closeMenu}>
                            <img
                                src={`${import.meta.env.BASE_URL}PTP-Logo.png`}
                                alt="USB PTP Icon"
                                className="w-10 h-10 object-contain"
                                draggable={false}
                            />
                            <span className="font-bold text-white select-none text-xl lg:text-lg">Purdue Technical Projects</span>
                        </Link>
                    </motion.div>

                    <div className="hidden lg:flex space-x-1">
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }} 
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Link to="/" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                        </motion.div>
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }} 
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Link to="/Projects" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Projects') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                                <FolderOpen className="w-5 h-5" />
                                <span>Projects</span>
                            </Link>
                        </motion.div>
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }} 
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Link to="/Clubs" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Clubs') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                                <Users className="w-5 h-5" />
                                <span>Clubs</span>
                            </Link>
                        </motion.div>
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }} 
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Link to="/Events" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Events') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                                <Trophy className="w-5 h-5" />
                                <span>Events</span>
                            </Link>
                        </motion.div>
                        <motion.div 
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }} 
                            whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                            }}
                            transition={{ 
                                duration: 0.1, 
                                ease: [0.4, 0, 0.2, 1] 
                            }}
                            style={{ willChange: "transform" }}
                        >
                            <Link to="/Submit" className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${isActive('/Submit') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`}>
                                <Plus className="w-5 h-5" />
                                <span>Submit</span>
                            </Link>
                        </motion.div>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="lg:hidden flex items-center p-2 rounded-lg text-gray-300 hover:bg-blue-500/20 hover:text-blue-400"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            className="lg:hidden mt-4 pb-4 border-t border-gray-700"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <motion.div 
                                className="flex flex-col space-y-2 pt-4"
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.15, delay: 0.05 }}
                            >
                            <Link to="/" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                            <Link to="/Projects" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Projects') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <FolderOpen className="w-5 h-5" />
                                <span>Projects</span>
                            </Link>
                            <Link to="/Clubs" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Clubs') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <Users className="w-5 h-5" />
                                <span>Clubs</span>
                            </Link>
                            <Link to="/Events" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Events') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <Trophy className="w-5 h-5" />
                                <span>Events</span>
                            </Link>
                            <Link to="/Submit" className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/Submit') ? 'bg-blue-500 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500/30 hover:text-blue-300'}`} onClick={closeMenu}>
                                <Plus className="w-5 h-5" />
                                <span>Submit</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
