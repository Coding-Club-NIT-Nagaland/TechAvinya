import React from "react";

export default function HeroSection() {
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Cinzel:wght@600&display=swap" 
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
        <div className="relative z-10 text-center max-w-6xl w-full px-4 overflow-visible">
          <div className="mb-4 sm:mb-6 flex items-center justify-center">
            <span className="px-5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/60 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.35)]">
              Coming Soon
            </span>
          </div>

          {/* Crisp, Crystal-Clear Tech Avinya 2026 in Original Kaushan Script */}
          <h1
            className="mb-4 sm:mb-6 text-center select-none py-2 px-2 leading-tight"
            style={{
              fontFamily: "'Kaushan Script', cursive",
              fontWeight: 400,
            }}
          >
            <span
              className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] tracking-wide inline-block"
              style={{
                textShadow:
                  "0 0 25px rgba(0, 240, 255, 0.85), 0 0 50px rgba(0, 240, 255, 0.45), 0 4px 8px rgba(0, 0, 0, 0.95)",
              }}
            >
              Tech Avinya
            </span>{' '}
            <span
              className="text-cyan-300 text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] tracking-normal inline-block ml-1 sm:ml-3"
              style={{
                textShadow:
                  "0 0 30px rgba(0, 240, 255, 0.95), 0 0 60px rgba(0, 240, 255, 0.55), 0 4px 8px rgba(0, 0, 0, 0.95)",
              }}
            >
              2026
            </span>
          </h1>

          <p
            className="text-xs sm:text-sm md:text-lg text-cyan-100 tracking-[0.25em] sm:tracking-[0.35em] mb-10 sm:mb-14 font-light px-2 uppercase"
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: "0 0 15px rgba(0, 240, 255, 0.5)",
            }}
          >
            Where Innovation Meets Inspiration
          </p>
        </div>
      </div>
    </>
  );
}
