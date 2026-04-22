import React from 'react'
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SplashCursor from '../components/SplashCursor';
import UserSection from './UserSection';
import OrganizerSection from './OrganizerSection';


function Home() {
    return (
        <div>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-2">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://i.pinimg.com/1200x/16/83/93/168393fd147525abdadc01429a999288.jpg')` }}
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                </div>

                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-blue-500/20 animate-pulse-glow" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-purple-400/15 animate-pulse-glow"
                    style={{ animationDelay: "1.5s" }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto text-center">
                        <h1 className='text-7xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-tight text-white'>Host
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Hub
                            </span></h1>
                        <h1
                            className="text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold mb-9 leading-tight text-white animate-fade-in"
                            style={{ animationDelay: "0.1s" }}
                        >
                            For People Who Attend{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Events
                            </span>
                            <br />
                            <span className="text-white/95">And Those Who Bring Them to Life</span>
                        </h1>

                        <p
                            className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto mb-10 animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            “Find unforgettable experiences that bring people together, or design your own from the ground up.
                            HostHub gives organizers the power to create, and attendees the freedom to explore.
                            One platform, two journeys, endless possibilities.”
                        </p>

                        <div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
                            style={{ animationDelay: "0.3s" }}
                        >
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-transform transform-gpu hover:-translate-y-0.5"
                            >
                                Get Started
                                <FiArrowRight className="w-5 h-5" />
                            </Link>

                        </div>

                        <SplashCursor />

                        <div
                            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 animate-fade-in"
                            style={{ animationDelay: "0.4s" }}
                        >
                            {[
                                { value: "50K+", label: "Events Hosted" },
                                { value: "2M+", label: "Tickets Sold" },
                                { value: "99.9%", label: "Uptime" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <UserSection />
            <OrganizerSection />
        </div>
    );
};

export default Home
