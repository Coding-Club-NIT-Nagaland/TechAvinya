import React from "react";
import gfg from "../assets/gfg.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/events"); 
  };
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Michroma:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(1px)",
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #0ff 2px, #0ff 3px)",
            backgroundSize: "100% 4px",
          }}
        ></div>
        <div
          className="absolute left-0 top-0 bottom-0 w-4 sm:w-6 md:w-8 bg-gradient-to-r from-cyan-400 to-transparent opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #0ff 0, #0ff 10px, transparent 10px, transparent 20px)",
          }}
        ></div>
        <div
          className="absolute right-0 top-0 bottom-0 w-4 sm:w-6 md:w-8 bg-gradient-to-l from-cyan-400 to-transparent opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #0ff 0, #0ff 10px, transparent 10px, transparent 20px)",
          }}
        ></div>
        <div className="relative z-10 text-center max-w-6xl">
          <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <img
              src={gfg}
              alt="GeeksforGeeks Logo"
              className="h-10 sm:h-12 md:h-16 object-contain"
            />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wide">
              GeeksforGeeks
            </h2>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-cyan-400 tracking-[0.4em] sm:tracking-[0.5em] mb-8 sm:mb-10 md:mb-12">
            PRESENTS
          </h2>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 tracking-wide sm:tracking-wider whitespace-normal sm:whitespace-nowrap"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px #0ff",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            TECH AVINYA 2025
          </h1>
          <p
            className="text-base sm:text-lg md:text-2xl text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] mb-12 sm:mb-16 font-light px-2"
            style={{
              fontFamily: "Michroma",
            }}
          >
            WHERE INNOVATION MEETS INSPIRATION
          </p>
          <button
          onClick={handleClick}
          className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-transparent text-cyan-400 text-base sm:text-lg md:text-xl font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black"
          style={{
            fontFamily: "monospace",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-3 justify-center">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
            LIVE NOW
          </span>
        </button>
        </div>
      </div>
    </>
  );
}
