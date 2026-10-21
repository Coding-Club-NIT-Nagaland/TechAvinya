import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScheduleClean() {
  const [mounted, setMounted] = useState(false);
  const showSchedule = false;
  const scheduleData = [
    {
      day: "Day 1",
      date: "5th November 2026",
      events: [
        { time: "9:00am - 11:00am", activity: "Code Raze", location: "Smart Lab, NITN" },
        { time: "10:00am - 3:00pm", activity: "BGMI Tournament", location: "2A and 2B, NITN" },
        { time: "11:00am - 2:00pm", activity: "Quants Challenge", location: "VCH, NITN" },
        { time: "2:00pm - 6:00pm", activity: "Genesis 3D", location: "VCH, NITN" },
        { time: "2:30pm - 4:30pm", activity: "Integration Bee", location: "Smart Lab, NITN" },
      ],
    },
    {
      day: "Day 2",
      date: "6th November 2026",
      events: [
        { time: "9:00am - 11:00am", activity: "Robo Track Challenge", location: "Football Ground" },
        { time: "9:00am - 12:00pm", activity: "Hardware Hackathon", location: "EDC Lab, NITN" },
        { time: "10:00am - 3:00pm", activity: "Free Fire", location: "2A and 2B, NITN" },
        { time: "11:00am - 6:00pm", activity: "Hackathon", location: "VCH, NITN" },
        { time: "2:00pm - 5:00pm", activity: "Tech Crisis", location: "Smart Lab, NITN" },
        { time: "2:00pm - 6:00pm", activity: "MLBB Community Heroes", location: "Campus Stage" },
        { time: "4:30pm - 5:00pm", activity: "Stock Race", location: "Smart Lab, NITN" },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 10);
  }, []);

  if (!mounted) return <p className="text-white text-xl font-mono animate-pulse">Initializing...</p>;

  // Random stars background
  const stars = [...Array(150)].map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden pt-20 pb-20 text-white">
      {/* Animated Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="fixed bg-white rounded-full"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
          }}
          animate={{
            x: ["0px", `${Math.random() * 50 - 25}px`, "0px"],
            y: ["0px", `${Math.random() * 50 - 25}px`, "0px"],
          }}
          transition={{
            repeat: Infinity,
            duration: s.duration,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* --- CONDITIONAL RENDERING USING showSchedule --- */}
      {showSchedule ? (
        <>
          {/* --- LIVE NOW Banner --- */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl font-extrabold text-center mb-12 text-red-500 drop-shadow-lg animate-pulse"
          >
            🚀 LIVE NOW 🚀
          </motion.h1>

          {/* --- Schedule Section --- */}
          {scheduleData.map((dayData, idx) => (
            <div key={idx} className="max-w-5xl mx-auto mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 uppercase text-center text-white">
                {dayData.day} - {dayData.date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dayData.events.map((event, ei) => (
                  <div
                    key={ei}
                    className="p-6 rounded-3xl border-2 shadow-md transform transition duration-300 hover:scale-105"
                    style={{
                      borderImage: "linear-gradient(45deg,#ff00ff,#00ffff) 1",
                      background: "rgba(0,0,0,0.85)",
                    }}
                  >
                    <p className="text-lg text-blue-400 mb-2">{event.time}</p>
                    <p className="text-2xl font-bold text-pink-400 mb-2">{event.activity}</p>
                    <p className="text-md text-lime-400">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        /* --- PLACEHOLDER SHOWN WHEN showSchedule IS FALSE --- */
        <div className="relative z-10 max-w-3xl mx-auto my-20 p-12 text-center bg-gradient-to-br from-gray-900/80 via-cyan-950/40 to-gray-900/80 border border-cyan-500/40 rounded-2xl backdrop-blur-md shadow-2xl">
          <h2 className="text-4xl font-extrabold text-cyan-400 mb-4 tracking-wider">
            SCHEDULE RELEASING SOON!
          </h2>
          <p className="text-gray-300 text-lg">
            The event timeline and activity schedules for Tech Avinya are being finalized. Stay tuned!
            till then explore <a href="/gallery" className="text-cyan-400 hover:text-cyan-300 underline"> gallery</a>
          </p>
        </div>
      )}
    </div>
  );
}
