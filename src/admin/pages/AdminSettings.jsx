import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    role: "",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Load admin details from session/local storage
  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

    if (userDetails) {
      setAdmin({
        email: userDetails.userMail || "",
        role: userDetails.role || "admin",
        password: "",
      });
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Update admin details
  const handleUpdate = async () => {
    try {
      // TODO → call update admin API here
      console.log("Updated Admin:", admin);

      alert("Admin details updated successfully");
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  // Sign out
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-17">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[520px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Settings
        </h2>

        {/* EMAIL */}
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={admin.email}
          disabled={!editMode}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-4"
        />

        {/* PASSWORD */}
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          disabled={!editMode}
          value={admin.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-4"
        />

        {/* ROLE */}
        <label className="block mb-1 font-medium">Role</label>
        <input
          value={admin.role}
          disabled
          className="w-full border rounded-lg p-2 mb-6 bg-gray-100"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Details
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Update
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>

        </div>

      </div>
    </div>
  );
}

export default AdminSettings;
