import React, { useEffect, useState } from "react";
import { FiImage, FiTag, FiCalendar, FiClock, FiMapPin, FiDollarSign, FiUsers, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { addEventAPI } from "../../services/allAPIs";

function AddEvent() {

    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [userDetails, setUserDetails] = useState({})
    const [eventDetails, setEventDetails] = useState({
        title: "",
        category: "",
        date: "",
        time: "day",
        location: "",
        price: "",
        nooftickets: "",
        imageUrl: "",
        description: ""
    });

    useEffect(() => {
        const userToken = sessionStorage.getItem("token");
        const userData = JSON.parse(sessionStorage.getItem("userDetails"));

        if (!userToken || userData?.role !== "organizer") {
            navigate("/login");
        } else {
            setToken(userToken);
            setUserDetails(userData);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleAddEvent = async () => {
        console.log(eventDetails);

        const {
            title,
            category,
            date,
            time,
            location,
            price,
            nooftickets,
            imageUrl,
            description
        } = eventDetails;

        if (!title || !category || !date || !time || !location || !price || !nooftickets || !imageUrl || !description) {
            alert("Please fill all the fields");
            return;
        }

        const reqHeader = {
            Authorization: `Bearer ${token}`
        };

        const reqBody = eventDetails;

        try {
            const result = await addEventAPI(reqBody, reqHeader);
            console.log(result);

            if (result.status === 200 || result.status === 201) {
                alert("Event added successfully");
                navigate("/organizer"); 
                setEventDetails({
                    title: "",
                    category: "",
                    date: "",
                    time: "day",
                    location: "",
                    price: "",
                    nooftickets: "",
                    imageUrl: "",
                    description: ""
                });
            } else {
                alert("Server Error");
            }
        } catch (err) {
            console.log("Add Event Error:", err);
            alert(err.response?.data || "Failed to add event");
        }
    };


    return (
        <section className="py-15 bg-gray-50 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-3xl rounded-xl p-10 shadow-lg">

                <h1 className="text-3xl text-center font-bold text-gray-900 mb-4">Add New Event</h1>
                {/* <p className="text-gray-600 mb-8">Fill out the details below to add your event.</p> */}

                <form className="space-y-6">
                    <div>
                        <label className="block font-medium mb-1">Event Title</label>
                        <div className="relative">
                            <FiTag className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="title"
                                placeholder="title"
                                className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                value={eventDetails.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Category</label>
                        <select
                            className="w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500"
                            name="category"
                            value={eventDetails.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select category</option>
                            <option>Music</option>
                            <option>Business</option>
                            <option>Art</option>
                            <option>Sports</option>
                            <option>Education</option>
                            <option>Nightlife</option>
                            <option>Tech</option>
                            <option>Food</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium mb-1">Date</label>
                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    name="date"
                                    className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                    value={eventDetails.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Event Time</label>
                            <div className="relative">
                                <FiClock className="absolute left-3 top-3 text-gray-400" />
                                <select
                                    className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                    name="time"
                                    value={eventDetails.time}
                                    onChange={handleChange}
                                >
                                    <option value="day">Day</option>
                                    <option value="night">Night</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Location</label>
                        <div className="relative">
                            <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                placeholder="location"
                                className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                value={eventDetails.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium mb-1">Price</label>
                            <div className="relative">
                                <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    placeholder="Enter price (0 for free)"
                                    className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                    value={eventDetails.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Estimated Attendees</label>
                            <div className="relative">
                                <FiUsers className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="number"
                                    name="nooftickets"
                                    min="0"
                                    placeholder="no of tickets"
                                    className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                    value={eventDetails.nooftickets}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Image URL</label>
                        <div className="relative">
                            <FiImage className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="imageUrl"
                                placeholder="https://example.com/event.jpg"
                                className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                value={eventDetails.imageUrl}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Event Description</label>
                        <div className="relative">
                            <FiFileText className="absolute left-3 top-3 text-gray-400" />
                            <textarea
                                name="description"
                                placeholder="Describe your event..."
                                rows="3"
                                className="w-full border rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500"
                                value={eventDetails.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
                        onClick={handleAddEvent}
                    >
                        Add Event
                    </button>

                </form>
            </div>
        </section>
    );
};

export default AddEvent;
