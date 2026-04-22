import React, { useEffect, useState } from "react";
import {
    FiSearch,
    FiCalendar,
    FiMapPin,
    FiUsers,
    FiArrowRight,
    FiDollarSign,
    FiFilter,
} from "react-icons/fi";
import UserHeader from "../components/UserHeader";
import EventDetails from "../components/EventDetails";
import { getApprovedEventsAPI } from "../../services/allAPIs";
import BookTicketModal from "../components/BookTicketModal";


const UserDashboard = () => {
    const [token, setToken] = useState("");
    const [events, setEvents] = useState([])
    const [search, setSearch] = useState("");
    const [timeFilter, setTimeFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [maxPrice, setMaxPrice] = useState(300);
    const [openFilters, setOpenFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [detailsEvent, setDetailsEvent] = useState(null);
    const [bookingEvent, setBookingEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await getApprovedEventsAPI();
            setEvents(response.data)
        }
        catch (err) {
            console.log("Event fetch error", err);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());

        const matchesTime = timeFilter === "all" ? true : event.time === timeFilter;

        const matchesPrice = priceFilter === "all" ? true : priceFilter === "free" ? event.price === 0 : event.price > 0;

        const matchesAmount = event.price <= maxPrice;

        const matchesCategory =
            selectedCategories.length === 0
                ? true
                : selectedCategories.includes(event.category);

        return matchesSearch && matchesTime && matchesPrice && matchesAmount && matchesCategory;
    });

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

            <section>
                {/* <div className="absolute inset-0 bg-black/60" /> */}

                <div className="relative z-10 w-full">
                    <div className="container mx-auto px-4 text-center">

                        <div className="max-w-4xl mx-auto py-10">
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search events, locations, or categories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl
                       text-gray-900 shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-100">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/4 sticky top-24 h-fit">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

                                <button
                                    onClick={() => setOpenFilters(!openFilters)}
                                    className="w-full flex items-center justify-between px-5 py-4
                 text-gray-900 font-semibold text-lg
                 hover:bg-gray-50 transition"
                                >
                                    <div className="flex items-center gap-2">
                                        <FiFilter className="text-blue-600" />
                                        Filters
                                    </div>
                                    <span
                                        className={`transform transition ${openFilters ? "rotate-180" : ""}`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {openFilters && (
                                    <div className="px-5 pb-5 pt-2 animate-fade-in">

                                        <div className="mb-6">
                                            <p className="text-sm font-medium text-gray-700 mb-3">Event Time</p>
                                            <div className="flex gap-2">
                                                {["all", "day", "night"].map((t) => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setTimeFilter(t)}
                                                        className={`flex-1 py-2 rounded-full border text-sm transition
                  ${timeFilter === t
                                                                ? "bg-blue-600 text-white border-blue-600"
                                                                : "border-gray-300 text-gray-600 hover:bg-blue-50"
                                                            }`}
                                                    >
                                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <p className="text-sm font-medium text-gray-700 mb-3">Price</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {["free", "paid"].map((p) => (
                                                    <button
                                                        key={p}
                                                        onClick={() => setPriceFilter(p)}
                                                        className={`py-2 rounded-lg border text-sm transition
                  ${priceFilter === p
                                                                ? "bg-green-600 text-white border-green-600"
                                                                : "border-gray-300 text-gray-600 hover:bg-green-50"
                                                            }`}
                                                    >
                                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <p className="text-sm font-medium text-gray-700 mb-3">Categories</p>

                                            {["Music", "Tech", "Business", "Art", "Networking"].map((cat) => (
                                                <label
                                                    key={cat}
                                                    className="flex items-center gap-2 text-sm text-gray-700 mb-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat)}
                                                        onChange={() =>
                                                            setSelectedCategories((prev) =>
                                                                prev.includes(cat)
                                                                    ? prev.filter((c) => c !== cat)
                                                                    : [...prev, cat]
                                                            )
                                                        }
                                                        className="rounded text-blue-600 focus:ring-blue-500"
                                                    />
                                                    {cat}
                                                </label>
                                            ))}
                                        </div>

                                        <div className="flex gap-3 pt-4 border-t">
                                            <button
                                                onClick={() => {
                                                    setTimeFilter("all");
                                                    setPriceFilter("all");
                                                    setSelectedCategories([]);
                                                }}
                                                className="flex-1 py-2 rounded-lg text-sm
                       bg-gray-100 text-gray-700
                       hover:bg-gray-200 transition"
                                            >
                                                Clear
                                            </button>

                                            <button
                                                onClick={() => setOpenFilters(false)}
                                                className="flex-1 py-2 rounded-lg text-sm
                       bg-blue-600 text-white
                       hover:bg-blue-700 transition"
                                            >
                                                Apply Filters
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-3/4 bg-white rounded-2xl shadow-md p-6">



                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEvents.length ? (
                                    filteredEvents.map((event) => (
                                        <div
                                            key={event._id}
                                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
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
                                                    <button onClick={() => setDetailsEvent(event)}
                                                        className="text-center px-4 py-2 border border-blue-600 text-blue-700 rounded-md hover:bg-blue-600 hover:text-white transition" >
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
                                    <p className="text-center text-gray-600 col-span-full py-10">
                                        No events found.
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


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
