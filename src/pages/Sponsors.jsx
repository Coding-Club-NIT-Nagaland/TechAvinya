import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHandsHelping, FaAward, FaBuilding, FaCrown, FaLaptopCode, 
  FaRobot, FaPrint, FaExternalLinkAlt, FaUsers, FaTrophy, 
  FaUniversity, FaRocket, FaEnvelope, FaCheckCircle, FaCheck, FaCopy
} from 'react-icons/fa'; 
import TechfestCyberBackground from '../components/TechfestCyberBackground'; 

// --- Consolidated Sponsor & Partner Data ---
const allSponsors = [
  { 
    id: 1, 
    name: "GeeksforGeeks", 
    logo: "/gfg.png", 
    tier: "Title Sponsor", 
    category: "title",
    badge: "👑 Official Title Sponsor",
    domain: "Computer Science & Developer Ecosystem",
    description: "India's premier learning portal empowering millions of developers and students with world-class algorithms, system design, and competitive coding masterclasses.",
    perks: ["Keynote Addresses", "Talent Recruitment", "Exclusive Workshops", "Grand Stage Branding"],
    website: "https://www.geeksforgeeks.org/",
    themeColor: "from-emerald-500/20 via-green-500/10 to-transparent",
    borderColor: "border-emerald-400/50",
    glowColor: "shadow-[0_0_35px_rgba(16,185,129,0.3)]",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-400/40",
  },
  { 
    id: 2, 
    name: "NIELIT Kohima", 
    logo: "/nielit.jpg", 
    tier: "Hackathon Sponsor", 
    category: "tracks",
    badge: "💻 Flagship Hackathon Sponsor",
    domain: "Electronics, IT & Embedded Systems",
    description: "National Institute of Electronics and Information Technology Kohima, advancing cutting-edge software engineering, IT incubation, and open-source hackathons.",
    perks: ["Hackathon Mentorship", "Jury Evaluation", "Project Incubation", "Track Naming"],
    website: "https://nielit.gov.in/kohima/",
    themeColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderColor: "border-cyan-400/40",
    glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.25)]",
    badgeClass: "bg-cyan-950/80 text-cyan-300 border-cyan-400/40",
  },
  { 
    id: 3, 
    name: "Instudia", 
    logo: "/instudia.png", 
    tier: "CodeRaze Partner", 
    category: "tracks",
    badge: "⚡ Competitive Coding Partner",
    domain: "EdTech & Algorithmic Excellence",
    description: "Empowering developers to conquer competitive programming benchmarks, high-speed problem-solving, and software craftsmanship.",
    perks: ["Problem Statement Design", "Live Leaderboard", "Coding Mentorship", "Direct Hiring"],
    website: "https://instudia.com/",
    themeColor: "from-blue-500/20 via-indigo-500/10 to-transparent",
    borderColor: "border-blue-400/40",
    glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
    badgeClass: "bg-blue-950/80 text-blue-300 border-blue-400/40",
  },
  { 
    id: 4, 
    name: "Nagabot", 
    logo: "/nagabot.jpeg", 
    tier: "RoboForge Partner", 
    category: "tracks",
    badge: "🤖 Robotics & Hardware Partner",
    domain: "Robotics, Automation & Mechatronics",
    description: "Pioneering indigenous robotics, autonomous line followers, combat arenas, and hands-on mechatronics engineering in Northeast India.",
    perks: ["Arena Setup", "Technical Workshops", "Hardware Kits", "Robo Challenge Sponsor"],
    website: "https://nagabot.in/",
    themeColor: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderColor: "border-purple-400/40",
    glowColor: "shadow-[0_0_25px_rgba(168,85,247,0.25)]",
    badgeClass: "bg-purple-950/80 text-purple-300 border-purple-400/40",
  },
  { 
    id: 5, 
    name: "Fingerprint", 
    logo: "/fingerprint.png", 
    tier: "Printing Partner", 
    category: "inkind",
    badge: "🖨️ Printing & Merchandise Partner",
    domain: "Creative Print & Visual Merchandise",
    description: "Official merchandise, high-grade campus branding, credentials printing, and graphic design partner for Tech Avinya 2026.",
    perks: ["Festival T-Shirts", "VIP Credentials", "Hoarding Graphics", "Custom Swag Packs"],
    website: "#",
    themeColor: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderColor: "border-pink-400/40",
    glowColor: "shadow-[0_0_25px_rgba(244,63,94,0.25)]",
    badgeClass: "bg-pink-950/80 text-pink-300 border-pink-400/40",
  },
];

