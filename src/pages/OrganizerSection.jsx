import {
    FiPlusCircle,
    FiEdit,
    FiUsers,
    FiBarChart2,
} from "react-icons/fi";

const organizerFeatures = [
    {
        icon: FiPlusCircle,
        title: "Create Events",
        description:
            "Publish events with full control over details, pricing, and availability.",
    },
    {
        icon: FiEdit,
        title: "Edit & Manage",
        description:
            "Update event information, manage ticket sales, and control visibility anytime.",
    },
    {
        icon: FiUsers,
        title: "Manage Attendees",
        description:
            "Track registrations, guest lists, and real-time check-ins.",
    },
    {
        icon: FiBarChart2,
        title: "Performance Insights",
        description:
            "Analyze ticket sales, attendance, and engagement with live analytics.",
    },
];

const OrganizerSection = () => {
    return (
        <section className="py-24 bg-[#0e1324] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-purple-500/10 blur-[160px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-purple-300 text-sm font-medium mb-4">
                        For Organizers
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Powerful Tools for Event Creators
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Whether it's a small meetup or a large festival, HostHub gives you
                        everything you need to host confidently.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {organizerFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl border border-white/10
                         rounded-3xl p-8 text-center
                         hover:border-purple-500/40 hover:-translate-y-2
                         transition-all duration-300"
                        >
                            <div
                                className="w-16 h-16 mx-auto mb-6 rounded-2xl
                           bg-gradient-to-br from-purple-500/20 to-indigo-500/20
                           flex items-center justify-center border border-white/10"
                            >
                                <feature.icon className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrganizerSection;
