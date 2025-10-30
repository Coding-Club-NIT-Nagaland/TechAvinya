import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScheduleClean() {
  const [mounted, setMounted] = useState(false);

  const scheduleData = [
    {
      day: "Day 1",
      date: "31st October 2025",
      events: [
        { time: "8:30am-9:00am", activity: "Stock Rise", location: "Smart Lab" },
        { time: "9:30am-11:30am", activity: "Code Raze", location: "Smart Lab" },
        { time: "9:00am-12:00pm", activity: "Digital Art", location: "EDC Laboratory" },
        { time: "11:00am-2:00pm", activity: "Aerial Adrenaline", location: "Ground" },
        { time: "2:00pm-4:00pm", activity: "Bug Hunt", location: "Smart Lab" },
        { time: "2:00pm-4:00pm", activity: "Animation", location: "BCR 1" },
        { time: "3:00pm-6:00pm", activity: "BGMI", location: "Classroom 1A" },
      ],
    },
    {
      day: "Day 2",
      date: "1st November 2025",
      events: [
        { time: "9:00am-11:30am", activity: "Free Fire", location: "Classroom 1A" },
        { time: "9:30am-12:00pm", activity: "3D Modelling", location: "Smart Lab" },
        { time: "10:30am-12:00pm", activity: "Clash of Wheels", location: "Ground" },
        { time: "1:00pm-6:00pm", activity: "Hackathon", location: "VCH" },
        { time: "1:30pm-3:30pm", activity: "Tech Crisis", location: "Director Hall" },
        { time: "2:00pm-4:30pm", activity: "MLBB", location: "Classroom 1B" },
        { time: "3:30pm-5:30pm", activity: "Infinity Hunt", location: "Classroom 1A" },
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
    </div>
  );
}
