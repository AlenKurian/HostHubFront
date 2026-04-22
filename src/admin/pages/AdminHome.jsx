import React, { useEffect, useState } from "react";
import {
    FiUsers,
    FiUserCheck,
    FiCalendar,
    FiTrendingUp,
    FiDollarSign,
    FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAdminDashboardAPI } from "../../services/allAPIs";


const AdminHome = () => {

    const [dashboard, setDashboard] = useState(null);

    const stats = [
        {
            label: "Total Users",
            value: dashboard?.totalUsers || 0,
            icon: FiUsers,
            gradient: ["#2563EB", "#1E40AF"], // blue
        },
        {
            label: "Organizers",
            value: dashboard?.organizers || 0,
            icon: FiUserCheck,
            gradient: ["#16A34A", "#166534"], // green
        },
        {
            label: "Events Hosted",
            value: dashboard?.events || 0,
            icon: FiCalendar,
            gradient: ["#7C3AED", "#5B21B6"], // purple
        },
        {
            label: "Tickets Sold",
            value: dashboard?.ticketsSold || 0,
            icon: FiTrendingUp,
            gradient: ["#F59E0B", "#B45309"], // amber
        },
        {
            label: "Revenue",
            value: `${dashboard?.revenue || 0}`,
            icon: FiDollarSign,
            gradient: ["#DC2626", "#991B1B"], // red
        },
    ];

    const recentEvents = [
        { id: 1, title: "Tech Expo 2025", date: "Dec 10, 2025", attendees: 5400 },
        { id: 2, title: "Winter Music Fest", date: "Dec 12, 2025", attendees: 12000 },
        { id: 3, title: "Startup Connect", date: "Dec 13, 2025", attendees: 800 },
    ];

    const recentTickets = [
        { id: 1, event: "Tech Expo 2025", buyer: "John Doe", quantity: 2, price: "$150" },
        { id: 2, event: "Winter Music Fest", buyer: "Sarah Lee", quantity: 4, price: "$240" },
        { id: 3, event: "Startup Connect", buyer: "Mark Smith", quantity: 1, price: "$30" },
    ];

    const organizers = [
        { name: "Eventify Productions", events: 42, revenue: "$120k" },
        { name: "BrightStage", events: 18, revenue: "$98k" },
        { name: "TechMasters", events: 33, revenue: "$52k" },
    ];

    const users = [
        { name: "Emily Johnson", tickets: 12 },
        { name: "Daniel Brown", tickets: 8 },
        { name: "Olivia Garcia", tickets: 5 },
    ];

    const navigate = useNavigate();


    useEffect(() => {
        const token = sessionStorage.getItem("token");

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        getAdminDashboardAPI(reqHeader)
            .then((res) => {
                console.log('Dashboard data: ', res.data)
                setDashboard(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);



    return (
        <section className="py-2 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-3xl p-6 text-white shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, ${stat.gradient[0]}, ${stat.gradient[1]})`,
                            }}
                        >
                            {/* ICON + LABEL */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/20
                        flex items-center justify-center">
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-2xl font-bold tracking-wide">
                                    {stat.label}
                                </p>
                            </div>

                            {/* VALUE */}
                            <p className="text-4xl font-extrabold tracking-tight">
                                {stat.value.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-blue-200 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Recent Events
                            </h2>
                        </div>

                        <div className="space-y-5">
                            {dashboard?.recentEvents?.map((event) => (
                                <div key={event._id} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-lg">
                                        {event.title.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(event.date).toDateString()}
                                        </p>
                                    </div>

                                    <p className="text-sm font-semibold text-blue-700">
                                        {event.nooftickets} Tickets
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>


                    <div className="bg-green-200 p-6 rounded-2xl shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Recent Ticket Sales
                            </h2>

                        </div>

                        <div className="space-y-5">
                            {dashboard?.recentTickets?.map((ticket) => (
                                <div key={ticket._id} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-lg">
                                        {ticket.userId?.username || "Unknown User"
.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-semibold">{ticket.eventId.title}</p>
                                        <p className="text-sm text-gray-500">
                                            Buyer: {ticket.userId?.username || ticket.userMail || "Unknown User"
}
                                        </p>
                                    </div>

                                    <p className="text-sm font-semibold text-green-700">
                                        ₹{ticket.totalAmount}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="bg-purple-200 p-6 rounded-xl shadow">
                        <h2 className="text-xl font-bold mb-4">System Activity</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <FiActivity className="text-blue-600 mt-1" />
                                New organizer registration pending approval.
                            </li>
                            <li className="flex items-start gap-2">
                                <FiActivity className="text-blue-600 mt-1" />
                                240 new tickets sold today.
                            </li>
                            <li className="flex items-start gap-2">
                                <FiActivity className="text-blue-600 mt-1" />
                                4 new events created this week.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-amber-200 p-6 rounded-2xl shadow-md mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Top Organizers
                        </h2>

                        <span className="text-sm text-gray-500">
                            Ranked by revenue
                        </span>
                    </div>

                    <div className="space-y-4">
                        {organizers.map((org, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-5 p-4 rounded-xl
                   bg-gray-50 border border-gray-200"
                            >
                                {/* Rank Badge */}
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center
          font-bold text-white
          ${index === 0
                                            ? "bg-yellow-500"
                                            : index === 1
                                                ? "bg-gray-400"
                                                : index === 2
                                                    ? "bg-amber-700"
                                                    : "bg-blue-600"}`}
                                >
                                    #{index + 1}
                                </div>

                                {/* Organizer Info */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {org.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {org.events} events hosted
                                    </p>
                                </div>

                                {/* Revenue */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-700">
                                        {org.revenue}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Total revenue
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-red-200 p-6 rounded-2xl shadow-md mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Active Users
                        </h2>

                        <span className="text-sm text-gray-500">
                            Based on ticket activity
                        </span>
                    </div>

                    <div className="space-y-4">
                        {users.map((usr, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-5 p-4 rounded-xl
                   bg-gray-50 border border-gray-200"
                            >
                                {/* Avatar */}
                                <div
                                    className="w-11 h-11 rounded-full bg-gradient-to-br
                     from-blue-500 to-indigo-600
                     flex items-center justify-center
                     text-white font-semibold text-lg"
                                >
                                    {usr.name.charAt(0)}
                                </div>

                                {/* User Info */}
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {usr.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Active attendee
                                    </p>
                                </div>

                                {/* Tickets */}
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-700">
                                        {usr.tickets}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tickets bought
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default AdminHome;
