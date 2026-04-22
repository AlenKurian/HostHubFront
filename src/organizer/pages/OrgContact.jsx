import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import OrganizerHeader from '../components/OrganizerHeader'

export default function OrgContact() {
    return (
        <div>
            <OrganizerHeader />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
                {/* Hero */}
                <section className="py-20 text-center px-6 max-w-5xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Contact HostHub
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Have questions about events, bookings, or partnerships? Our team is
                        here to help. Reach out anytime.
                    </p>
                </section>

                {/* Contact Info Cards */}
                <section className="max-w-6xl mx-auto px-6 pb-16">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <FiMail className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-1">Email</h4>
                            <p className="text-gray-600">support@hosthub.com</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <FiPhone className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-1">Phone</h4>
                            <p className="text-gray-600">+91 98765 43210</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <FiMapPin className="text-blue-600 text-3xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-1">Address</h4>
                            <p className="text-gray-600">HostHub HQ, Bangalore, India</p>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="pb-24 px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
                        <h2 className="text-2xl font-semibold text-center mb-8">
                            Send us a message
                        </h2>

                        <form className="space-y-6">
                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}