import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import { loadStripe } from "@stripe/stripe-js";
import { buyEventTicketAPI } from "../../services/allAPIs";

const BookTicketModal = ({ event, token, onClose }) => {
    const [tickets, setTickets] = useState(1);
    const [step, setStep] = useState("select"); // select | payment | ticket
    const [booking, setBooking] = useState(null);

    if (!event) return null;

    const totalPrice = event.price * tickets;

    const handleBuyTicket = async (event) => {
        // const stripe = await loadStripe('pk_test_51SplwxHIQ8EC8cq4BYntBlipm6z5gasNtBdrDNqaUqiQI0zJWCSMAWGMRDhLWcBKijaYC2nyOYq0oDzKk3xQQAFu00mLBEsewl');
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            console.log('Event ID:', event._id)
            const res = await buyEventTicketAPI(event._id, { ticketsBooked: tickets }, reqHeader);

            console.log("Backend response:", res.data);

            if (!res.data || !res.data.url) {
                alert("Payment session not created");
                return;
            }

            window.location.href = res.data.url;


        } catch (err) {
            console.log("Payment error:", err.response?.data || err.message);
            alert("Payment failed");
        }
    };


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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-xl p-6 w-[90%] max-w-md"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800
             text-2xl font-bold focus:outline-none"
                >
                    &times;
                </button>


                {/* STEP 1: SELECT TICKETS */}
                {step === "select" && (
                    <>
                        <h2 className="text-xl font-bold mb-3">{event.title}</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            {formatDate(event.date)} • {event.location}
                        </p>

                        <label className="block font-medium mb-2">
                            Number of Tickets
                        </label>

                        <div className="flex items-center justify-between border rounded-lg px-3 py-2 mb-4">

                            {/* Decrease */}
                            <button
                                onClick={() => setTickets((prev) => Math.max(1, prev - 1))}
                                className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                -
                            </button>

                            {/* Count */}
                            <span className="text-lg font-semibold">
                                {tickets}
                            </span>

                            {/* Increase */}
                            <button
                                onClick={() =>
                                    setTickets((prev) =>
                                        Math.min(event.nooftickets, prev + 1)
                                    )
                                }
                                className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                +
                            </button>
                        </div>


                        <p className="text-lg font-semibold mb-4">
                            Total Price:{" "}
                            {event.price === 0 ? "Free" : `₹${totalPrice}`}
                        </p>

                        <button
                            onClick={() => handleBuyTicket(event)}
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            Proceed to Pay
                        </button>
                    </>
                )}

                {/* STEP 2: PAYMENT */}
                {step === "payment-success" && (
                    <div className="text-center py-10">
                        <p className="text-lg font-semibold">Processing Payment...</p>
                    </div>
                )}

                {/* STEP 3: QR TICKET */}
                {step === "ticket" && booking && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Your Ticket</h2>

                        <div className="flex justify-center mb-4">
                            <QRCodeCanvas
                                value={JSON.stringify({
                                    bookingId: booking._id,
                                    eventId: booking.eventId,
                                })}
                                size={200}
                            />

                        </div>

                        <p className="text-sm text-center text-gray-600">
                            {booking.ticketsBooked} Ticket(s) booked
                        </p>

                        <p className="text-xs text-center mt-2">
                            Show this QR code at entry
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default BookTicketModal;
