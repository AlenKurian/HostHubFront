import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

const TicketModal = ({ booking, onClose }) => {
    if (!booking) return null;

    const handleDownload = async () => {
        const ticket = document.getElementById("ticketCanvas");

        const canvas = await html2canvas(ticket);
        const link = document.createElement("a");

        link.download = "event-ticket.png";
        link.href = canvas.toDataURL();
        link.click();
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
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl font-bold"
                >
                    x
                </button>

                <div id="ticketCanvas" className="text-center">

                    <h2 className="text-xl font-bold mb-3">
                        {booking.eventId.title}
                    </h2>

                    <p className="text-sm text-gray-600">
                        {formatDate(booking.eventId.date)} • {booking.eventId.location}
                    </p>

                    <p className="mt-2 font-semibold">
                        Tickets: {booking.ticketsBooked}
                    </p>

                    {/* QR CODE */}
                    <div className="flex justify-center mt-5">
                        <QRCodeCanvas
                            value={JSON.stringify({
                                bookingId: booking._id,
                                eventId: booking.eventId._id,
                                tickets: booking.ticketsBooked,
                            })}
                            size={200}
                        />
                    </div>

                    <p className="mt-2 font-bold">Scan for your Tickets</p>

                </div>
                

                {/* DOWNLOAD BUTTON
                <button
                    onClick={handleDownload}
                    className="mt-6 w-full py-2 bg-green-600 text-white
          rounded-md hover:bg-green-700"
                >
                    Download Ticket
                </button> */}
            </div>
        </div>
    );
};

export default TicketModal;
