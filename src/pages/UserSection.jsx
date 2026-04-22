import {
    FiSearch,
    FiCreditCard,
    FiSmile,
    FiCheckCircle,
} from "react-icons/fi";

const userFeatures = [
    {
        icon: FiSearch,
        title: "Discover Events",
        description:
            "Explore concerts, conferences, workshops, and more—filtered by your interests, location, and date.",
    },
    {
        icon: FiCreditCard,
        title: "Book Tickets Easily",
        description:
            "Secure tickets in seconds with transparent pricing and instant confirmation.",
    },
    {
        icon: FiCheckCircle,
        title: "QR-Based Entry",
        description:
            "Skip long queues with digital QR passes—just scan and enter.",
    },
    {
        icon: FiSmile,
        title: "Enjoy the Experience",
        description:
            "Focus on enjoying the moment while HostHub handles the rest.",
    },
];

const UserSection = () => {
    return (
        <section className="py-24 bg-[#0b0f1a] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-indigo-500/10 blur-[160px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-indigo-300 text-sm font-medium mb-4">
                        For Attendees
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Built for People Who Love Events
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        HostHub makes discovering, booking, and attending events effortless
                        from start to finish.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {userFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-xl border border-white/10
                         rounded-3xl p-8 text-center
                         hover:border-indigo-500/40 hover:-translate-y-2
                         transition-all duration-300"
                        >
                            <div
                                className="w-16 h-16 mx-auto mb-6 rounded-2xl
                           bg-gradient-to-br from-indigo-500/20 to-purple-500/20
                           flex items-center justify-center border border-white/10"
                            >
                                <feature.icon className="w-7 h-7 text-indigo-400" />
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

export default UserSection;
