import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowRight, FaGamepad, FaCode, FaRobot, FaBrain, FaChartLine } from 'react-icons/fa';
import TechfestCyberBackground from '../components/TechfestCyberBackground';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const eventData = useMemo(() => [
    {
      id: "code",
      title: "Code Raze",
      club: "Codessy Club",
      category: "Coding",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 99 (NITN) / ₹ 299",
      date: "5 Nov 2026",
      time: "9:00am - 11:00am",
      venue: "Smart Lab, NITN",
      image: "/event/CODE RAZE.jpeg",
      icon: FaCode,
      tag: "Competitive Coding",
    },
    {
      id: "hackathon",
      title: "Hackathon",
      club: "Codessy Club",
      category: "Coding",
      prize: "₹ 22,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 199 (NITN) / ₹ 499",
      date: "6 Nov 2026",
      time: "11:00am - 6:00pm",
      venue: "VCH, NITN",
      image: "/event/HACKATHON.jpeg",
      icon: FaCode,
      tag: "Software Sprint",
    },
    {
      id: "modelling",
      title: "Genesis 3D",
      club: "Codessy Club",
      category: "Design",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 99 (NITN) / ₹ 299",
      date: "5 Nov 2026",
      time: "2:00pm - 6:00pm",
      venue: "VCH, NITN",
      image: "/event/GENESIS 3D.jpeg",
      icon: FaBrain,
      tag: "3D Modelling & Simulation",
    },
    {
      id: "aerial",
      title: "Hardware Hackathon",
      club: "Robotics Club",
      category: "Robotics",
      prize: "₹ 25,000/-",
      firstPrize: "₹ 15,000/-",
      entryFee: "₹ 199 (NITN) / ₹ 499",
      date: "6 Nov 2026",
      time: "9:00am - 12:00pm",
      venue: "EDC Lab, NITN",
      image: "/event/HARDWARE HACKATHON.jpeg",
      icon: FaRobot,
      tag: "Think. Solve. Build.",
    },
    {
      id: "clash",
      title: "Robo Track Challenge",
      club: "Robotics Club",
      category: "Robotics",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 199 (NITN) / ₹ 499",
      date: "6 Nov 2026",
      time: "9:00am - 11:00am",
      venue: "NITN Football Ground",
      image: "/event/ROBO TRACK.jpeg",
      icon: FaRobot,
      tag: "RC Obstacle Course",
    },
    {
      id: "bgmi",
      title: "BGMI Tournament",
      club: "Esports Arena",
      category: "Esports",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 199 (NITN) / ₹ 500",
      date: "5 Nov 2026",
      time: "10:00am - 3:00pm",
      venue: "2A & 2B, NITN",
      image: "/event/BGMI.jpeg",
      icon: FaGamepad,
      tag: "Battle Royale Squad",
    },
    {
      id: "free",
      title: "Free Fire",
      club: "Esports Arena",
      category: "Esports",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      entryFee: "₹ 199 (NITN) / ₹ 500",
      date: "6 Nov 2026",
      time: "10:00am - 3:00pm",
      venue: "2A & 2B, NITN",
      image: "/event/FREE FIRE.jpeg",
      icon: FaGamepad,
      tag: "Survival Showdown",
    },
    {
      id: "mlbb",
      title: "MLBB (Community Heroes)",
      club: "Esports Arena",
      category: "Esports",
      prize: "₹ 30,000 + 10K Dias",
      firstPrize: "₹ 20,000 + 5k Dias",
      entryFee: "₹ 199 (NITN) / ₹ 500",
      date: "6 Nov 2026",
      time: "2:00pm - 6:00pm",
      venue: "NIT Nagaland",
      image: "/event/MLBB.jpeg",
      icon: FaGamepad,
      tag: "5v5 MOBA Arena",
    },
    {
      id: "digital",
      title: "Integration Bee",
      club: "Quants Club",
      category: "Quants",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      entryFee: "₹ 70 (NITN) / ₹ 99",
      date: "5 Nov 2026",
      time: "2:30pm - 4:30pm",
      venue: "Smart Lab, NITN",
      image: "/event/INTEGRAL BE.jpeg",
      icon: FaBrain,
      tag: "Calculus & Logic",
    },
    {
      id: "infinity",
      title: "Quants Challenge",
      club: "Quants Club",
      category: "Quants",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      entryFee: "₹ 70 (NITN) / ₹ 129",
      date: "5 Nov 2026",
      time: "11:00am - 2:00pm",
      venue: "VCH, NITN",
      image: "/event/QUANTS CHALLENGE.jpeg",
      icon: FaBrain,
      tag: "Puzzles & Riddles",
    },
    {
      id: "tech",
      title: "Tech Crisis",
      club: "E-Cell",
      category: "E-Cell",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      entryFee: "₹ 129 (NITN) / ₹ 349",
      date: "6 Nov 2026",
      time: "2:00pm - 5:00pm",
      venue: "Smart Lab, NITN",
      image: "/event/TECH CRISIS.jpeg",
      icon: FaChartLine,
      tag: "Case Study & Crisis",
    },
    {
      id: "stock",
      title: "Stock Race",
      club: "E-Cell",
      category: "E-Cell",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      entryFee: "₹ 99 (NITN) / ₹ 149",
      date: "6 Nov 2026",
      time: "4:30pm - 5:00pm",
      venue: "Smart Lab, NITN",
      image: "/event/STOCK RAZE.jpeg",
      icon: FaChartLine,
      tag: "Live Virtual Trading",
    },
  ], []);

  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 16;
    const rotateY = (x / width - 0.5) * -16;
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        boxShadow: '0 20px 45px rgba(0, 240, 255, 0.35)',
        transition: 'transform 0.05s linear, box-shadow 0.05s linear',
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }
    }));
  };

  const categories = ['All', 'Coding', 'Robotics', 'Esports', 'Quants', 'E-Cell', 'Design'];

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return eventData;
    return eventData.filter(e => e.category === selectedCategory);
  }, [eventData, selectedCategory]);

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden bg-[#020409]">
      {/* Signature IIT Bombay Techfest Inspired Animated Cyber Matrix Background */}
      <TechfestCyberBackground />

      <div className="relative z-10 w-full pt-24 pb-20 flex flex-col items-center text-center px-4">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/40 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Tech Avinya 2026 • Official Competitions
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 drop-shadow-[0_10px_25px_rgba(6,182,212,0.4)] mb-4">
          Events & Challenges
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-cyan-200/80 font-light mb-8">
          Step into the arena of innovation. Explore the flagship competitive tracks across coding, robotics, esports, mathematics, and case-solving.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.45)] scale-105'
                  : 'bg-black/50 text-gray-300 border-white/10 hover:border-cyan-500/50 hover:text-white backdrop-blur-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Cards */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-12">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              onMouseMove={(e) => handleMouseMove(e, event.id)}
              onMouseLeave={() => handleMouseLeave(event.id)}
              className="card-wrapper group relative w-full max-w-[360px] mx-auto h-[530px] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out border border-cyan-500/30 hover:border-cyan-400/80 bg-gradient-to-b from-[#0a1128]/70 via-[#050b1a]/80 to-[#02050e]/90 shadow-2xl backdrop-blur-md"
              style={{ ...tiltStyle[event.id] }} 
            >
              <div className="card-inner w-full h-full relative">
                {/* CARD FRONT */}
                <div className="card-face card-front w-full h-full flex flex-col justify-between overflow-hidden">
                  {/* Poster Image Container */}
                  <div className="relative w-full h-[62%] overflow-hidden bg-black/60">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-90" />
                    
                    {/* Floating Club Chip */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 border border-cyan-400/40 text-cyan-300 backdrop-blur-md shadow-md">
                      {event.club}
                    </div>

                    {/* Category Chip */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-900/60 border border-purple-400/40 text-purple-200 backdrop-blur-md">
                      {event.category}
                    </div>
                  </div>

                  {/* Card Front Info */}
                  <div className="flex flex-col justify-between p-4 flex-1 w-full bg-gradient-to-b from-[#050b1a] to-[#02050e]">
                    <div className="text-left">
                      <div className="text-[11px] font-mono text-cyan-400/90 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <event.icon className="w-3 h-3 text-cyan-400" />
                        {event.tag}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide truncate">
                        {event.title}
                      </h3>
                    </div>

                    {/* Prize Pool Banner */}
                    <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 my-2 shadow-inner">
                      <div className="flex items-center gap-2 text-amber-400">
                        <FaTrophy className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-wider text-gray-300">Prize Pool</span>
                      </div>
                      <span className="text-base sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                        {event.prize}
                      </span>
                    </div>

                    {/* Schedule / Venue Quick Line */}
                    <div className="flex items-center justify-between text-xs text-gray-300 px-1 py-1">
                      <span className="flex items-center gap-1 text-cyan-300/90 font-mono">
                        <FaCalendarAlt className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400 font-mono truncate max-w-[170px]">
                        <FaMapMarkerAlt className="w-3 h-3 text-red-400" />
                        {event.venue}
                      </span>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex gap-2.5 w-full mt-2">
                      <Link
                        to={`/events/${event.id}`} 
                        className="flex-1 py-2 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-center rounded-xl border border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] flex items-center justify-center gap-1.5"
                      >
                        Explore
                      </Link>

                      <Link
                        to={`/enroll/${event.id}`}
                        aria-label={`Enroll in ${event.title}`}
                        className="flex-1 py-2 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-center rounded-xl border border-pink-500/60 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(244,63,94,0.45)] transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        Enroll Now
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CARD BACK (3D Flip View) */}
                <div className="card-face card-back w-full h-full bg-gradient-to-br from-[#061129] via-[#040816] to-[#01040a] text-white p-6 flex flex-col justify-between border border-cyan-400/40 rounded-2xl shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">{event.club}</span>
                      <span className="text-xs text-purple-300 font-mono">{event.category}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mb-2">{event.title}</h3>
                    <p className="text-xs text-cyan-200/80 font-mono mb-4">{event.tag}</p>

                    <div className="space-y-2.5 text-left text-xs bg-black/40 p-3.5 rounded-xl border border-cyan-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Prize:</span>
                        <span className="font-bold text-amber-300">{event.prize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">1st Prize:</span>
                        <span className="font-bold text-emerald-400">{event.firstPrize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Registration Fee:</span>
                        <span className="font-bold text-cyan-300">{event.entryFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Date & Time:</span>
                        <span className="text-white font-mono">{event.date} ({event.time})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Venue:</span>
                        <span className="text-gray-200">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 w-full mt-4">
                    <Link
                      to={`/events/${event.id}`}
                      className="w-full text-center rounded-xl py-2.5 px-3 text-xs font-bold uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/60 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      View Full Rulebook
                    </Link>

                    <Link
                      to={`/enroll/${event.id}`}
                      aria-label={`Apply for event - ${event.title}`}
                      className="w-full text-center rounded-xl py-2.5 px-3 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-pink-600 to-rose-600 border border-pink-400 text-white hover:brightness-110 shadow-lg shadow-pink-500/30 transition-all"
                    >
                      Instant Registration &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
