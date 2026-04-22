import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminHome from "./AdminHome";
import AdminEvents from "./AdminEvents";
import AdminCareers from "./AdminCarrers";
import AdminSettings from "./AdminSettings";
import AdminUsers from "./AdminUsers";
import AdminOrganizers from "./AdminOrganizers";
import Auth from "../../pages/Auth";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("DashBoard");

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex gap-6">
                {/* LEFT SIDEBAR */}
                <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* RIGHT CONTENT */}
                <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                    {activeTab === "DashBoard" && <AdminHome />}
                    {activeTab === "All Events" && <AdminEvents />}
                    {activeTab === "New Events" && <AdminCareers />}
                    {activeTab === "Users" && <AdminUsers />}
                    {activeTab === "Organizers" && <AdminOrganizers />}
                    {activeTab === "Settings" && <AdminSettings />}
                    {activeTab === "SignOut" && <Auth />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
