import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaTrophy, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaPhone, 
  FaFilePdf, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTicketAlt 
} from 'react-icons/fa';
import TechfestCyberBackground from '../components/TechfestCyberBackground';

const allEventsData = [
  {
    id: "code",
    title: "Code Raze",
    club: "Codessy Club, NIT Nagaland",
    category: "Coding & Algorithms",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 5,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)",
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 299/-",
    image: "/event/CODE RAZE.jpeg",
    date: "5 November 2026",
    time: "9:00am - 11:00am",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/code_raze.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "Code Raze is the flagship speed and logic programming contest organized by Codessy Club. Participants tackle an intensive series of algorithmic challenges testing problem-solving agility, data structure mastery, and efficiency under strict time limits.",
    rules: [
      "Individual participation only; no teams allowed.",
      "Contest duration is 2 hours on the official online judging environment.",
      "Supported programming languages: C, C++, Java, and Python.",
      "Strict zero-tolerance policy for plagiarism, AI-generated submissions, or external collaboration.",
      "Scoring will be based on problem weights and submission timestamps."
    ],
    generalRules: "Open to all undergraduate and postgraduate engineering students. Participants must report 15 minutes before the scheduled time with a valid college ID."
  },
  {
    id: "hackathon",
    title: "Hackathon",
    club: "Codessy Club, NIT Nagaland",
    category: "Software Development",
    totalPrize: "₹ 22,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 7,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)",
    feeNIT: "₹ 199/-",
    feeOutside: "₹ 499/-",
    image: "/event/HACKATHON.jpeg",
    date: "6 November 2026",
    time: "11:00am - 6:00pm",
    venue: "VCH (Virtual Class Hall), NIT Nagaland",
    rulebook: "/rulebooks/hackathon.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "A 7-hour rapid prototyping sprint where ideas transform into functional software products! Teams collaborate to engineer innovative, scalable solutions addressing real-world industry and societal challenges.",
    rules: [
      "Team event consisting of 3 to 5 members.",
      "All code and prototypes must be developed from scratch during the hackathon hours.",
      "Use of open-source frameworks, public APIs, and libraries is allowed, provided they are declared.",
      "Evaluation criteria include innovation, technical architecture, completion rate, and live presentation.",
      "Pre-built projects or direct clones from GitHub will result in instant disqualification."
    ],
    generalRules: "Open to all colleges. Bring your own laptops and development equipment. High-speed Wi-Fi will be provided at the venue."
  },
  {
    id: "modelling",
    title: "Genesis 3D",
    club: "Codessy Club, NIT Nagaland",
    category: "3D Digital Art & CGI",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 5,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)",
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 299/-",
    image: "/event/GENESIS 3D.jpeg",
    date: "5 November 2026",
    time: "2:00pm - 6:00pm",
    venue: "VCH, NIT Nagaland",
    rulebook: "/rulebooks/3d_modelling.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "Genesis 3D invites digital sculptors, CAD artists, and CGI enthusiasts to create stunning, photorealistic 3D visual models. Showcase your visualization mastery, topology precision, and creative art direction.",
    rules: [
      "Individual competition.",
      "Allowed software: Blender, Autodesk Maya, 3ds Max, ZBrush, Fusion 360, or SolidWorks.",
      "All models, textures, and lighting setups must be authored natively within the 4-hour competition duration.",
      "Final submission must include raw working project files and 3 rendered angles (1080p minimum).",
      "No pre-bought or third-party asset packs allowed."
    ],
    generalRules: "Participants must bring their personal laptops or drawing tablets with required software pre-installed."
  },
  {
    id: "aerial",
    title: "Hardware Hackathon",
    club: "Robotics Club, NIT Nagaland",
    category: "Hardware & IoT",
    totalPrize: "₹ 25,000/-",
    firstPrize: "₹ 15,000/-",
    secondPrize: "₹ 10,000/-",
    thirdPrize: null,
    feeNIT: "₹ 199/-",
    feeOutside: "₹ 499/-",
    image: "/event/HARDWARE HACKATHON.jpeg",
    date: "6 November 2026",
    time: "9:00am - 12:00pm",
    venue: "EDC Lab, NIT Nagaland",
    rulebook: "/rulebooks/aerial.pdf",
    contacts: ["8119028697", "8708676451"],
    description: "Hands-on embedded systems and IoT innovation contest. Teams wire, calibrate, and program sensor-driven microcontrollers and actuators to build responsive real-world automation prototypes.",
    rules: [
      "Team event: 2 to 4 members.",
      "Hardware platforms permitted: Arduino, ESP32, Raspberry Pi, STM32, or custom development boards.",
      "Teams can bring their own sensors, modules, and components for integration.",
      "Safety regulations must be strictly adhered to while operating high-current circuits."
    ],
    generalRules: "Power outlets and basic testing apparatus will be accessible at the EDC Laboratory."
  },
  {
    id: "clash",
    title: "Robo Track Challenge",
    club: "Robotics Club, NIT Nagaland",
    category: "Robotics & RC Control",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 8,000/-",
    thirdPrize: null,
    feeNIT: "₹ 199/-",
    feeOutside: "₹ 499/-",
    image: "/event/ROBO TRACK.jpeg",
    date: "6 November 2026",
    time: "9:00am - 11:00am",
    venue: "NITN Football Ground",
    rulebook: "/rulebooks/clash_of_wheels.pdf",
    contacts: ["8119028697", "8708676451"],
    description: "Where Speed Meets Glory! Build an agile, custom remote-controlled robot capable of conquering rough terrains, high-speed chicanes, speed-bumps, and hairpin turns on the custom-engineered NITN outdoor track.",
    rules: [
      "Teams of 1 to 4 members.",
      "Bot dimensions must adhere to the official rulebook limits (max 30cm x 30cm x 30cm).",
      "DC battery voltage limit applies; no combustion engines allowed.",
      "Time penalties apply for leaving the designated track or causing track barrier structural damage.",
      "Shortest lap time with fewest penalty points takes the championship."
    ],
    generalRules: "Teams must present their bot for technical and safety inspection 30 minutes before the heats commence."
  },
  {
    id: "bgmi",
    title: "BGMI Tournament",
    club: "Esports Arena, NIT Nagaland",
    category: "Esports Battle Royale",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 8,000/-",
    thirdPrize: null,
    feeNIT: "₹ 199/- (Per Team)",
    feeOutside: "₹ 500/- (Per Team)",
    image: "/event/BGMI.jpeg",
    date: "5 November 2026",
    time: "10:00am - 3:00pm",
    venue: "2A & 2B, NIT Nagaland",
    rulebook: "/rulebooks/BGMI Rules.pdf",
    contacts: ["9279716769", "9362619196"],
    description: "The ultimate Battlegrounds Mobile India squad showdown! Compete across Erangel and Miramar maps in custom rooms against top collegiate esports squads for bragging rights and cash glory.",
    rules: [
      "Squad format (exactly 4 players per team).",
      "Only official mobile devices allowed; iPads, tablets, emulators, and triggers are strictly banned.",
      "Custom room credentials will be shared in the official tournament discord/WhatsApp group 15 minutes before match start.",
      "Any use of game files modification, third-party software, or teaming up results in immediate disqualification and blacklisting."
    ],
    generalRules: "Team leaders must submit exact In-Game Character IDs (UIDs) during registration."
  },
  {
    id: "free",
    title: "Free Fire",
    club: "Esports Arena, NIT Nagaland",
    category: "Esports Battle Royale",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 8,000/-",
    thirdPrize: null,
    feeNIT: "₹ 199/- (Per Team)",
    feeOutside: "₹ 500/- (Per Team)",
    image: "/event/FREE FIRE.jpeg",
    date: "6 November 2026",
    time: "10:00am - 3:00pm",
    venue: "2A & 2B, NIT Nagaland",
    rulebook: "/rulebooks/freefire_rules.pdf",
    contacts: ["9279716769", "9362619196"],
    description: "Fast-paced, adrenaline-pumping survival action! Coordinate strategies with your squad, survive the shrinking zone, and battle for Booyah in the official Tech Avinya Free Fire arena.",
    rules: [
      "Squad format: 4 players per squad.",
      "Personal mobile devices only (no emulators/PC).",
      "Point system based on official esports standard: combination of placement points and kill points.",
      "Decision of tournament admins will be final in case of disconnects or disputes."
    ],
    generalRules: "All squad members must be ready in the custom lobby prior to match countdown."
  },
  {
    id: "mlbb",
    title: "MLBB (Community Heroes)",
    club: "Esports Arena, NIT Nagaland",
    category: "5v5 MOBA Arena",
    totalPrize: "₹ 30,000 + 10K Diamonds",
    firstPrize: "₹ 20,000 + 5K Diamonds",
    secondPrize: "₹ 10,000 + 5K Diamonds",
    thirdPrize: "Diamonds Giveaway to Crowd!",
    feeNIT: "₹ 199/-",
    feeOutside: "₹ 500/-",
    image: "/event/MLBB.jpeg",
    date: "6 November 2026",
    time: "2:00pm - 6:00pm",
    venue: "NIT Nagaland Campus",
    rulebook: "/rulebooks/code_raze.pdf",
    contacts: ["9362619196"],
    description: "Mobile Legends: Bang Bang Community Heroes Meet Up! 5v5 competitive draft matches testing team coordination, lane control, objective secure, and clutch teamfights. Online qualifiers kick off Nov 2nd with Grand Semis and Finals live on stage!",
    rules: [
      "Teams of 5 players.",
      "Custom draft pick mode with standard hero ban phases.",
      "Qualifying rounds begin online on Nov 2; top squads advance to offline LAN finals at NIT Nagaland on Nov 6th.",
      "No substitute players permitted after bracket generation without prior admin authorization."
    ],
    generalRules: "Crowd giveaways with official MLBB diamond bundles during live matches."
  },
  {
    id: "digital",
    title: "Integration Bee",
    club: "Quants Club, NIT Nagaland",
    category: "Mathematics & Calculus",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 70/-",
    feeOutside: "₹ 99/-",
    image: "/event/INTEGRAL BE.jpeg",
    date: "5 November 2026",
    time: "2:30pm - 4:30pm",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/digital_art.pdf",
    contacts: ["7005437886", "9341240119"],
    description: "Beyond formulas, it's logic! Inspired by the famous MIT Integration Bee, this fast-paced math duel challenges competitors to solve difficult indefinite and definite integrals swiftly on the whiteboard under time pressure.",
    rules: [
      "Individual participation.",
      "Preliminary written round followed by head-to-head buzzer elimination rounds.",
      "No calculators, phones, or reference cheat sheets allowed; only chalk/markers and logic.",
      "Speed matters: first correct evaluated integral wins the point."
    ],
    generalRules: "Open to all students who love calculus, analytical thinking, and mental math."
  },
  {
    id: "infinity",
    title: "Quants Challenge",
    club: "Quants Club, NIT Nagaland",
    category: "Logic & Aptitude",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 70/-",
    feeOutside: "₹ 129/-",
    image: "/event/QUANTS CHALLENGE.jpeg",
    date: "5 November 2026",
    time: "11:00am - 2:00pm",
    venue: "VCH, NIT Nagaland",
    rulebook: "/rulebooks/infinity_hunt.pdf",
    contacts: ["7005437886", "9341240119"],
    description: "Put your speed, logic, and problem-solving skills to the test! Featuring logic puzzles, team challenges, brainteasers, mathematical riddles, and quantitative reasoning questions.",
    rules: [
      "Open for solo participants or teams of up to 2 members.",
      "Consists of multiple progressive rounds ranging from logical riddles to speed arithmetic and crypto-puzzles.",
      "Mobile phones and internet browsing are strictly prohibited during the competition.",
      "Organizers' decisions are final in all scoring reconciliations."
    ],
    generalRules: "Pen and scrap worksheets will be provided to all registered participants."
  },
  {
    id: "tech",
    title: "Tech Crisis",
    club: "E-Cell, NIT Nagaland",
    category: "Case Study & Strategy",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 129/-",
    feeOutside: "₹ 349/-",
    image: "/event/TECH CRISIS.jpeg",
    date: "6 November 2026",
    time: "2:00pm - 5:00pm",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/tech_crisis.pdf",
    contacts: ["E-Cell Coordinators"],
    description: "Can you solve the crisis?! A high-stakes corporate and engineering case-study challenge where teams face an unexpected organizational collapse, supply chain halt, or tech failure and must present strategic crisis management roadmaps.",
    rules: [
      "Team event: 2 to 4 members.",
      "Case study dossier is unveiled at the start of the session.",
      "Teams have 2.5 hours to analyze data, formulate contingency strategies, and prepare an executive slide deck.",
      "Judges will evaluate feasibility, financial acumen, technological mitigation, and presentation clarity."
    ],
    generalRules: "Open to students of NIT Nagaland and all recognized colleges/universities."
  },
  {
    id: "stock",
    title: "Stock Race",
    club: "E-Cell, NIT Nagaland",
    category: "Finance & Virtual Trading",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 149/-",
    image: "/event/STOCK RAZE.jpeg",
    date: "6 November 2026",
    time: "4:30pm - 5:00pm",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/stock_rise.pdf",
    contacts: ["6003801527", "8545869601"],
    description: "Master the Market with Real-Time Tools and Expert Support! An intensive virtual stock trading simulation where traders deploy leverage, read candlestick momentum, and aim to maximize portfolio valuation within an active market window.",
    rules: [
      "Individual event.",
      "Participants will trade using the official virtual simulation portal announced prior to the session.",
      "Every trader begins with identical virtual capital.",
      "Highest net portfolio value at market close wins the competition."
    ],
    generalRules: "High-speed internet access is required. Any malpractice or multi-account exploitation will lead to immediate disqualification."
  }
];

