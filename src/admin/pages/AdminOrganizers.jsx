import React, { useEffect, useState } from "react";
import { FiTrash2, FiUserCheck, FiCalendar } from "react-icons/fi";
import { deleteUserAPI, getAllOrganizerAPI } from "../../services/allAPIs";

const AdminOrganizers = () => {
    const [organizers, setOrganizers] = useState([]);

    const token = sessionStorage.getItem("token");
    
        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };
    
        const fetchOrganizers = async () => {
            const res = await getAllOrganizerAPI(reqHeader);
            setOrganizers(res.data);
        };
    
        useEffect(() => {
            fetchOrganizers();
        }, []);
    
        const removeOrganizer = async (id) => {
            if (!window.confirm("Delete this user?")) return;
    
            await deleteUserAPI(id, reqHeader);
            setOrganizers((prev) => prev.filter((u) => u._id !== id));
    };
    
    return (
        <section className="p-2">
            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl
              bg-gradient-to-br from-green-600 to-emerald-600
              flex items-center justify-center text-white"
                        >
                            <FiUserCheck />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Organizers
                            </h1>
                            <p className="text-sm text-gray-500">
                                Manage event organizers
                            </p>
                        </div>
                    </div>

                    {/* COUNT */}
                    <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                        {organizers.length} Organizers
                    </span>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b text-sm">
                            <tr>
                                <th className="py-4 px-6 font-medium text-gray-700">
                                    Organizer
                                </th>
                                <th className="py-4 px-6 font-medium text-gray-700">
                                    Email
                                </th>
                                <th className="py-4 px-6 font-medium text-gray-700">
                                    Events Hosted
                                </th>
                                <th className="py-4 px-6 font-medium text-gray-700 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {organizers.map((org) => (
                                <tr
                                    key={org._id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="py-4 px-6 font-medium text-gray-900">
                                        {org.username}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {org.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className="inline-flex items-center gap-2
                      px-3 py-1 rounded-full
                      bg-blue-50 text-blue-700
                      text-sm font-semibold"
                                        >
                                            <FiCalendar />
                                            {org.events}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => removeOrganizer(org._id)}
                                            className="inline-flex items-center gap-2
                        px-4 py-2 text-sm rounded-lg
                        border border-red-500 text-red-600
                        hover:bg-red-600 hover:text-white
                        transition"
                                        >
                                            <FiTrash2 />
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {organizers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-16 text-gray-500"
                                    >
                                        No organizers available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AdminOrganizers;
