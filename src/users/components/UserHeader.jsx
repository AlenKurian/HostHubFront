import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Button } from "flowbite-react";

const UserHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userDetails");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => { 
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const navLinks = [
        { name: "Home", path: "/user-home" },
        { name: "Events", path: "/user-events" },
        { name: "About", path: "/user/about" },
        { name: "Contact", path: "/user/contact" },
    ];

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };


    if (!user || user.role !== "user") {
        return null;
    }


    return (
        <header className="sticky top-4 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16
                    bg-white/70 backdrop-blur-md border border-gray-200
                    rounded-2xl shadow-md px-6">

                    {/* LOGO */}
                    <Link to="/user-home" className="text-4xl font-extrabold text-gray-900">
                        Host<span className="text-blue-600">Hub</span>
                    </Link>

                    {/* NAV */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-full text-lg font-medium
                                    border transition
                                    ${isActive
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* PROFILE DROPDOWN */}
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 px-3 py-2
                                border border-gray-200 rounded-full bg-gray-50
                                hover:bg-gray-100 transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-600
                                flex items-center justify-center text-white font-semibold">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block font-medium text-gray-700">
                                    {user.username}
                                </span>
                            </button>

                            {/* DROPDOWN MENU */}
                            {open && (
                                <div className="absolute right-0 mt-3 w-56
                                bg-white border rounded-xl shadow-lg overflow-hidden">

                                    <div className="px-4 py-3 border-b">
                                        <p className="font-semibold text-gray-800">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                        <span className="inline-block mt-2 text-xs
                                        bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                            {user.role}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-3
                                        text-red-600 hover:bg-red-50 transition"
                                    >
                                        <FiLogOut />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};


export default UserHeader;