export default function EventDetail() {
  const { eventId } = useParams();
  const event = allEventsData.find(e => e.id === eventId);

  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 16;
    const rotateY = (x / width - 0.5) * -16;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: '0 25px 50px rgba(0, 240, 255, 0.4)',
      transition: 'transform 0.05s linear, box-shadow 0.05s linear',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
      transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-white text-center px-4 bg-[#020409]">
        <TechfestCyberBackground />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-4 animate-pulse">Event Not Found</h1>
          <p className="text-gray-300 mb-6">The requested competition does not exist or may have been updated.</p>
          <Link to="/events" className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all">
            Return to All Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-20 text-white overflow-hidden bg-[#020409]">
      {/* Signature IIT Bombay Techfest Cyber Background */}
      <TechfestCyberBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <Link 
          to="/events" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-200 text-sm font-mono tracking-wider transition-colors duration-200 mb-6 group"
        >
          <FaArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Events Catalog
        </Link>

        {/* Hero Card */}
        <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a1128]/80 via-[#050b1a]/90 to-[#02050e]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/10 pb-5">
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 border border-cyan-400/40 text-cyan-300">
                {event.club}
              </span>
              <span className="ml-2.5 text-xs font-mono text-purple-300 uppercase tracking-widest">
                {event.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-lg sm:text-xl">
              <FaTrophy className="w-5 h-5 text-amber-400" />
              <span>Pool: {event.totalPrize}</span>
            </div>
          </div>

          {/* Event Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-400 to-blue-500 mb-6 text-center md:text-left">
            {event.title}
          </h1>

          {/* Grid: Poster Image & Key Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Poster Preview with 3D Tilt */}
            <div 
              className="lg:col-span-5 w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl cursor-pointer"
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover" 
              />
            </div>

            {/* Quick Facts & Prize Breakdown */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Prize Podiums */}
              <div className="bg-black/40 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-sm">
                <h3 className="text-sm font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                  <FaTrophy className="w-4 h-4 text-amber-400" />
                  Official Prize Distribution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex justify-between items-center">
                    <span className="text-amber-200 font-semibold">🥇 1st Prize</span>
                    <span className="font-extrabold text-amber-300 text-base">{event.firstPrize}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-gray-400/30 flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">🥈 2nd Prize</span>
                    <span className="font-extrabold text-gray-200 text-base">{event.secondPrize || 'N/A'}</span>
                  </div>
                  {event.thirdPrize && (
                    <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/30 flex justify-between items-center sm:col-span-2">
                      <span className="text-pink-200 font-semibold">🥉 Special Award</span>
                      <span className="font-extrabold text-pink-300 text-base">{event.thirdPrize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule, Venue & Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider">Date</p>
                    <p className="font-bold text-white font-mono">{event.date}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider">Time</p>
                    <p className="font-bold text-white font-mono">{event.time}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider">Venue</p>
                    <p className="font-bold text-white">{event.venue}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <FaPhone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider">Coordinators</p>
                    <p className="font-bold text-white font-mono">{event.contacts.join(' / ')}</p>
                  </div>
                </div>
              </div>

              {/* Registration Fee Cards */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-blue-950/40 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-300 block">Registration Fee</span>
                  <div className="flex items-center gap-4 mt-1 text-sm font-semibold">
                    <span className="text-cyan-300">NIT Nagaland: <b className="text-white">{event.feeNIT}</b></span>
                    <span className="text-gray-400">|</span>
                    <span className="text-purple-300">Outsider: <b className="text-white">{event.feeOutside}</b></span>
                  </div>
                </div>

                <Link
                  to={`/enroll/${event.id}`}
                  className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white hover:brightness-110 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex items-center gap-2"
                >
                  <FaTicketAlt className="w-4 h-4" />
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-black/40 border border-cyan-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 tracking-wide">
              About the Competition
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              {event.description}
            </p>
          </div>

          {/* Specific Rules */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-black/40 border border-cyan-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4 tracking-wide">
              Competition Rules & Format
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-gray-200">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <FaCheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Guidelines */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-black/40 border border-cyan-500/20">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 tracking-wide">
              General Guidelines
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {event.generalRules}
            </p>
          </div>

          {/* Rulebook & Final Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <a
              href={event.rulebook}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all"
            >
              <FaFilePdf className="w-4 h-4 text-red-400" />
              Download Official Rulebook (PDF)
            </a>

            <Link
              to={`/enroll/${event.id}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all text-center"
            >
              Proceed to Enrollment &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
