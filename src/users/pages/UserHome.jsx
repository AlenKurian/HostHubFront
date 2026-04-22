import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiCalendar,
    FiMail,
    FiMapPin,
    FiPhone,
    FiSearch,
    FiUsers,
} from "react-icons/fi";
import UserHeader from "../components/UserHeader";
import EventDetails from "../components/EventDetails";
import { Button } from "flowbite-react";
import { getBookingsAPI, getHomeEventsAPI } from "../../services/allAPIs";
import BookTicketModal from "../components/BookTicketModal";
import TicketModal from "../components/TicketModal";

const UserHome = () => {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [detailsEvent, setDetailsEvent] = useState(null);
    const [bookingEvent, setBookingEvent] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await getHomeEventsAPI();
            setEvents(response.data)
        }
        catch (err) {
            console.log("Event fetch error", err);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const filteredEvents = (events || [])
        .filter(event => event.status === "approved")
        .filter(event =>
            event?.title?.toLowerCase().includes(search.toLowerCase())
        );


    const [bookings, setBookings] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const getMyBookings = async () => {
        try {
            const token = sessionStorage.getItem("token");            
            const reqHeader = {
                Authorization: `Bearer ${token}`
            };

            const response = await getBookingsAPI(reqHeader);
            setBookings(response.data);
        } catch (err) {
            console.log("Booking fetch error", err);
        }
    };

    useEffect(() => {
        getMyBookings();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };



    return (
        <div>
            <UserHeader />
            
            <section className="relative h-[55vh] w-full mt-9">
                <img
                    src="https://i.pinimg.com/1200x/b1/a0/15/b1a01574e6ccfc4818c7e43b4859d557.jpg"
                    alt="Event Cover"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 h-full flex flex-col
                      items-center justify-center text-center px-4 ">
                    <h1 className="text-6xl sm:text-5xl font-bold text-white mb-12">
                        Let's Find Your Next Unforgettable <br /> Experience 
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 max-w-3xl">
                        Discover unforgettable experiences, book tickets effortlessly, and be part
                        of events that matter to you.
                    </p>
                </div>
            </section>
            

        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Latest Events for You
                    </h1>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.length ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />

                                    <span className="absolute top-3 left-3 px-3 py-1 text-xs bg-blue-600 text-white rounded-full">
                                        {event.category}
                                    </span>

                                    <span className="absolute top-3 right-3 px-3 py-1 text-xs bg-white/90 text-gray-800 rounded-full font-semibold">
                                        {event.price === 0 ? "Free" : `$${event.price}`}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                                        {event.title}
                                    </h3>

                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <FiCalendar className="text-blue-600" />
                                            {formatDate(event.date)}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <FiMapPin className="text-blue-600" />
                                            {event.location}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <FiUsers className="text-blue-600" />
                                            {event.nooftickets.toLocaleString()} tickets
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <button
                                            onClick={() => setDetailsEvent(event)}
                                            className="text-center px-4 py-2 border border-blue-600
             text-blue-700 rounded-md
             hover:bg-blue-600 hover:text-white transition"
                                        >
                                            View Details
                                        </button>
                                        
                                        <button
                                            onClick={() => setBookingEvent(event)}
                                            className="text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                        >
                                            Book Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center py-10">
                            No events found matching your filters.
                        </p>
                    )}
                    </div>

                    {detailsEvent && (
                        <EventDetails
                            event={detailsEvent}
                            onClose={() => setDetailsEvent(null)}
                        />
                    )}

                    {bookingEvent && (
                        <BookTicketModal
                            event={bookingEvent}
                            token={token}
                            onClose={() => setBookingEvent(null)}
                        />
                    )}



                    <div className="flex justify-center mt-12">
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium py-7">
                            <Link
                                to="/user-events"
                            >
                                Explore More Events
                            </Link>
                        </Button>
                    {/* <Link
                        to="/user-events"
                        className="inline-flex items-center gap-2
               px-8 py-3 rounded-full
               bg-blue-600 text-white font-medium
               hover:bg-blue-700 transition"
                    >
                        Explore More Events
                    </Link> */}
                </div>

            </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            My Booked Events
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {bookings?.length > 0 ? (
                            bookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="bg-gray-50 border rounded-xl overflow-hidden hover:shadow-lg transition"
                                >
                                    <img
                                        src={booking.eventId.imageUrl}
                                        alt={booking.eventId.title}
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-4">
                                        <span className="inline-block mb-2 px-3 py-1 text-xs
                 bg-green-100 text-green-700 rounded-full">
                                            Upcoming
                                        </span>

                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {booking.eventId.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 mt-1">
                                            {formatDate(booking.eventId.date)} • {booking.eventId.location}
                                        </p>

                                        <p className="text-sm text-gray-600 mt-1">
                                            {booking.ticketsBooked} Tickets Booked
                                        </p>


                                        <button
                                            onClick={() => setSelectedTicket(booking)}
                                            className="mt-4 w-full py-2 bg-blue-600 text-white
    rounded-md hover:bg-blue-700 transition"
                                        >
                                            View Ticket
                                        </button>
                                    </div>

                                    {selectedTicket && (
                                        <TicketModal
                                            booking={selectedTicket}
                                            onClose={() => setSelectedTicket(null)}
                                        />
                                    )}

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">
                                You haven't booked any events yet.
                            </p>
                        )}

                    </div>
                </div>
            </section>


            
            <section id="about" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">

                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            About HostHub
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            HostHub is a modern event discovery and ticketing platform designed to make attending events effortless.
                            Users can explore a wide range of events, book tickets instantly, and manage their bookings all in one place.
                            With secure digital tickets and a seamless experience from discovery to entry, HostHub helps you focus on enjoying the moments that matter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-md p-8 text-center
                      hover:-translate-y-2 hover:shadow-xl transition">
                            <div className="w-14 h-14 mx-auto mb-5 rounded-xl
                        bg-blue-100 flex items-center justify-center">
                                <FiSearch className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Discover Events Easily
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Browse concerts, workshops, conferences, and more—all in one place.
                                Find events that match your interests instantly.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-8 text-center
                      hover:-translate-y-2 hover:shadow-xl transition">
                            <div className="w-14 h-14 mx-auto mb-5 rounded-xl
                        bg-green-100 flex items-center justify-center">
                                <FiCalendar className="text-green-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Book & Manage Tickets
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Book tickets in seconds, track your bookings, and access all your
                                events from one personalized dashboard.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-8 text-center
                      hover:-translate-y-2 hover:shadow-xl transition">
                            <div className="w-14 h-14 mx-auto mb-5 rounded-xl
                        bg-purple-100 flex items-center justify-center">
                                <FiUsers className="text-purple-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Seamless Event Experience
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Enjoy smooth entry with digital tickets, real-time updates,
                                and stress-free event experiences.
                            </p>
                        </div>

                    </div>
                </div>
            </section>



            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Contact Us
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        
                        <div className="bg-white border rounded-xl p-8 shadow-sm">
                            <FiMail className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                            <p className="text-gray-600">support@hosthub.com</p>
                        </div>

                        <div className="bg-white border rounded-xl p-8 shadow-sm">
                            <FiPhone className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>

                        <div className="bg-white border rounded-xl p-8 shadow-sm">
                            <FiMapPin className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                            <p className="text-gray-600">
                                HostHub HQ, Bangalore, India
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserHome;