const statsData = [
  { value: "15,000+", label: "Digital Impressions", sub: "Pan-India Reach", icon: FaUsers, color: "text-cyan-400" },
  { value: "1,500+", label: "On-Campus Innovators", sub: "Students & Developers", icon: FaUniversity, color: "text-purple-400" },
  { value: "₹2,50,000+", label: "Total Prize Pool", sub: "Across 12 Flagship Tracks", icon: FaTrophy, color: "text-amber-400" },
  { value: "12+", label: "Flagship Competitions", sub: "Hackathons, Coding & Robotics", icon: FaRocket, color: "text-emerald-400" },
];

const valueProps = [
  {
    icon: FaLaptopCode,
    title: "Direct Talent Acquisition",
    desc: "Connect directly with elite coders, software developers, and robotics researchers from NIT Nagaland and premier national engineering institutes.",
    color: "from-cyan-500/15 to-blue-600/5",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: FaRocket,
    title: "Omnichannel Brand Immersion",
    desc: "High-impact exposure across campus mega-banners, official festival merchandise, active social channels, live stage backdrops, and digital media.",
    color: "from-purple-500/15 to-indigo-600/5",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: FaTrophy,
    title: "Domain & Track Ownership",
    desc: "Introduce custom problem statements for hackathons, evaluate solutions firsthand on the jury panel, and present flagship competition awards.",
    color: "from-amber-500/15 to-yellow-600/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: FaHandsHelping,
    title: "Ecosystem Innovation Catalyst",
    desc: "Partner with a National Institute of Technology to foster entrepreneurship, grassroots research, and digital empowerment in the vibrant Northeast corridor.",
    color: "from-emerald-500/15 to-teal-600/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
];

const tierBenefits = [
  {
    name: "Title Sponsor",
    badge: "👑 Exclusive Tier",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    highlight: "Presented by [Your Brand]",
    perks: [
      "Naming rights on all main promotions & banners",
      "Prime on-stage keynote & interactive tech workshop",
      "Prominent stall / booth in main festival pavilion",
      "Full access to participant talent resumes & database",
      "Exclusive branding across official merchandise & passes",
    ],
    border: "border-amber-500/50",
    bg: "from-amber-950/40 via-slate-900/80 to-black/90",
  },
  {
    name: "Co-Sponsor / Powered By",
    badge: "💎 Premium Tier",
    badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    highlight: "Powered by [Your Brand]",
    perks: [
      "Prominent logo on stage backdrops & digital streams",
      "Custom named hackathon or gaming tournament track",
      "Dedicated company stall in campus exhibition zone",
      "Distribution of company collateral & swag bags",
      "Extensive social media spotlights & newsletters",
    ],
    border: "border-cyan-500/50",
    bg: "from-cyan-950/40 via-slate-900/80 to-black/90",
  },
  {
    name: "Track / Event Partner",
    badge: "🚀 Domain Tier",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    highlight: "[Event Name] Partner",
    perks: [
      "Exclusive title association with selected flagship event",
      "Representative on official judging & award jury panel",
      "Targeted product demonstration to domain participants",
      "Logo integration on event posters & social graphics",
      "Direct engagement with track award winners",
    ],
    border: "border-purple-500/50",
    bg: "from-purple-950/40 via-slate-900/80 to-black/90",
  },
  {
    name: "Associate & In-Kind",
    badge: "🤝 Catalyst Tier",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    highlight: "Official Partner",
    perks: [
      "Official partner designation (Media, Printing, Cloud)",
      "Logo placement in festival program guide & website",
      "Distribution of developer credits, trial tools or swag",
      "Social media welcome post & recognition",
      "Certificate of Appreciation from NIT Nagaland",
    ],
    border: "border-emerald-500/50",
    bg: "from-emerald-950/40 via-slate-900/80 to-black/90",
  },
];

export default function Sponsors() {
  const [activeTab, setActiveTab] = useState('all');
  const [tiltStyle, setTiltStyle] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const contactEmail = 'techavi@nitnagaland.ac.in';

  // --- Dynamic Tilt Logic ---
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 15; 
    const rotateY = (x / width - 0.5) * -15; 
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transition: 'transform 0.05s linear, box-shadow 0.05s linear', 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out', 
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      }
    }));
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Filter sponsors based on active tab
  const filteredSponsors = allSponsors.filter(s => {
    if (activeTab === 'all') return true;
    if (activeTab === 'title') return s.category === 'title';
    if (activeTab === 'tracks') return s.category === 'tracks';
    if (activeTab === 'inkind') return s.category === 'inkind';
    return true;
  });

  const titleSponsor = allSponsors.find(s => s.category === 'title');

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden bg-[#020409]">
      {/* Signature IIT Bombay Techfest Cybernetic Background */}
      <TechfestCyberBackground />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full pt-28 pb-24 flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* --- Top Authority Header Badge --- */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/50 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <FaCrown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          Industry Catalysts & Alliances
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-500 mb-4 tracking-tight uppercase text-center drop-shadow-[0_10px_25px_rgba(6,182,212,0.4)]">
          Our Proud Partners
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-12 max-w-3xl text-center leading-relaxed font-light">
          We extend our deepest gratitude to the visionary organizations driving cutting-edge competitions, technological breakthroughs, and youth leadership at <span className="text-cyan-300 font-semibold">National Institute of Technology Nagaland</span>.
        </p>

        {/* --- Reach & Impact Metrics Bar --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="relative p-5 rounded-2xl bg-gradient-to-b from-[#0c1838]/80 via-[#070e24]/90 to-[#020512]/95 border border-cyan-500/30 backdrop-blur-xl shadow-xl flex flex-col items-center text-center group hover:border-cyan-400/80 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 mb-3 shadow-inner ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-400 font-light mt-0.5">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Interactive Category Filter Tabs --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Partners' },
            { id: 'title', label: '👑 Title Sponsor' },
            { id: 'tracks', label: '🚀 Track & Domain Partners' },
            { id: 'inkind', label: '🤝 Printing & Merchandise' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- TITLE SPONSOR GRAND SPOTLIGHT (When 'all' or 'title' selected) --- */}
        {(activeTab === 'all' || activeTab === 'title') && titleSponsor && (
          <div className="w-full mb-16">
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                ⭐ Flagship Festival Presenter ⭐
              </span>
            </div>

            <div 
              onMouseMove={(e) => handleMouseMove(e, titleSponsor.id)}
              onMouseLeave={() => handleMouseLeave(titleSponsor.id)}
              style={tiltStyle[titleSponsor.id]}
              className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#12241a]/90 via-[#06140f]/95 to-[#020a06]/98 border-2 border-emerald-400/60 shadow-[0_0_50px_rgba(16,185,129,0.3)] backdrop-blur-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Ambient Cyber Beams */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
                {/* Left: High-Contrast Logo Pod */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left flex-shrink-0">
                  <div className="w-64 h-32 sm:w-72 sm:h-36 bg-white/95 rounded-2xl p-4 flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.6)] border-2 border-white/80 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={titleSponsor.logo} 
                      alt={titleSponsor.name} 
                      className="max-h-24 max-w-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-400/40">
                    <FaCheckCircle className="w-3 h-3 text-emerald-400" /> Verified Title Partner
                  </span>
                </div>

                {/* Center: Sponsor Details & Mission */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 mb-2">
                    {titleSponsor.domain}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                    {titleSponsor.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6 max-w-2xl">
                    {titleSponsor.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                    {titleSponsor.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-200 bg-emerald-950/40 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
                        <FaCheck className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* External Visit Button */}
                  {titleSponsor.website !== '#' && (
                    <a
                      href={titleSponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:brightness-110 transition-all duration-300 hover:scale-105"
                    >
                      Visit Official Portal
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TRACK & DOMAIN SPONSORS GRID --- */}
        {(activeTab === 'all' || activeTab === 'tracks' || activeTab === 'inkind') && (
          <div className="w-full mb-20">
            {activeTab === 'all' && (
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 uppercase tracking-widest font-mono">
                  Competition & Operations Partners
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Powering individual tracks, hackathons, and on-ground infrastructure
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {filteredSponsors
                .filter(s => activeTab !== 'all' || s.category !== 'title')
                .map((sponsor) => {
                  return (
                    <div
                      key={sponsor.id}
                      onMouseMove={(e) => handleMouseMove(e, sponsor.id)}
                      onMouseLeave={() => handleMouseLeave(sponsor.id)}
                      style={tiltStyle[sponsor.id]}
                      className={`relative p-6 rounded-2xl bg-gradient-to-b from-[#0a1530]/85 via-[#060c20]/90 to-[#020510]/95 border ${sponsor.borderColor} backdrop-blur-xl ${sponsor.glowColor} flex flex-col justify-between group transition-all duration-300 hover:border-cyan-300`}
                    >
                      {/* Top Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${sponsor.badgeClass}`}>
                          {sponsor.badge}
                        </span>
                      </div>

                      {/* Crisp Frosted White Logo Stage */}
                      <div className="w-full h-28 bg-white/95 rounded-xl p-3 flex items-center justify-center shadow-lg border border-white/50 mb-5 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-20 max-w-full object-contain filter drop-shadow-sm"
                        />
                      </div>

                      {/* Content Body */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {sponsor.name}
                          </h4>
                          <p className="text-xs font-semibold text-cyan-400/90 mt-0.5 mb-2">
                            {sponsor.domain}
                          </p>
                          <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 line-clamp-3">
                            {sponsor.description}
                          </p>
                        </div>

                        {/* Perks Pills */}
                        <div className="border-t border-white/10 pt-3 mt-auto">
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {sponsor.perks.slice(0, 2).map((perk, pIdx) => (
                              <span key={pIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                                ✓ {perk}
                              </span>
                            ))}
                          </div>

                          {sponsor.website !== '#' ? (
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-black transition-all duration-300"
                            >
                              Visit Website
                              <FaExternalLinkAlt className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <div className="text-center text-[11px] text-gray-400 font-mono py-1">
                              Official Print Partner
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* --- WHY SPONSOR TECH AVINYA (VALUE PROPOSITION BENTO) --- */}
        <div className="w-full mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-400/40 bg-purple-950/40 text-purple-300 text-xs font-mono uppercase tracking-widest mb-3">
              <FaAward className="w-3.5 h-3.5 text-purple-400" />
              Corporate Value Proposition
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tech Avinya '26</span>?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-2 font-light">
              Elevate your organization's presence, recruit industry-ready engineers, and cement leadership at Northeast India's flagship technological confluence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-b ${prop.color} to-black/60 border ${prop.border} backdrop-blur-xl shadow-lg flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group`}
                >
                  <div>
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-4 ${prop.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SPONSORSHIP TIERS OVERVIEW --- */}
        <div className="w-full mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Sponsorship Tiers & Benefits
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto font-light">
              Tailored partnership tiers designed to maximize your ROI, recruitment goals, and brand reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tierBenefits.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-b ${tier.bg} border ${tier.border} backdrop-blur-xl shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${tier.badgeClass}`}>
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 mb-4 pb-3 border-b border-white/10">
                    {tier.highlight}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-gray-300 font-light leading-snug">
                        <FaCheck className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/sponsors/connect"
                  className="w-full text-center py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/20 hover:border-cyan-400 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Select Tier
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* --- HIGH-IMPACT CALL TO ACTION CENTER --- */}
        <div className="relative rounded-3xl p-8 sm:p-12 max-w-4xl w-full text-center border-2 border-cyan-400/50 bg-gradient-to-b from-[#0e1c45]/90 via-[#07112d]/95 to-[#020512] shadow-[0_0_60px_rgba(0,240,255,0.25)] backdrop-blur-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/20">
              <FaBuilding className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-wide">
              Ready to Partner With Tech Avinya 2026?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Join industry leaders in empowering innovation, hosting hackathon challenges, and recruiting elite engineering talent from NIT Nagaland. Custom sponsorship packages are readily available.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                to="/sponsors/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 
                           bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 
                           text-white text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl 
                           shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:brightness-110 transform hover:scale-105 
                           transition-all duration-300"
              >
                <FaHandsHelping className="w-4 h-4" />
                Submit Sponsorship Inquiry
              </Link>

              <button 
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 
                           bg-gray-900/80 hover:bg-gray-800 text-cyan-300 border border-cyan-400/40 
                           rounded-xl text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 shadow-md"
              >
                {copiedEmail ? (
                  <>
                    <FaCheck className="w-3.5 h-3.5 text-green-400" />
                    <span>Copied Email!</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{contactEmail}</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <FaEnvelope className="text-cyan-400" /> Direct Response within 24 Hours
              </span>
              <span>•</span>
              <span>NIT Nagaland Campus, Chumukedima</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
