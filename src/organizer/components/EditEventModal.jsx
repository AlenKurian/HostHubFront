import React, { useState, useEffect } from "react";
import { updateEventAPI } from "../../services/allAPIs";

const EditEventModal = ({ event, onClose, refresh }) => {

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (event) {
            setFormData(event);
        }
    }, [event]);

    if (!event) return null;


    const handleUpdate = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            };

            await updateEventAPI(formData._id, formData, reqHeader);

            alert("Event updated!");

            refresh(formData); // update parent list
            onClose();

        } catch (err) {
            alert("Update failed");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[500px]">

                <h2 className="text-xl font-bold mb-4">Edit Event</h2>

                <label className="block text-sm font-semibold mb-1">
                    Event Title
                </label>
                <input
                    value={formData.title || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Title"
                />

                <label className="block text-sm font-semibold mb-1">
                    Category
                </label>
                <input
                    value={formData.category || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    Location
                </label>
                <input
                    value={formData.location || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    Date
                </label>
                <input
                    value={formData.date || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    Time
                </label>
                <input
                    value={formData.time || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    Price
                </label>
                <input
                    value={formData.price || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Price"
                />

                <label className="block text-sm font-semibold mb-1">
                    N0. of Tickets
                </label>
                <input
                    value={formData.nooftickets || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, nooftickets: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    ImageUrl
                </label>
                <input
                    value={formData.imageUrl || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <label className="block text-sm font-semibold mb-1">
                    Description
                </label>
                <input
                    value={formData.description || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="border w-full p-2 mb-3 rounded"
                    placeholder="Location"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Update
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditEventModal;
