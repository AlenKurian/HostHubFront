import React from "react";
import { FiSearch, FiCalendar, FiUsers } from "react-icons/fi";
import UserHeader from "../components/UserHeader";

export default function About() {
    return (
        <div>
            <UserHeader />
             <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Hero Section */}
            <section className="py-24 px-6 text-center max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    About HostHub
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                    HostHub is a modern event discovery and ticketing platform designed to
                    make attending events effortless. Discover events, book tickets
                    instantly, and manage your experiences seamlessly — all in one place.
                </p>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                        <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-blue-100 flex items-center justify-center">
                            <FiSearch className="text-blue-600 text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Discover Events Easily
                        </h3>
                        <p className="text-gray-600">
                            Browse concerts, workshops, conferences, and more — all in one
                            place. Find events that match your interests instantly.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                        <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-green-100 flex items-center justify-center">
                            <FiCalendar className="text-green-600 text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Book & Manage Tickets
                        </h3>
                        <p className="text-gray-600">
                            Book tickets in seconds, track bookings, and access all your
                            upcoming events from one personalized dashboard.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                        <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-purple-100 flex items-center justify-center">
                            <FiUsers className="text-purple-600 text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                            Seamless Event Experience
                        </h3>
                        <p className="text-gray-600">
                            Enjoy smooth entry with digital tickets, real-time updates, and
                            stress-free event experiences from start to finish.
                        </p>
                    </div>
                </div>
            </section>

            {/* Extra Info Section */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Why Choose HostHub?
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Whether you're attending concerts, conferences, workshops, or social
                        events, HostHub simplifies the entire experience. With secure
                        bookings, instant confirmations, and user-friendly navigation, we
                        help you focus on what truly matters — enjoying the event.
                    </p>
                </div>
            </section>
        </div>
       </div>
    );
}