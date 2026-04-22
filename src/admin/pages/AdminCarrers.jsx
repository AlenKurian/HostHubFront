import React, { useEffect, useState } from "react";
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import CareerEventModal from "../components/CareerEventModal";
import { approveEventsAPI, pendingEventsAPI, rejectEventsAPI } from "../../services/allAPIs";

const AdminCareers = () => {

    const [requests, setRequests] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const fetchPendingEvents = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const res = await pendingEventsAPI(reqHeader);
            if (res?.data) {
                setRequests(res.data);
            } else {
                setRequests([]);
            }
        } catch (err) {
            console.log("Fetch error", err);
        }
    };

    const handleApprove = async (id) => {
        console.log("Approve clicked ID:", id);
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            await approveEventsAPI(id, reqHeader);

            fetchPendingEvents();

            setSelectedEvent(null);
            alert("Event Approved");
        } catch {
            alert("Approval failed");
        }
    };

    const handleReject = async (id) => {
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            await rejectEventsAPI(id, reqHeader);

            fetchPendingEvents();

            setSelectedEvent(null);
            alert("Event Rejected");
        } catch {
            alert("Reject failed");
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });


    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Organizer Event Requests
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {requests?.length > 0 ? (
                    requests.map((event) => (
                        <div
                            key={event._id}
                            className="group bg-white border border-gray-200 rounded-2xl
                       overflow-hidden transition-all duration-300
                       hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover
                           transition-transform duration-500
                           group-hover:scale-110"
                                />

                                <span className="absolute top-3 left-3 px-3 py-1 text-xs
                               bg-blue-600 text-white rounded-full">
                                    {event.category}
                                </span>

                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full
                                    ${event.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : event.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {event.status}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                    {event.title}
                                </h3>

                                <div className="space-y-1 text-sm text-gray-600 mb-4">
                                    <p className="flex items-center gap-2">
                                        <FiCalendar className="text-blue-600" /> {formatDate(event.date)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FiMapPin className="text-blue-600" /> {event.location}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FiUsers className="text-blue-600" />{" "}
                                        {event.nooftickets.toLocaleString()} Tickets
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedEvent(event)}
                                    className="w-full px-4 py-2 border border-blue-600
                           text-blue-700 rounded-md
                           hover:bg-blue-600 hover:text-white transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                        <p>No Pending Events</p>
                )}
            </div>

            {selectedEvent && (
                <CareerEventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onApprove={() => handleApprove(selectedEvent._id)}
                    onDecline={() => handleReject(selectedEvent._id)}
                />
            )}
        </div>
    );
};

export default AdminCareers;
