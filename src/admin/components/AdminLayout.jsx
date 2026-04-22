import React from "react";
import {
    FiHome,
    FiCalendar,
    FiUsers,
    FiUserCheck,
    FiSettings,
    FiBriefcase,
    FiLogOut,
} from "react-icons/fi";
FiLogOut

const AdminLayout = ({ children }) => {
    const navItems = [
        { name: "Dashboard", icon: FiHome, path: "/admin" },
        { name: "All Events", icon: FiCalendar, path: "/admin/events" },
        { name: "New Events", icon: FiBriefcase, path: "/admin/careers" },
        { name: "Users", icon: FiUsers, path: "/admin/users" },
        { name: "Organizers", icon: FiUserCheck, path: "/admin/organizers" },
        { name: "Settings", icon: FiSettings, path: "/admin/settings" },
        { name: "Sign Out", icon: FiLogOut, path: "/login", danger: true },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-lg">
                {/* BRAND */}
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Host<span className="text-blue-600">Hub</span>
                    </h1>
                </div>

                {/* USER */}
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-lg font-semibold text-gray-900">Admin</p>
                    </div>

                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Admin"
                        className="w-15 h-15 rounded-full object-cover border"
                    />
                </div>
            </header>

            {/* BODY */}
            <div className="flex gap-6 p-6">
                {/* MAIN CONTENT */}
                <main className="flex-1 bg-white rounded-2xl shadow-md">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
