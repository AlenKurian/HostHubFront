import { FiX, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import { approveEventsAPI, rejectEventsAPI } from "../../services/allAPIs";
import { useState } from "react";

const CareerEventModal = ({ event, onClose, onApprove, onDecline }) => {


    const [pendingEvents, setPendingEvents] = useState()


    const handleApprove = async (id) => {
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            await approveEventsAPI(id, reqHeader);

            alert("Event Approved");

            setPendingEvents(prev =>
                prev.filter(e => e._id !== id)
            );

        } catch (err) {
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

            alert("Event Rejected");

            setPendingEvents(prev =>
                prev.filter(e => e._id !== id)
            );

        } catch (err) {
            alert("Reject failed");
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">

                <div className="relative h-56">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                        <p className="flex items-center gap-2">
                            <FiCalendar className="text-blue-600" /> {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                            <FiMapPin className="text-blue-600" /> {event.location}
                        </p>
                        <p className="flex items-center gap-2">
                            <FiUsers className="text-blue-600" />{" "}
                            {event.nooftickets.toLocaleString()} tickets
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                onApprove(event._id); 
                                onClose();
                            }}
                            
                            className="px-4 py-2 bg-green-600 text-white
                         rounded-md hover:bg-green-700 transition"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => {
                                onDecline(event._id); 
                                onClose();
                            }}
                            className="px-4 py-2 bg-red-600 text-white
                         rounded-md hover:bg-red-700 transition"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerEventModal;
