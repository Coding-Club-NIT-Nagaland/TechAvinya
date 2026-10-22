import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaCode, FaRobot, 
  FaGamepad, FaChartLine, FaArrowRight, FaTicketAlt, FaFilePdf, 
  FaBolt, FaCheckCircle, FaUsers, FaClock, FaUniversity, FaLayerGroup 
} from 'react-icons/fa';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import TechfestCyberBackground from '../components/TechfestCyberBackground';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const competitionTracks = [
    {
      id: "coding",
      title: "Coding & Software Prototyping",
      club: "Codessy Club",
      pool: "₹ 62,000/- Pool",
      color: "border-cyan-500/40 hover:border-cyan-400 from-cyan-950/30 to-blue-950/20",
      icon: FaCode,
      iconColor: "text-cyan-400",
      badgeColor: "bg-cyan-950/80 text-cyan-300 border-cyan-400/40",
      description: "Flagship algorithmic challenges and intense 8-hour prototype engineering sprints under strict zero-AI evaluation.",
      events: [
        { name: "Code Raze (DSA)", time: "5 Nov • 9:00 AM", fee: "₹99 / ₹299", link: "/events/code" },
        { name: "8-Hr Hackathon", time: "6 Nov • 11:00 AM", fee: "₹199 / ₹499", link: "/events/hackathon" },
        { name: "Genesis 3D", time: "5 Nov • 2:00 PM", fee: "₹99 / ₹299", link: "/events/modelling" },
      ],
      rulebook: "/rulebooks/hackathon.pdf"
    },
    {
      id: "robotics",
      title: "Robotics, RC & Hardware Arena",
      club: "Robotics Club",
      pool: "₹ 45,000/- Pool",
      color: "border-emerald-500/40 hover:border-emerald-400 from-emerald-950/30 to-teal-950/20",
      icon: FaRobot,
      iconColor: "text-emerald-400",
      badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-400/40",
      description: "Custom-engineered RC vehicles conquering 35cm obstacle tracks and 3-round embedded electronics hardware engineering.",
      events: [
        { name: "Robo Track Challenge", time: "6 Nov • 9:00 AM", fee: "₹199 / ₹499", link: "/events/clash" },
        { name: "Hardware Hackathon", time: "6 Nov • 9:00 AM", fee: "₹199 / ₹499", link: "/events/aerial" },
      ],
      rulebook: "/rulebooks/robo_track.pdf"
    },
    {
      id: "esports",
      title: "Esports Colosseum Championship",
      club: "Esports Arena",
      pool: "₹ 70,000 + 10K Dias",
      color: "border-purple-500/40 hover:border-purple-400 from-purple-950/30 to-pink-950/20",
      icon: FaGamepad,
      iconColor: "text-purple-400",
      badgeColor: "bg-purple-950/80 text-purple-300 border-purple-400/40",
      description: "Adrenaline-fueled Battle Royale custom rooms and 5v5 MOBA LAN finals with crowd diamond drops.",
      events: [
        { name: "BGMI Tournament", time: "5 Nov • 10:00 AM", fee: "₹199 / ₹500", link: "/events/bgmi" },
        { name: "Free Fire Showdown", time: "6 Nov • 10:00 AM", fee: "₹199 / ₹500", link: "/events/free" },
        { name: "MLBB Community Heroes", time: "6 Nov • 2:00 PM", fee: "₹199 / ₹500", link: "/events/mlbb" },
      ],
      rulebook: "/rulebooks/bgmi.pdf"
    },
    {
      id: "quants",
      title: "Quants, Calculus & Finance",
      club: "Quants Club & E-Cell",
      pool: "₹ 30,000/- Pool",
      color: "border-amber-500/40 hover:border-amber-400 from-amber-950/30 to-orange-950/20",
      icon: FaChartLine,
      iconColor: "text-amber-400",
      badgeColor: "bg-amber-950/80 text-amber-300 border-amber-400/40",
      description: "High-speed calculus duels without calculators, 4-round quant portfolio case studies, and live Neostox trading.",
      events: [
        { name: "Integration Bee", time: "5 Nov • 2:30 PM", fee: "₹70 / ₹99", link: "/events/digital" },
        { name: "Quants Challenge", time: "5 Nov • 11:00 AM", fee: "₹70 / ₹129", link: "/events/infinity" },
        { name: "Tech Crisis & Stock Race", time: "6 Nov • 2:00 PM", fee: "₹99 - ₹349", link: "/events/tech" },
      ],
      rulebook: "/rulebooks/quants_challenge.pdf"
    }
  ];

  const experiencePillars = [
    {
      title: "Zero-AI Integrity",
      tag: "Pure Algorithmic Skill",
      desc: "Coding and hackathon challenges strictly ban AI assistants. All solutions are tested under live compiler environments with plagiarism analysis.",
      icon: FaBolt,
      color: "text-cyan-400",
      borderColor: "border-cyan-500/30",
    },
    {
      title: "Custom RC Robotics",
      tag: "Hands-on Engineering",
      desc: "No commercial ready-made toys allowed. Bots must be natively fabricated by students, with technical vivas covering circuit design and motor torque.",
      icon: FaRobot,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
    {
      title: "Live LAN Colosseum",
      tag: "Collegiate Esports",
      desc: "Top 4 MLBB squads clash on the campus stage with professional draft pick rules and real-time crowd diamond giveaways.",
      icon: FaGamepad,
      color: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Universal Open Access",
      tag: "All Colleges Welcome",
      desc: "Engineering aspirants and technical students from all colleges across India are eligible to compete for prestigious trophies and official merit certificates.",
      icon: FaUniversity,
      color: "text-amber-400",
      borderColor: "border-amber-500/30",
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020409] text-white overflow-hidden">
      {/* Signature IIT Bombay Techfest Cyber Canvas */}
      <TechfestCyberBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 w-full min-h-screen">
        <HeroSection />
      </section>

      {/* --- SECTION 1: FLAGSHIP COMPETITIONS TRACK (TECHFEST ARENA) --- */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <FaTrophy className="w-3.5 h-3.5 text-cyan-400" />
            Competitive Arenas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 mb-4">
            Flagship Competition Tracks
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            12 official tournaments across 4 engineering domains. Choose your arena, download the verified rulebooks, and compete for glory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competitionTracks.map((track) => {
            const Icon = track.icon;
            return (
              <div 
                key={track.id}
                className={`relative rounded-3xl border ${track.color} bg-gradient-to-b ${track.color} p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,240,255,0.25)] flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${track.badgeColor}`}>
                      {track.club}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <FaTrophy className="w-4 h-4 text-amber-400" />
                      {track.pool}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
                      <Icon className={`w-6 h-6 ${track.iconColor}`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    {track.desc || track.description}
                  </p>

                  {/* Events list within track */}
                  <div className="space-y-2.5 mb-6">
                    {track.events.map((ev, eIdx) => (
                      <Link
                        key={eIdx}
                        to={ev.link}
                        className="p-3 rounded-2xl bg-black/50 border border-white/5 hover:border-cyan-400/50 flex items-center justify-between gap-3 transition-all group/item"
                      >
                        <div>
                          <p className="text-sm font-bold text-white group-hover/item:text-cyan-300 transition-colors">
                            {ev.name}
                          </p>
                          <p className="text-[11px] font-mono text-gray-400">
                            {ev.time}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-cyan-300 flex items-center gap-1 group-hover/item:translate-x-1 transition-transform">
                          View &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={track.rulebook}
                    download
                    className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 text-center"
                  >
                    <FaFilePdf className="w-3.5 h-3.5 text-red-400" />
                    Track Rulebook
                  </a>

                  <Link
                    to="/enroll"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 text-center shadow-md shadow-pink-500/20"
                  >
                    <FaTicketAlt className="w-3.5 h-3.5" />
                    Enroll Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SECTION 2: FEST EXPERIENCE PILLARS (IIT BOMBAY TECHFEST STYLE) --- */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <FaLayerGroup className="w-3.5 h-3.5 text-purple-400" />
            Core Values
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            The Tech Avinya Experience
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Engineered to promote raw technical intellect, ethical engineering, and competitive adrenaline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiencePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl bg-black/60 border ${pillar.borderColor} backdrop-blur-md hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 inline-block mb-4">
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block mb-1">
                    {pillar.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SECTION 3: FESTIVAL TIMELINE & CAMPUS VENUES SUMMARY --- */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-black/80 to-purple-950/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 uppercase tracking-widest">
              Campus Roadmap & Timeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-3 mb-3">
              Two Days of Non-Stop Innovation
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
              Events are hosted across NIT Nagaland's primary academic facilities including the <b>Smart Lab</b>, <b>Virtual Class Hall (VCH)</b>, <b>EDC Laboratory</b>, <b>Football Ground</b>, and <b>Rooms 2A & 2B</b>.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-300">
              <span className="flex items-center gap-1.5"><FaClock className="text-cyan-400" /> Day 1: 5 Nov, 9:00 AM – 6:00 PM</span>
              <span className="flex items-center gap-1.5"><FaClock className="text-purple-400" /> Day 2: 6 Nov, 9:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              to="/schedule"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:brightness-110 text-center transition-all flex items-center justify-center gap-2"
            >
              <FaCalendarAlt className="w-4 h-4" />
              View Full 12-Event Schedule
            </Link>
            <Link
              to="/events"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center transition-all"
            >
              All Events Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: AFTERMOVIE SECTION --- */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 block mb-2">
            Relive The Thrill
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white">
            Official Fest Aftermovie
          </h2>
        </div>
        <div className="rounded-3xl border border-cyan-500/20 bg-black/50 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          <AftermovieCard />
        </div>
      </section>

      {/* --- SECTION 5: ABOUT NIT NAGALAND --- */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <Aboutus />
        </div>
      </section>
    </div>
  );
}
