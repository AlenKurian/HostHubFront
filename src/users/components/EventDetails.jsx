import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers, FiTag } from "react-icons/fi";

const EventDetails = ({ event, onClose }) => {
    if (!event) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl max-w-3xl w-full
                   overflow-hidden animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* IMAGE */}
                <div className="h-64 w-full">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6">
                    {/* TITLE */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {event.title}
                    </h2>

                    {/* META INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
                        <p className="flex items-center gap-2">
                            <FiTag className="text-blue-600" />
                            {event.category}
                        </p>

                        <p className="flex items-center gap-2">
                            <FiCalendar className="text-blue-600" />
                            {formatDate(event.date)} ({event.time})
                        </p>

                        <p className="flex items-center gap-2">
                            <FiMapPin className="text-blue-600" />
                            {event.location}
                        </p>

                        <p className="flex items-center gap-2">
                            <FiUsers className="text-blue-600" />
                            {event.nooftickets} tickets available
                        </p>

                        <p className="flex items-center gap-2">
                            <strong>Price:</strong>{" "}
                            {event.price == 0 ? "Free" : `₹${event.price}`}
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-6 text-gray-700 text-sm leading-relaxed">
                        {event.description}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300
                         rounded-md hover:bg-gray-100 transition"
                        >
                            Back
                        </button>

                        <Link
                            to={`/book/${event._id}`}
                            className="px-6 py-2 bg-blue-600 text-white
                         rounded-md hover:bg-blue-700 transition"
                        >
                            Book Tickets
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
