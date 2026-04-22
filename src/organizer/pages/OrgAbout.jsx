import React from "react";
import { FiEdit, FiPlusCircle, FiBarChart2 } from "react-icons/fi";
import OrganizerHeader from '../components/OrganizerHeader'

export default function About() {
    return (
        <div>
            <OrganizerHeader />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
                {/* Hero Section */}
                <section className="py-24 px-6 text-center max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        HostHub for Event Organizers
                    </h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        HostHub empowers organizers to create, manage, and promote events with
                        ease. From publishing events to tracking bookings, our platform
                        provides everything you need to deliver successful experiences.
                    </p>
                </section>

                {/* Features */}
                <section className="max-w-6xl mx-auto px-6 pb-20">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Add Events */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-blue-100 flex items-center justify-center">
                                <FiPlusCircle className="text-blue-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Create Events Easily
                            </h3>
                            <p className="text-gray-600">
                                Add event details, upload images, set ticket prices, and publish
                                events quickly through a simple organizer dashboard.
                            </p>
                        </div>

                        {/* Edit Events */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-green-100 flex items-center justify-center">
                                <FiEdit className="text-green-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Manage & Update Events
                            </h3>
                            <p className="text-gray-600">
                                Edit schedules, update ticket availability, and keep attendees
                                informed with real-time event updates.
                            </p>
                        </div>

                        {/* Analytics */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-3 transition duration-300">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-purple-100 flex items-center justify-center">
                                <FiBarChart2 className="text-purple-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Track Performance
                            </h3>
                            <p className="text-gray-600">
                                Monitor bookings, attendee engagement, and event performance to
                                make smarter planning decisions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gray-900 text-white py-20 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Start Hosting Events Today
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                        Join HostHub and simplify event creation, promotion, and management —
                        all from one powerful platform designed for organizers.
                    </p>
                    {/* <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition">
                        Get Started
                    </button> */}
                </section>
            </div>
       </div>
    );
}