import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { APIKey } from "@/components/APIKey";
import { Navbar } from "@/components/Navbar";

const server_link = "http://localhost:3000";

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    // Function to fetch user data from the server
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server_link}/api/v1/auth/user`, {
          credentials: "include", // Ensure cookies are sent with the request
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null); // Set user to null if response is not ok
        }
      } catch (error) {
        setUser(null); // Set user to null in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${server_link}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });
      if (response.ok) {
        setLoggedOut(true);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    // Show a loading message while fetching user data
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user || loggedOut) {
    // Redirect to the home page if user is not authenticated or if logged out
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard bg-slate-950 h-screen text-slate-50">
      <Navbar user={user._json} handleLogout={handleLogout} />

      <div className="dashboard-content flex">
        <div className="left w-1/2"></div>
        <div className="right w-1/2 flex justify-end pr-3">
          <APIKey user={user} />
        </div>
      </div>
    </div>
  );
}
