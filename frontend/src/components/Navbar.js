import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-red-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src="/pokeball-icon.png"
                        alt="Pokeball Icon"
                        className="w-8 h-8"
                    />
                    <Link
                        to="/"
                        className="text-2xl font-bold uppercase tracking-wide hover:text-gray-200 transition"
                    >
                        Pokedex Manager
                    </Link>
                </div>

                
                <button
                    className="block text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>

            {/* Menu Dropdown */}
            {isMenuOpen && (
                <div className="bg-red-500 text-white py-4">
                    <div className="container mx-auto flex flex-col space-y-3">
                        <Link
                            to="/my-collection"
                            className="hover:text-gray-200 transition px-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Collection
                        </Link>
                        <Link
                            to="/login"
                            className="hover:text-gray-200 transition px-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="hover:text-gray-200 transition px-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
