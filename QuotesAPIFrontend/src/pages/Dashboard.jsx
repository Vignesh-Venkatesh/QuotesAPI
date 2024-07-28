import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { APIKey } from "@/components/APIKey";
import { Navbar } from "@/components/Navbar";
import { CodeExampleBox } from "@/components/CodeExampleBox";
import { Welcome } from "@/components/Welcome";
import { EndpointStats } from "@/components/EndpointStats";
import { Footer } from "@/components/Footer";

const server_link = "http://localhost:3000";

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("/api/v1/quotes/");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${server_link}/api/v1/auth/user`, {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${server_link}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user || loggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard bg-slate-950 min-h-screen flex flex-col text-slate-50 ">
      <Navbar user={user._json} handleLogout={handleLogout} />

      <div className="dashboard-content flex flex-1 overflow-y-auto items-center">
        <div className="left flex flex-col flex-1 pr-3 pl-3">
          <Welcome user={user._json.name} />
          <div className="flex-1">
            <EndpointStats
              setApiEndpoint={setApiEndpoint}
              user={user._json.login}
            />
          </div>
        </div>
        <div className="right w-[430px] flex flex-col items-end pl-3 pr-3 ">
          <APIKey user={user} setApiKey={setApiKey} apiKey={apiKey} />
          <CodeExampleBox apiKey={apiKey} apiEndpoint={apiEndpoint} />
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}
