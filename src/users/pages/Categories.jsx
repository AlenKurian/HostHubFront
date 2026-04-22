// src/user/components/Categories.jsx
import React from "react";
import {
    FiMusic,
    FiBriefcase,
    FiImage,
    FiActivity,
    FiBookOpen,
    FiStar,
    FiFilm,
    FiCoffee,
} from "react-icons/fi";

const categories = [
    {
        name: "Music",
        icon: FiMusic,
        count: 1240,
        color: "from-purple-600 to-pink-500",
    },
    {
        name: "Business",
        icon: FiBriefcase,
        count: 856,
        color: "from-blue-600 to-indigo-500",
    },
    {
        name: "Art",
        icon: FiImage,
        count: 432,
        color: "from-amber-500 to-yellow-400",
    },
    {
        name: "Sports",
        icon: FiActivity,
        count: 678,
        color: "from-green-500 to-teal-400",
    },
    {
        name: "Education",
        icon: FiBookOpen,
        count: 543,
        color: "from-violet-600 to-purple-500",
    },
    {
        name: "Nightlife",
        icon: FiStar,
        count: 921,
        color: "from-pink-500 to-rose-500",
    },
    {
        name: "Film",
        icon: FiFilm,
        count: 234,
        color: "from-blue-500 to-indigo-600",
    },
    {
        name: "Food",
        icon: FiCoffee,
        count: 567,
        color: "from-orange-500 to-yellow-500",
    },
];

const Categories = () => {
    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Explore by Category
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Find events that match your interests. Whatever you're into, we've
                        got something just for you.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                            className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer bg-white border border-gray-200 hover:border-blue-400 transition-all hover:shadow-lg animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                            />

                            <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-blue-400 transition-colors" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                                >
                                    <category.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {category.count} events
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
