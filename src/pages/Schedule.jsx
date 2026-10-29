import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTrophy, FaFilePdf, 
  FaUsers, FaArrowRight, FaTicketAlt, FaFilter, FaLayerGroup,
  FaCode, FaRobot, FaGamepad, FaBrain, FaChartLine
} from "react-icons/fa";
import TechfestCyberBackground from "../components/TechfestCyberBackground";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");

  const scheduleEvents = [
    // DAY 1 (5th November 2026)
    {
      id: "code",
      title: "Code Raze",
      club: "Codessey Club",
      clubCategory: "Codessy",
      day: "Day 1",
      date: "5 November 2026",
      time: "9:00 AM – 11:00 AM",
      rawStart: 9.0,
      duration: "2 Hours",
      venue: "Smart Lab, NIT Nagaland",
      teamSize: "Individual (Solo)",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      category: "Competitive Coding & DSA",
      rulebook: "/rulebooks/code_raze.pdf",
      image: "/event/CODE RAZE.jpeg",
      icon: FaCode,
      color: "from-cyan-500/20 to-blue-600/10 border-cyan-500/40 text-cyan-300",
      badgeColor: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
      description: "Fast-paced algorithmic challenge testing speed, data structure mastery, and efficiency under strict zero-AI supervision."
    },
    {
      id: "bgmi",
      title: "BGMI Tournament",
      club: "Esports Arena",
      clubCategory: "Esports",
      day: "Day 1",
      date: "5 November 2026",
      time: "10:00 AM – 3:00 PM",
      rawStart: 10.0,
      duration: "5 Hours",
      venue: "Rooms 2A & 2B, NIT Nagaland",
      teamSize: "Squad (4 Players)",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      category: "Battle Royale Esports",
      rulebook: "/rulebooks/bgmi.pdf",
      image: "/event/BGMI.jpeg",
      icon: FaGamepad,
      color: "from-purple-500/20 to-pink-600/10 border-purple-500/40 text-purple-300",
      badgeColor: "bg-purple-950/80 text-purple-300 border-purple-500/40",
      description: "Classic Battle Royale across Rondo, Erangel, and Miramar with official 10-point Chicken Dinner scoring and MVP bonuses."
    },
    {
      id: "infinity",
      title: "Quants Challenge",
      club: "Quants Club",
      clubCategory: "Quants",
      day: "Day 1",
      date: "5 November 2026",
      time: "11:00 AM – 2:00 PM",
      rawStart: 11.0,
      duration: "3 Hours",
      venue: "VCH (Virtual Class Hall)",
      teamSize: "1 to 2 Members",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/- + Trophy",
      category: "Aptitude & Case Sprint",
      rulebook: "/rulebooks/quants_challenge.pdf",
      image: "/event/QUANTS CHALLENGE.jpeg",
      icon: FaBrain,
      color: "from-amber-500/20 to-orange-600/10 border-amber-500/40 text-amber-300",
      badgeColor: "bg-amber-950/80 text-amber-300 border-amber-500/40",
      description: "4-round elimination gauntlet: Speed Math OMR, Probability Sprint, Logical Deductions, and Real-World Quant Case pitch."
    },
    {
      id: "modelling",
      title: "Genesis 3D",
      club: "Codessey Club",
      clubCategory: "Codessy",
      day: "Day 1",
      date: "5 November 2026",
      time: "2:00 PM – 6:00 PM",
      rawStart: 14.0,
      duration: "4 Hours",
      venue: "VCH (Virtual Class Hall)",
      teamSize: "1 to 3 Members",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      category: "3D Modelling & Simulation",
      rulebook: "/rulebooks/genesis_3d.pdf",
      image: "/event/GENESIS 3D.jpeg",
      icon: FaBrain,
      color: "from-sky-500/20 to-indigo-600/10 border-sky-500/40 text-sky-300",
      badgeColor: "bg-sky-950/80 text-sky-300 border-sky-500/40",
      description: "Native 3D CAD sculpting, architectural modeling, and physical simulation sprint with live 3-4 slide jury presentation."
    },
    {
      id: "digital",
      title: "Integration Bee",
      club: "Quants Club",
      clubCategory: "Quants",
      day: "Day 1",
      date: "5 November 2026",
      time: "2:30 PM – 4:30 PM",
      rawStart: 14.5,
      duration: "2 Hours",
      venue: "Smart Lab, NIT Nagaland",
      teamSize: "Individual (Solo)",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      category: "Calculus & Analytical Math",
      rulebook: "/rulebooks/integration_bee.pdf",
      image: "/event/INTEGRAL BE.jpeg",
      icon: FaBrain,
      color: "from-emerald-500/20 to-teal-600/10 border-emerald-500/40 text-emerald-300",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
      description: "High-speed mental calculus duel without calculators. Up to 3 elimination rounds with step marks and sudden-death tiebreakers."
    },

    // DAY 2 (6th November 2026)
    {
      id: "clash",
      title: "Robo Track Challenge",
      club: "Robotics Club",
      clubCategory: "Robotics",
      day: "Day 2",
      date: "5 November 2026",
      time: "9:00 AM – 11:00 AM",
      rawStart: 9.0,
      duration: "2 Hours",
      venue: "NITN Football Ground",
      teamSize: "1 to 5 Members",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      category: "RC Bots & Obstacle Track",
      rulebook: "/rulebooks/robo_track.pdf",
      image: "/event/ROBO TRACK.jpeg",
      icon: FaRobot,
      color: "from-emerald-500/20 to-green-600/10 border-emerald-500/40 text-emerald-300",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
      description: "Custom-built RC vehicles navigate rough terrain, chicanes, and 35cm-wide obstacle lanes, accompanied by technical viva."
    },
    {
      id: "aerial",
      title: "Hardware Hackathon",
      club: "Robotics Club",
      clubCategory: "Robotics",
      day: "Day 2",
      date: "6 November 2026",
      time: "9:00 AM – 12:00 PM",
      rawStart: 9.0,
      duration: "3 Hours",
      venue: "EDC Lab, NIT Nagaland",
      teamSize: "1 to 2 Members",
      prize: "₹ 25,000/-",
      firstPrize: "₹ 15,000/-",
      category: "Hardware & IoT (Think. Solve. Build.)",
      rulebook: "/rulebooks/hardware_hackathon.pdf",
      image: "/event/HARDWARE HACKATHON.jpeg",
      icon: FaRobot,
      color: "from-teal-500/20 to-cyan-600/10 border-teal-500/40 text-teal-300",
      badgeColor: "bg-teal-950/80 text-teal-300 border-teal-500/40",
      description: "Hardware Hustle: 3 competitive stages featuring an engineering quiz, real-world design challenge, and live Build Arena prototype."
    },
    {
      id: "stock",
      title: "Stock Race",
      club: "E-Cell",
      clubCategory: "E-Cell",
      day: "Day 2",
      date: "6 November 2026",
      time: "9:00 AM – 4:00 PM",
      rawStart: 9.0,
      duration: "Daily (7 Hrs)",
      venue: "Smart Lab, NIT Nagaland",
      teamSize: "Individual (Solo)",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      category: "Stock Market Simulation",
      rulebook: "/rulebooks/stock_race.pdf",
      image: "/event/STOCK RAZE.jpeg",
      icon: FaChartLine,
      color: "from-emerald-500/20 to-lime-600/10 border-emerald-500/40 text-emerald-300",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
      description: "Live virtual stock market simulation. Trade designated companies shared in the WhatsApp group between 9:00 AM and 4:00 PM."
    },
    {
      id: "free",
      title: "Free Fire",
      club: "Esports Arena",
      clubCategory: "Esports",
      day: "Day 2",
      date: "6 November 2026",
      time: "10:00 AM – 3:00 PM",
      rawStart: 10.0,
      duration: "5 Hours",
      venue: "Rooms 2A & 2B, NIT Nagaland",
      teamSize: "Squad (4 Players)",
      prize: "₹ 20,000/-",
      firstPrize: "₹ 12,000/-",
      category: "Battle Royale Esports",
      rulebook: "/rulebooks/freefire.pdf",
      image: "/event/FREE FIRE.jpeg",
      icon: FaGamepad,
      color: "from-rose-500/20 to-red-600/10 border-rose-500/40 text-rose-300",
      badgeColor: "bg-rose-950/80 text-rose-300 border-rose-500/40",
      description: "Intense survival battle royale across Bermuda, Kalahari, and Purgatory with official Booyah placement and MVP kill bonuses."
    },
    {
      id: "hackathon",
      title: "Hackathon",
      club: "Codessey Club",
      clubCategory: "Codessy",
      day: "Day 2",
      date: "6 November 2026",
      time: "11:00 AM – 6:00 PM",
      rawStart: 11.0,
      duration: "8 Hours",
      venue: "VCH (Virtual Class Hall)",
      teamSize: "3 to 5 Members",
      prize: "₹ 22,000/-",
      firstPrize: "₹ 12,000/-",
      category: "Software Prototyping Sprint",
      rulebook: "/rulebooks/hackathon.pdf",
      image: "/event/HACKATHON.jpeg",
      icon: FaCode,
      color: "from-blue-500/20 to-indigo-600/10 border-blue-500/40 text-blue-300",
      badgeColor: "bg-blue-950/80 text-blue-300 border-blue-500/40",
      description: "8-hour software prototyping sprint under strict zero-AI policy. Teams develop solutions from scratch and present a 6-slide deck."
    },
    {
      id: "tech",
      title: "Tech Crisis",
      club: "E-Cell",
      clubCategory: "E-Cell",
      day: "Day 2",
      date: "6 November 2026",
      time: "1:30 PM – 3:30 PM",
      rawStart: 13.5,
      duration: "2 Hours",
      venue: "Smart Lab, NIT Nagaland",
      teamSize: "1 to 3 Members",
      prize: "₹ 10,000/-",
      firstPrize: "₹ 6,000/-",
      category: "Technical Case Study & Crisis",
      rulebook: "/rulebooks/tech_crisis.pdf",
      image: "/event/TECH CRISIS.jpeg",
      icon: FaChartLine,
      color: "from-violet-500/20 to-fuchsia-600/10 border-violet-500/40 text-violet-300",
      badgeColor: "bg-violet-950/80 text-violet-300 border-violet-500/40",
      description: "Two-phase crisis resolution: Phase 1 Case Analysis (1:30–2:30 PM) followed by Phase 2 Presentation & Q&A (2:30–3:30 PM)."
    },
    {
      id: "mlbb",
      title: "MLBB (Community Heroes)",
      club: "Esports Arena",
      clubCategory: "Esports",
      day: "Day 2",
      date: "6 November 2026",
      time: "2:00 PM – 6:00 PM",
      rawStart: 14.0,
      duration: "4 Hours",
      venue: "Campus Arena / Main Stage",
      teamSize: "5 Players (+1 Sub)",
      prize: "₹ 30,000 + 10K Diamonds",
      firstPrize: "₹ 20,000 + 5k Dias",
      category: "5v5 MOBA LAN Finals",
      rulebook: "/rulebooks/mlbb.pdf",
      image: "/event/MLBB.jpeg",
      icon: FaGamepad,
      color: "from-indigo-500/20 to-cyan-600/10 border-indigo-500/40 text-indigo-300",
      badgeColor: "bg-indigo-950/80 text-indigo-300 border-indigo-500/40",
      description: "Top 4 squads from online qualifiers clash in live on-stage Semi-Finals and Grand Finals with crowd in-game diamond giveaways."
    }
  ];

  const clubsList = [
    { id: "all", label: "All Clubs" },
    { id: "Codessy", label: "Codessey Club" },
    { id: "Robotics", label: "Robotics Club" },
    { id: "Esports", label: "Esports Arena" },
    { id: "Quants", label: "Quants Club" },
    { id: "E-Cell", label: "E-Cell" },
  ];

  const filteredEvents = scheduleEvents.filter((event) => {
    const matchDay = selectedDay === "all" || 
      (selectedDay === "day1" && event.day === "Day 1") || 
      (selectedDay === "day2" && event.day === "Day 2");
    const matchClub = selectedClub === "all" || event.clubCategory === selectedClub;
    return matchDay && matchClub;
  });

  return (
    <div className="relative min-h-screen pt-28 pb-24 text-white overflow-hidden bg-[#020409]">
      {/* Signature IIT Bombay Techfest Cyber Canvas */}
      <TechfestCyberBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <FaCalendarAlt className="w-3.5 h-3.5 text-cyan-400" />
            Official Fest Timeline
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 mb-4 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
            Events Schedule
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            Explore all 12 flagship competitions across 5 & 6 November 2026. View exact venues, timings, verified rulebooks, and secure your team enrollment.
          </p>
        </div>

        {/* Quick Highlights Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10">
          <div className="p-4 rounded-2xl bg-black/50 border border-cyan-500/20 backdrop-blur-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">12</span>
            <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">Official Events</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/20 backdrop-blur-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">2 Days</span>
            <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">Nov 5 & 6, 2026</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/20 backdrop-blur-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">₹2,00,000+</span>
            <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">Total Prize Pool</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 backdrop-blur-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">5 Clubs</span>
            <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">NIT Nagaland</p>
          </div>
        </div>

        {/* Control Bar: Day Selector & Club Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-black/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedDay === "all"
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              All Schedule (12)
            </button>
            <button
              onClick={() => setSelectedDay("day1")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedDay === "day1"
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              Day 1 (5 Nov)
            </button>
            <button
              onClick={() => setSelectedDay("day2")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedDay === "day2"
                  ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              Day 2 (6 Nov)
            </button>
          </div>

          {/* Club Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center md:justify-end">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1 mr-1">
              <FaFilter className="w-3 h-3 text-cyan-400" /> Filter:
            </span>
            {clubsList.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClub(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedClub === c.id
                    ? "bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const IconComponent = evt.icon;
            return (
              <div
                key={evt.id}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b132b]/80 via-[#070e20]/90 to-[#030611]/95 p-6 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,240,255,0.2)] flex flex-col justify-between"
              >
                {/* Top Badge Line */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${evt.badgeColor}`}>
                      {evt.club}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <FaTrophy className="w-3.5 h-3.5 text-amber-400" />
                      {evt.prize}
                    </span>
                  </div>

                  {/* Day & Time Header */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-500/20 mb-4 group-hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-bold">
                        {evt.day} • {evt.date}
                      </span>
                      <span className="text-gray-400 text-[11px]">{evt.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-mono font-bold text-sm sm:text-base mt-1.5">
                      <FaClock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                  </div>

                  {/* Event Title & Category */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-cyan-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {evt.title}
                      </h3>
                    </div>
                    <p className="text-xs text-purple-300 font-mono tracking-wide ml-0.5">
                      {evt.category}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {evt.description}
                  </p>

                  {/* Location & Team Specs */}
                  <div className="space-y-2 text-xs text-gray-300 mb-6 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span className="font-medium text-gray-200">{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300 font-mono">{evt.teamSize}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center gap-2">
                    {/* Rulebook Download Link */}
                    <a
                      href={evt.rulebook}
                      download
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
                      title="Download Official Rulebook PDF"
                    >
                      <FaFilePdf className="w-3.5 h-3.5 text-red-400 group-hover:text-black" />
                      Rulebook
                    </a>

                    {/* View Details Link */}
                    <Link
                      to={`/events/${evt.id}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      Details &rarr;
                    </Link>
                  </div>

                  {/* Enroll Direct Button */}
                  <Link
                    to={`/enroll/${evt.id}`}
                    className="w-full py-2.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 hover:brightness-110 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <FaTicketAlt className="w-3.5 h-3.5" />
                    Enroll for this Event
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reporting Guidelines Notice */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-blue-950/40 border border-cyan-500/30 backdrop-blur-xl text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-cyan-300 mb-2">
            Important Venue Reporting Guidelines
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light max-w-2xl mx-auto mb-4">
            All registered participants and squad leaders must report to their respective venue desks at least <b>15 to 30 minutes prior</b> to the scheduled event time with a valid institute or college photo ID card.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/events"
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Explore Full Catalog
            </Link>
            <Link
              to="/enroll"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Open Universal Registration Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
