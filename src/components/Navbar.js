import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";
import Image from "next/image";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  // Check if localStorage is available before accessing
  let isLoggedIn = false;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("token");
  }

  // Function to handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  // Fetch user profile
  const getuserProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual token
      const response = await axios.get(
        "http://localhost:5001/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfilePic(response.data); // Directly set the profile URL
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getuserProfile();
    }
  }, [isLoggedIn]);

  console.log(profilePic, "bbbbbbbbbbbbbbbbbbbbbb");

  return (
    <>
      {/* Header */}
      <div className="bg-blue-500 flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded p-2">
            <MdEventNote />
          </div>
        </div>
        <div className="flex space-x-4">
          <h3 className="text-white mt-2">{profilePic.name}</h3>
          <button className="text-white" onClick={() => setSidebarOpen(true)}>
            <Image
              src={profilePic.profile}
              alt="Profile"
              width={40}
              height={40}
              // Hide image if it fails to load
            />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-blue-300 bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Right Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col items-center p-6`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Menu</h2>
        {profilePic && (
          <img
            src={profilePic.profile}
            alt="Profile"
            className="rounded-full border-2 border-gray-300"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <h3>
          <b>{profilePic.name}</b>
        </h3>
        <h3>{profilePic.email}</h3>
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
