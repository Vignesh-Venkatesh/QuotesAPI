import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import GithubIcon from "../assets/Icons/github.svg";
import { Navigate } from "react-router-dom";
import paper_texture from "../assets/Images/paper-texture.jpg";

const quotes = {
  "William Shakespeare": "All that glitters is not gold.",
  "Gautama Buddha":
    "Happiness does not depend on what you have or who you are. It solely relies on what you think.",
  "J. R. R. Tolkien": "Not all those who wander are lost.",
  "Robert Frost":
    "Two roads diverged in a wood, and I, I took the one less travelled by, and that has made all the difference.",
  "Walt Disney": "The way to get started is to quit talking and begin doing.",
  "Oprah Winfrey":
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
  "Mahatma Gandhi": "You must be the change you wish to see in the world.",
};

export function Home() {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState({ author: "", text: "" });

  useEffect(() => {
    // Fetch user data from your API
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/auth/user", {
          credentials: "include", // Ensure credentials are sent with the request
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUser();

    // Select a random quote
    const authors = Object.keys(quotes);
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    setQuote({ author: randomAuthor, text: quotes[randomAuthor] });
  }, []);

  // Redirect to dashboard if user is authenticated
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="h-screen flex">
      <div className="left w-1/2 bg-slate-300 flex flex-col justify-between items-center h-screen relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-slate-300" />
        <img
          src={paper_texture}
          alt="Paper Texture"
          className="absolute inset-0 object-cover w-full h-full opacity-85"
        />
        <blockquote className="font-typewriting relative z-10 m-auto text-slate-900 text-5xl w-4/5">
          <p>{quote.text}</p>
          <p className="text-end leading-loose text-lg">- {quote.author}</p>
        </blockquote>

        <footer className="text-center text-slate-400 text-sm py-4 mb-4 relative z-10">
          <a href="https://www.freepik.com/free-photo/white-paper-texture_1033849.htm">
            Image (Paper Texture) by kues1 on Freepik
          </a>
        </footer>
      </div>

      <div className="right w-1/2 bg-gray-900 text-slate-50 flex flex-col items-center justify-between py-10 overflow-hidden">
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-josefin font-bold mb-6">QuotesAPI</h1>
          <p className="text-center text-lg mb-6 text-slate-200 font-josefin">
            Ready for a dose of daily motivation?
          </p>
          <div className="list text-center mb-6 text-slate-200 font-josefin">
            <p className="flex items-center justify-center mb-2">
              <span className="text-green-400 mr-2">&#x2714;</span> Search
              Quotes
            </p>
            <p className="flex items-center justify-center mb-2">
              <span className="text-green-400 mr-2">&#x2714;</span> Random
              Quotes
            </p>
            <p className="flex items-center justify-center mb-2">
              <span className="text-green-400 mr-2">&#x2714;</span> Author
              Lookup
            </p>
          </div>
          <p className="text-center text-lg mb-6 text-slate-200 font-josefin">
            Log in with your GitHub account to receive your API key and start
            exploring!
          </p>

          <Button
            variant="secondary"
            className="flex items-center justify-center w-[180px] mx-auto my-3 py-2 px-4 rounded-md bg-slate-50 text-gray-900 hover:bg-gray-200 transition duration-300"
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/v1/auth/github")
            }
          >
            <img src={GithubIcon} alt="GitHub icon" className="w-[20px] mr-2" />
            Login with GitHub
          </Button>
        </div>

        <footer className="text-center text-slate-400 text-sm py-4">
          Created with 🧡 by{" "}
          <a
            href="https://vigiii.com"
            className="text-slate-200 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vigiii.com
          </a>
        </footer>
      </div>
    </main>
  );
}
