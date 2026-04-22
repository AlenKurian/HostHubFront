import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiSearch,
    FiCalendar,
    FiMapPin,
    FiUsers,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiDollarSign,
} from "react-icons/fi";
import OrganizerHeader from '../components/OrganizerHeader'
import EditEventModal from '../components/EditEventModal'
import { getAllEventsAPI, orgDeleteEventAPI,} from "../../services/allAPIs";


const OrganizerDashboard = () => {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [timeFilter, setTimeFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [maxPrice, setMaxPrice] = useState(300);
    const [editEvent, setEditEvent] = useState(null);
    const [formData, setFormData] = useState({});


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = sessionStorage.getItem("token");

                const reqHeader = {
                    Authorization: `Bearer ${token}`,
                };

                const res = await getAllEventsAPI(reqHeader);
                setEvents(res.data);
            } catch (err) {
                console.error("Failed to fetch events", err);
            }
        };
        fetchEvents();
    }, []);

    const user = JSON.parse(sessionStorage.getItem("userDetails"));
    const organizerId = user?._id;

    const myEvents = events.filter(
        event => event.organizerId?.toString() === organizerId?.toString()
    );

    const otherEvents = events.filter(
        event => event.organizerId?.toString() !== organizerId?.toString()
    );


    const allEvents = events;

    const filteredEvents = allEvents.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        const matchesTime = timeFilter === "all" ? true : event.time === timeFilter;
        const matchesPrice =
            priceFilter === "all"
                ? true
                : priceFilter === "free"
                    ? event.price === 0
                    : event.price > 0;
        const matchesAmount = event.price <= maxPrice;

        return matchesSearch && matchesTime && matchesPrice && matchesAmount;
    });


    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            await orgDeleteEventAPI(id, reqHeader);

            setEvents((prev) => prev.filter((e) => e._id !== id));
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    useEffect(() => {
        console.log("Logged-in organizer:", JSON.parse(sessionStorage.getItem("userDetails")));
        console.log("All events from DB:", events);
    }, [events]);

    


    return (

        <div>
            <OrganizerHeader />

            <section
                className="relative h-[40vh] flex items-center mt-6"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 w-full">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Manage Your Events Like a Pro
                        </h1>

                        <p className="text-lg text-gray-200 max-w-4xl mx-auto mb-8">
                            Create, edit, and track your events effortlessly while exploring what's
                            happening across HostHub.
                        </p>

                    </div>
                </div>
            </section>


            <section className="py-20 bg-gray-100">
                <div className="container mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg p-8">


                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
                                <p className="text-gray-600 mt-1">
                                    Manage your events and explore others happening on the platform.
                                </p>
                            </div>

                            <Link
                                to="/organizer/add-event"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                            >
                                <FiPlus className="w-5 h-5" />
                                Add Event
                            </Link>
                        </div>

                        {/* <div className="grid gap-6 md:grid-cols-4 mb-12">
                            <div className="md:col-span-2 relative">
                                <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                        </div> */}


                        <h2 className="text-2xl font-bold mb-4">Your Events</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {myEvents.length > 0 ? (
                                myEvents.map((event) => (
                                    <EventCard key={event._id} event={event} editable
                                    onEdit={() => {setEditEvent(event);setFormData(event)}}
                                    handleDelete={ handleDelete } />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    You haven't created any events yet.
                                </p>
                            )}
                        </div>


                        <h2 className="text-2xl font-bold mb-4 mt-10">Other Events</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {otherEvents.length > 0 ? (
                                otherEvents.map((event) => (
                                    <EventCard key={event._id} event={event} editable={false} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    No other events available.
                                </p>
                            )}
                        </div>

                        <EditEventModal
                            event={editEvent}
                            onClose={() => setEditEvent(null)}
                            refresh={(updatedEvent) => {
                                setEvents(prev =>
                                    prev.map(e => e._id === updatedEvent._id ? updatedEvent : e)
                                );
                            }}
                        />

                    </div>
                </div>
            </section>
        </div>
    );
};

const EventCard = ({ event, editable, onEdit, handleDelete }) => (
    
    <div
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

            <span className="absolute top-3 right-3 px-3 py-1 text-xs
                       bg-white/90 text-gray-900 rounded-full font-semibold">
                {event.price === 0 ? "Free" : `$${event.price}`}
            </span>

            <span
                className={`absolute bottom-3 right-3 px-3 py-1 text-xs rounded-full
  ${event.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : event.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
            >
                {event.status}
            </span>


            <div className="absolute inset-0 bg-black/0
                      group-hover:bg-black/10 transition" />
        </div>

        <div className="p-5">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
                {event.title}
            </h3>

            <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                    <FiCalendar className="text-blue-600" /> {(event.date)}
                </p>
                <p className="flex items-center gap-2">
                    <FiMapPin className="text-blue-600" /> {event.location}
                </p>
                <p className="flex items-center gap-2">
                    <FiUsers className="text-blue-600" />{" "}
                    {event.nooftickets.toLocaleString()} Tickets
                </p>
            </div>

            {editable && (
                <div className="flex items-center justify-between gap-3 mt-5">
                    <button
                        onClick={ onEdit }
                        className="flex items-center gap-2 px-4 py-2
                       border border-blue-600 text-blue-700
                       rounded-md hover:bg-blue-600
                       hover:text-white transition"
                    >
                        <FiEdit /> Edit
                    </button>

                    <button
                        onClick={() => handleDelete(event._id)}
                        className="flex items-center gap-2 px-4 py-2
                       border border-red-500 text-red-600
                       rounded-md hover:bg-red-600
                       hover:text-white transition"
                    >
                        <FiTrash2 /> Delete
                    </button>
                </div>
            )}
        </div>
    </div>
    
);


export default OrganizerDashboard;
