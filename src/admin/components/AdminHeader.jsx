import React from "react";
import {
    FiHome,
    FiCalendar,
    FiBriefcase,
    FiSettings,
    FiUsers,
    FiUserCheck,
} from "react-icons/fi";

const tabs = [
    { name: "DashBoard", icon: FiHome },
    { name: "All Events", icon: FiCalendar },
    { name: "New Events", icon: FiBriefcase },
    { name: "Users", icon: FiUsers },
    { name: "Organizers", icon: FiUserCheck },
    { name: "Settings", icon: FiSettings },
];

const AdminHeader = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-64 bg-white rounded-2xl shadow-md p-5 sticky top-36 h-fit self-start">
            
            {/* USER */}
            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-gray-50">
                <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Admin"
                    className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                </div>
            </div>

            {/* NAV */}
            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
              ${activeTab === tab.name
                                ? "bg-blue-600 text-white shadow"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <tab.icon className="text-lg" />
                        {tab.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default AdminHeader;
