import React from "react";
//import gfg from "../assets/gfg.png";
import { useNavigate } from "react-router-dom";


          // <---comments on line 2, 60 and 69---> 


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
      <link rel="preconnect" href="https://fonts.googleapis.com"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin
      />
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Michroma&family=Rajdhani:wght@600;700&display=swap" 
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
              "repeating-linear-gradient(-45deg, #0ff 0, #0ff 10px, transparent 5px, transparent 20px)",
          }}
        ></div>
        <div className="relative z-10 text-center max-w-6xl">
          <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* <img
              src={gfg}
              alt="GeeksforGeeks Logo"
              className="h-10 sm:h-12 md:h-16 object-contain"
            /> */}
           {/* <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wide">
              coming soon
           </h2> */}
          </div>
          {/* <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-cyan-400 tracking-[0.4em] sm:tracking-[0.5em] mb-8 sm:mb-10 md:mb-12">
            PRESENTS
          </h2> */}
         <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] py-3 px-2 tracking-wide sm:tracking-wider inline-block leading-tight select-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Tech Avinya <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">2026</span>
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-cyan-200/90 tracking-[0.2em] sm:tracking-[0.3em] mb-12 sm:mb-16 font-light px-2"
            style={{
              fontFamily: "'Michroma', sans-serif",
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
