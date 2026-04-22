import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="fixed top-4 left-0 w-full z-50 flex justify-center">
            <div
                className="flex items-center gap-130 px-8 py-3
                   backdrop-blur-xl
                   rounded-full shadow-lg"
            >
                <Link
                    to="/"
                    className="text-4xl font-extrabold text-gray-900 whitespace-nowrap"
                >
                    Host<span className="text-indigo-600">Hub</span>
                </Link>

                <nav className="flex items-center gap-15">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg font-medium transition ${location.pathname === link.path
                                    ? "text-indigo-500"
                                    : "text-white hover:text-indigo-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <Link
                    to="/auth"
                    className="px-5 py-2 rounded-full
                     bg-indigo-600 text-white text-lg font-medium
                     hover:bg-indigo-700 transition whitespace-nowrap"
                >
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;
