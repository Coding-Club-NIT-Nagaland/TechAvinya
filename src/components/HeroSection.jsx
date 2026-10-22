import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaCalendarAlt, FaTicketAlt, FaArrowRight, FaTrophy, FaRobot, FaCode, 
  FaGamepad, FaBrain, FaMapMarkerAlt 
} from "react-icons/fa";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-05T09:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(1px)",
        }}
      >
        {/* Ambient Neon Energy Flares */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Cyber Scanning Grid Lines */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, #0ff 2px, #0ff 3px)",
            backgroundSize: "100% 4px",
          }}
        ></div>

        {/* Lateral Cyber Edge Borders */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-r from-cyan-400 to-transparent opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #0ff 0, #0ff 10px, transparent 10px, transparent 20px)",
          }}
        ></div>
        <div
          className="absolute right-0 top-0 bottom-0 w-3 sm:w-6 bg-gradient-to-l from-cyan-400 to-transparent opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #0ff 0, #0ff 10px, transparent 5px, transparent 20px)",
          }}
        ></div>

        <div className="relative z-10 text-center max-w-6xl w-full px-4 pt-10 pb-16 overflow-visible">
          {/* Status Header Pill */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-950/70 backdrop-blur-md text-cyan-300 text-xs font-mono tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Annual Technical Festival
            </span>
            <span className="px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-950/60 backdrop-blur-md text-purple-300 text-xs font-mono tracking-wider uppercase hidden sm:inline-flex items-center gap-1.5">
              <FaMapMarkerAlt className="w-3 h-3 text-purple-400" />
              NIT Nagaland
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
            className="text-xs sm:text-sm md:text-lg text-cyan-100 tracking-[0.25em] sm:tracking-[0.35em] mb-8 sm:mb-10 font-light px-2 uppercase"
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: "0 0 15px rgba(0, 240, 255, 0.5)",
            }}
          >
            Where Innovation Meets Inspiration
          </p>

          {/* IIT Bombay Techfest Style Cyber Countdown Timer */}
          <div className="max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 px-2">
              {[
                { label: "DAYS", val: timeLeft.days },
                { label: "HOURS", val: timeLeft.hours },
                { label: "MINUTES", val: timeLeft.minutes },
                { label: "SECONDS", val: timeLeft.seconds }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="relative p-2.5 sm:p-4 rounded-2xl bg-black/60 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.2)] text-center group hover:border-cyan-300 transition-all"
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 tracking-wider">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-mono tracking-widest text-cyan-300/80 uppercase mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-mono text-gray-400 mt-2.5 uppercase tracking-widest">
              Counting down to 5th November 2026
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <Link
              to="/events"
              className="px-6 sm:px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-105 hover:brightness-110 transition-all flex items-center gap-2.5"
            >
              <FaTrophy className="w-4 h-4 text-cyan-100" />
              <span>Explore 12 Events</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/schedule"
              className="px-6 sm:px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-black/60 hover:bg-cyan-950/40 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:scale-105 transition-all flex items-center gap-2.5"
            >
              <FaCalendarAlt className="w-4 h-4 text-sky-400" />
              <span>Fest Schedule</span>
            </Link>

            <Link
              to="/enroll"
              className="px-6 sm:px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 hover:brightness-110 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:scale-105 transition-all flex items-center gap-2.5"
            >
              <FaTicketAlt className="w-4 h-4" />
              <span>Enroll Now</span>
            </Link>
          </div>

          {/* Techfest HUD Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-cyan-500/20">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-500/20 backdrop-blur-sm">
              <p className="text-xl sm:text-3xl font-mono font-extrabold text-cyan-400">12</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono mt-0.5">Competitions</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-sm">
              <p className="text-xl sm:text-3xl font-mono font-extrabold text-amber-400">₹2,00,000+</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono mt-0.5">Prize Pool</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-purple-500/20 backdrop-blur-sm">
              <p className="text-xl sm:text-3xl font-mono font-extrabold text-purple-400">5 Clubs</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono mt-0.5">NIT Nagaland</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
              <p className="text-xl sm:text-3xl font-mono font-extrabold text-emerald-400">5-6 Nov</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono mt-0.5">2026 Edition</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
