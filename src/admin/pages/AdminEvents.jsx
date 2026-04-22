import React, { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiUsers, FiTrash2 } from "react-icons/fi";
import { deleteEventAPI, getAllEventsAPI } from "../../services/allAPIs";

const AdminEvents = () => {

    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const res = await getAllEventsAPI(reqHeader);
            setEvents(res.data);
        } catch (err) {
            console.log("Fetch error", err);
        }
    };


    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            await deleteEventAPI({ ids: selected }, reqHeader);

            setSelected([]);
            setSelectionMode(false);
            fetchEvents();
        } catch (err) {
            alert("Delete failed");
        }
    };
    

    return (
        <div className="container mx-auto px-4">

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">All Events</h2>

                <div className="flex items-center gap-3">
                    {/* SELECT BUTTON */}
                    <button onClick={() => {
                        setSelectionMode(!selectionMode);
                        setSelected([]);
                    }} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-base text-lg px-4 py-2.5 text-center leading-5 rounded-lg">
                        {selectionMode ? "Cancel" : "Select"}
                    </button>

                    {/* DELETE BUTTON (ONLY WHEN SELECTION EXISTS) */}
                    {selectionMode && selected.length > 0 && (
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2.5
                   bg-gradient-to-r from-red-400 to-red-600
                   text-white rounded-lg hover:from-red-500 hover:to-red-700"
                        >
                            <FiTrash2 />
                            Delete Selected ({selected.length})
                        </button>
                    )}

                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                    <AdminEventCard
                        key={event._id}
                        event={event}
                        selectionMode={selectionMode}
                        selected={selected.includes(event._id)}
                        onSelect={() => toggleSelect(event._id)}
                    />
                ))}
            </div>

        </div>
    );
};

const AdminEventCard = ({ event, selected, onSelect, selectionMode }) => (
    <div
        className={`group bg-white border rounded-2xl overflow-hidden
      transition-all duration-300
      hover:-translate-y-2 hover:shadow-xl
      ${selected ? "border-red-500 ring-2 ring-red-400" : "border-gray-200"}`}
    >
        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
            <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover
          transition-transform duration-500
          group-hover:scale-110"
            />

            {/* CHECKBOX — ONLY IN SELECTION MODE */}
            {selectionMode && (
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onSelect}
                    className="absolute top-3 right-3 w-6 h-6
                     accent-red-600 cursor-pointer"
                />
            )}

            <span className="absolute top-3 left-3 px-3 py-1 text-xs
        bg-blue-600 text-white rounded-full">
                {event.category}
            </span>

            <span className="absolute bottom-3 right-3 px-3 py-1 text-xs
        bg-white/90 text-gray-900 rounded-full font-semibold">
                {event.price === 0 ? "Free" : `$${event.price}`}
            </span>
        </div>

        {/* CONTENT */}
        <div className="p-5">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
                {event.title}
            </h3>

            <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                    <FiCalendar className="text-blue-600" /> {event.date}
                </p>
                <p className="flex items-center gap-2">
                    <FiMapPin className="text-blue-600" /> {event.location}
                </p>
                <p className="flex items-center gap-2">
                    <FiUsers className="text-blue-600" />
                    {event.nooftickets.toLocaleString()} Tickets
                </p>
            </div>

            {/* VIEW DETAILS */}
            <button
                className="mt-4 w-full px-4 py-2 border border-blue-600
                   text-blue-700 rounded-md
                   hover:bg-blue-600 hover:text-white transition"
            >
                View Details
            </button>
        </div>
    </div>
);



export default AdminEvents;
