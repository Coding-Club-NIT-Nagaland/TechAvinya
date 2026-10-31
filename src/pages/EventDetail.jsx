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
    club: "Codessey Club, NIT Nagaland",
    category: "Competitive Programming & DSA",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 5,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)*",
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 299/-",
    image: "/event/CODE RAZE.jpeg",
    date: "5 November 2026",
    time: "9:00am - 11:00am",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/code_raze.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "Code Raze is a 2-hour flagship competitive programming challenge organized by Codessey Club focusing on Data Structures and Algorithms (DSA). Participants are tasked with solving a rigorous set of algorithmic problems under intense time constraints. The participant who successfully solves the required problems in the shortest time will be awarded the winning position, subject to evaluation criteria.",
    rules: [
      "Individual participation only; no teams permitted.",
      "Total contest duration is strictly 2 hours on the official online judging environment.",
      "The use of Artificial Intelligence (AI), AI agents, ChatGPT, Copilot, or any AI-based tool in any form is STRICTLY PROHIBITED. Instant disqualification for violations.",
      "Participants may use official programming documentation and language references strictly for syntax checking.",
      "Supported programming languages: C, C++, Java, and Python.",
      "Participants cannot leave the designated venue during the event. No extra time provided.",
      "The time taken to successfully solve the problems will be a primary ranking factor along with correctness."
    ],
    generalRules: "Minimum participation requirement: At least 20 participants. *Condition for Female-Only 3rd Prize (₹3,000): Awarded only if there are at least 6 female participants in the event and the candidate is female. Decision of the organizers and judging panel shall be final."
  },
  {
    id: "hackathon",
    title: "Hackathon",
    club: "Codessey Club, NIT Nagaland",
    category: "Software Development & Prototyping",
    totalPrize: "₹ 22,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 7,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)*",
    feeNIT: "₹ 199/- (Per Team)",
    feeOutside: "₹ 499/- (Per Team)",
    image: "/event/HACKATHON.jpeg",
    date: "6 November 2026",
    time: "11:00am - 6:00pm",
    venue: "VCH (Virtual Class Hall), NIT Nagaland",
    rulebook: "/rulebooks/hackathon.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "The Hackathon is a 30-hour team-based software development competition where participants are presented with real-world problem statements and must build, present, and demonstrate a functional prototype. Teams can develop their projects remotely from any location, while the final 2–3 hours are reserved for on-site presentations and demonstrations. Each team must also prepare a six-slide presentation (PPT) explaining their approach, implementation, and solution to the judging panel.",
    rules: [

    "Team event consisting of 3 to 5 members.",

    "Duration: 30 hours (5 November, 10:00 AM – 6 November, 4:00 PM).",

    "Participants may develop projects remotely from any location.",

    "Final 2–3 hours reserved for on-site presentations and demonstrations.",

    "All team members must be present at the venue during their team's presentation.",

    "Every team must demonstrate a working prototype or functional solution.",

    "Each team must prepare a mandatory six-slide PPT.",

    "AI, AI agents, and all AI-based tools are STRICTLY PROHIBITED throughout the event. Violations will result in immediate disqualification.",

    "Official documentation and library references are permitted.",

    "Problem statements and important updates will be shared through the official WhatsApp group."
    ],
    generalRules: "Minimum participation requirement: At least 20 participants. Condition for Female-Only 3rd Prize (₹3,000): Awarded only if there are at least 6 female participants and the winning team consists exclusively of female members. Teams must provide an active WhatsApp number during registration. Approved teams will be added to the official WhatsApp group for updates and problem statements."
  },
  {
    id: "modelling",
    title: "Genesis 3D",
    club: "Codessey Club, NIT Nagaland",
    category: "3D Modelling & Simulation",
    totalPrize: "₹ 20,000/-",
    firstPrize: "₹ 12,000/-",
    secondPrize: "₹ 5,000/-",
    thirdPrize: "₹ 3,000/- (Female Only)*",
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 299/-",
    image: "/event/GENESIS 3D.jpeg",
    date: "5 November 2026",
    time: "2:00pm - 6:00pm",
    venue: "VCH (Virtual Class Hall), NIT Nagaland",
    rulebook: "/rulebooks/genesis_3d.pdf",
    contacts: ["9233957278", "9534342082"],
    description: "Genesis 3D is a 4-hour individual or team-based 3D modeling and simulation event. Participants are given a theme/problem brief at the start and must design, model, texture, and simulate a 3D object, scene, or system from scratch using software of their choice. Each team must prepare a short 3 to 4 slide presentation explaining their design approach, tools used, and simulation physics/behavior demonstrated before the judges.",
    rules: [
      "Team size: 1 to 3 members.",
      "Duration: 4 hours strictly for modeling, simulation, and slide preparation.",
      "Software permitted: Blender, Autodesk Maya, AutoCAD, SolidWorks, Unity, 3ds Max, or equivalent 3D packages.",
      "The use of AI, AI agents, or AI-based generative tools for creating or auto-generating 3D models, textures, or simulations is STRICTLY PROHIBITED. Instant disqualification.",
      "No pre-made assets, downloaded templates, or third-party models sourced from online stores allowed; all assets must be built natively from scratch during the event.",
      "Teams must prepare a 3 to 4 slide PPT detailing design approach, tools used, and simulation logic.",
      "Participants must bring their own laptops with software pre-installed; organizers are not responsible for installation issues."
    ],
    generalRules: "Minimum participation requirement: At least 20 participants. *Condition for Female-Only 3rd Prize (₹3,000): Awarded only if there are at least 6 female participants and the team consists exclusively of female members. Evaluation is based on creativity, technical accuracy, complexity, theme adherence, and presentation."
  },
  {
    id: "aerial",
    title: "Hardware Hackathon",
    club: "Robotics Club, NIT Nagaland",
    category: "Hardware & Electronics (Think. Solve. Build.)",
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
    rulebook: "/rulebooks/hardware_hackathon.pdf",
    contacts: ["8119028697", "8708676451"],
    description: "Hardware Hustle: 'Think. Solve. Build.' is the flagship hardware engineering competition organized by Robotics Club NIT Nagaland. It is designed to test participants' electronics knowledge, circuit design, embedded troubleshooting, teamwork, and practical hardware implementation across three competitive rounds.",
    rules: [
      "Team size: 1 to 2 members. (Round 1 is conducted individually; Rounds 2 & 3 allow solo or 2-member teams).",
      "Round 1 — Quiz: Individual technical assessment covering basic engineering, circuit theory, and electronics concepts.",
      "Round 2 — Design Challenge: Formulate and submit technical solutions to real-life problem statements evaluated on feasibility, viability, and novelty.",
      "Round 3 — Build Arena: Build, test, and demonstrate hardware solutions using authorized electronic components.",
      "Plagiarism, unauthorized external assistance, and collaboration between competing teams are strictly prohibited.",
      "Only authorized components, tools, and resources may be utilized in the Build Arena; no circuit modifications permitted after the deadline."
    ],
    generalRules: "Participants must carry institute ID cards and report punctually. Lab safety protocols must be followed strictly. Rules can be updated on-spot by event secretaries and judges if necessary."
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
    date: "5 November 2026",
    time: "9:00am - 11:00am",
    venue: "NITN Football Ground",
    rulebook: "/rulebooks/robo_track.pdf",
    contacts: ["8119028697", "8708676451"],
    description: "Robo Track Challenge is an intense RC car obstacle-course competition organized by Robotics Club NIT Nagaland. Participants pilot custom remote-controlled vehicles across challenging track geometry, ramps, and obstacle sequences within the allotted time limit.",
    rules: [
      "Team size: 1 to 5 members. Each participant or team may register exactly one RC car.",
      "RC Car Specifications: Car width must be approximately 30 cm; height and length are unrestricted. Track width will be 35 cm.",
      "CUSTOM BUILT ONLY: The RC car must be designed and built by the participant/team. Ready-made commercial RC cars are strictly banned and cause instant disqualification.",
      "Power & Safety: Car must be remotely controlled, DC battery powered, and safe to operate under official inspection.",
      "Track Rules & Penalties: Touching or crossing track boundaries, touching/manually repositioning the car, or skipping obstacles incurs penalty points.",
      "RC Car Viva: Participants must attend a technical viva covering component selection, motor torque, circuitry, and chassis fabrication.",
      "Scoring: Final rankings determined by course completion time combined with penalty points. Fewer penalty points break ties."
    ],
    generalRules: "Participants must bring their RC cars assembled and ready for technical inspection 30 minutes before the heats commence. Judges' decisions on runs and viva are final."
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
    venue: "Rooms 2A & 2B, NIT Nagaland",
    rulebook: "/rulebooks/bgmi.pdf",
    contacts: ["9279716769", "9362619196"],
    description: "The official BGMI Esports Tournament of Tech Avinya 2026! Squads battle across classic Battle Royale maps under official competitive scoring for supreme collegiate gaming glory.",
    rules: [
      "Squad format: Exactly 4 players per squad. Physical presence of every player at the venue is MANDATORY (no remote play).",
      "Official Maps: Classic Battle Royale mode rotated across three maps in order: 1. Rondo, 2. Erangel, 3. Miramar.",
      "Kill Points: 1 point per kill.",
      "Placement Points: 1st Place (Chicken Dinner) = 10 pts, 2nd = 8 pts, 3rd = 6 pts, 4th = 4 pts, 5th = 2 pts, 6th = 1 pt, 7th = 1 pt.",
      "MVP Bonus: Most Kills in a Match = 2 bonus points.",
      "Calculation: Match Score = (Total Kills x 1) + Placement Points + MVP Bonus. Standings calculated by summing points across all matches.",
      "Hardware restrictions: Personal smartphones only; tablets, iPads, emulators, triggers, macros, and third-party software are strictly banned.",
      "Zero Tolerance: Cheating, collusion, stream sniping, or smurfing results in immediate disqualification and a PERMANENT BAN from all future events."
    ],
    generalRules: "Teams must report at least 15 minutes before their scheduled match time. Bring personal phones, accessories, and chargers."
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
    venue: "Rooms 2A & 2B, NIT Nagaland",
    rulebook: "/rulebooks/freefire.pdf",
    contacts: ["9279716769", "9362619196"],
    description: "The official Free Fire Esports Tournament at Tech Avinya 2026! Drop into tactical battlegrounds, out-survive hostile squads, and secure the glorious Booyah.",
    rules: [
      "Squad format: Exactly 4 players per squad. Physical presence of all members at the venue is mandatory.",
      "Official Maps: Battle Royale mode rotated across three maps: Bermuda, Kalahari, and Purgatory.",
      "Kill Points: 1 point per kill.",
      "Placement Points: 1st Place (Booyah) = 10 pts, 2nd = 8 pts, 3rd = 6 pts, 4th = 4 pts, 5th = 2 pts, 6th = 1 pt, 7th = 1 pt.",
      "MVP Bonus: Most Kills in a Match (MVP Team) = 2 bonus points.",
      "Calculation: Match Score = (Total Kills x 1) + Placement Points + MVP Bonus. Final standing is cumulative across all matches played.",
      "Hardware: Personal smartphones only; emulators, hacks, script mods, macros, or external triggers are strictly banned.",
      "Zero Tolerance Policy: Any malicious practice or teaming up with rival squads will face immediate disqualification and permanent ban."
    ],
    generalRules: "Squads must report 15 minutes before the custom lobby opens. Roster changes after registration must be approved in advance."
  },
  {
    id: "mlbb",
    title: "MLBB (Community Heroes)",
    club: "Esports Arena, NIT Nagaland",
    category: "5v5 MOBA Arena",
    totalPrize: "₹ 30,000 + 10K Diamonds",
    firstPrize: "₹ 20,000 + 5,000 Diamonds",
    secondPrize: "₹ 10,000 + 5,000 Diamonds",
    thirdPrize: "Crowd In-game Diamonds Giveaway!",
    feeNIT: "₹ 199/- (Per Team)",
    feeOutside: "₹ 500/- (Per Team)",
    image: "/event/MLBB.jpeg",
    date: "6 November 2026",
    time: "2:00pm - 6:00pm",
    venue: "Campus Esports Arena / Main Stage, NIT Nagaland",
    rulebook: "/rulebooks/mlbb.pdf",
    contacts: ["9362619196", "9279716769"],
    description: "Official Mobile Legends: Bang Bang Tournament organized under Tech Avinya! Features a hybrid model with online qualifiers up to Quarter-Finals, followed by the top 4 squads clashing live on-stage at NIT Nagaland in the Semi-Finals and Grand Finals with crowd diamond giveaways.",
    rules: [
      "Roster Structure: Exactly 5 active starter players + up to 1 registered substitute.",
      "Game Mode: Custom Lobby — Draft Pick (5v5 Modern Custom Mode) on Imperial Sanctuary map.",
      "Hybrid Stage Structure: Online Qualifiers for preliminary rounds; Top 4 squads advance to offline LAN finals on campus on 6 November (2:00 PM - 6:00 PM IST).",
      "Critical Baseline Threshold: Strict minimum of four (4) fully registered and checked-in teams required for tournament execution.",
      "Punctuality & Check-In: Teams must report to match hosts exactly 10 minutes prior to match start; failure to report on time results in immediate match forfeit.",
      "In-Game Pause: Maximum two (2) pauses per team per match for verified critical technical/device failures only.",
      "Conduct & Anti-Cheat: No trash-talking in All-Chat, emote/recall toxic spamming, account sharing (piloting), or third-party radar/skin scripts. Violators receive permanent bans."
    ],
    generalRules: "Substitute swaps are permitted only between games in a series, never during active hero draft. Live audience diamond giveaways conducted during matches."
  },
  {
    id: "digital",
    title: "Integration Bee",
    club: "Quants Club, NIT Nagaland",
    category: "Calculus & Analytical Mathematics",
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
    rulebook: "/rulebooks/integration_bee.pdf",
    contacts: ["7005437886", "9341240119"],
    description: "The Integration Bee challenges students to master integral calculus through speed, precision, and pure mental agility. Competing under tight time limits without calculators, participants sharpen their problem-solving skills and prove their mathematical prowess in a high-stakes arena.",
    rules: [
      "Individual competition open to all undergraduate and postgraduate students.",
      "Maximum of 3 progressive rounds with announced fixed time limits.",
      "No communication between participants permitted during competition rounds.",
      "Calculators, mobile phones, or reference cheat sheets are strictly prohibited; only pens, pencils, and provided answer sheets can be used.",
      "Scoring: Correct answers receive full marks; negative marking applies for incorrect attempts/responses.",
      "Partial marks awarded for long-form problems where mathematical evaluation steps are correct.",
      "Tie-Breaker: In case of a tie, additional sudden-death integration problems will be assigned."
    ],
    generalRules: "Calculators and smart watches are strictly prohibited. Decision of the Quants Club coordinators is final."
  },
  {
    id: "infinity",
    title: "Quants Challenge",
    club: "Quants Club, NIT Nagaland",
    category: "Quantitative Aptitude & Financial Modeling",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/- + Official Trophy",
    secondPrize: "₹ 4,000/- + Official Trophy",
    thirdPrize: "Merit Certificates for Top Teams",
    feeNIT: "₹ 70/-",
    feeOutside: "₹ 129/-",
    image: "/event/QUANTS CHALLENGE.jpeg",
    date: "5 November 2026",
    time: "11:00am - 2:00pm (~3 Hours)",
    venue: "VCH (Virtual Class Hall), NIT Nagaland",
    rulebook: "/rulebooks/quants_challenge.pdf",
    contacts: ["7005437886", "9341240119"],
    description: "The Quant Challenge tests numerical agility, statistical thinking, logical deduction, and financial problem-solving. Structured as 4 progressive elimination rounds leading to a real-world quantitative case study pitch.",
    rules: [
      "Team Size: Individual or Teams of up to 2 members.",
      "Round 1 — Speed Math & Aptitude (Elimination): 25 MCQs, 20 Minutes, OMR (+4 for correct, -1 for incorrect).",
      "Round 2 — Probability & Stats Sprint (Elimination): 15 Numerical Questions, 25 Minutes (+4 correct, 0 for incorrect; non-programmable scientific calculators permitted).",
      "Round 3 — Logical & Quantitative Reasoning: 5 Critical Problems, 30 Minutes (10 marks each, partial credit for valid approach).",
      "Round 4 — The Real-World Quant Case (Finals): Comprehensive case study on practical portfolio optimization and risk allocation (40 mins preparation + 5 mins pitch presentation; laptops permitted).",
      "Zero Tolerance Policy: Unauthorized materials or mobile device usage in Rounds 1–3 results in immediate disqualification.",
      "Tie-Breakers: Fewer incorrect answers in earlier rounds advances; if still tied, a 5-minute sudden-death problem decides the winner."
    ],
    generalRules: "Merit certificates awarded to Top 2 teams. Rough paper pads and stationery provided by Quants Club invigilators."
  },
  {
    id: "tech",
    title: "Tech Crisis",
    club: "E-Cell, NIT Nagaland",
    category: "Technical Case Study & Crisis Management",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 129/-",
    feeOutside: "₹ 349/-",
    image: "/event/TECH CRISIS.jpeg",
    date: "6 November 2026",
    time: "1:30pm - 3:30pm",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/tech_crisis.pdf",
    contacts: ["6003801527", "8545869601"],
    description: "Tech Crisis is an exciting technical case study competition organized by E-Cell NIT Nagaland that challenges participants to think analytically, work collaboratively, and devise solutions to real-world engineering and technology problems. Participants are provided with a technical crisis scenario and must analyze the situation, identify core issues, and develop a feasible, innovative, and technically strong solution within the given time frame.",
    rules: [
      "Team Formation: Each team must consist of up to 3 participants (solo participation is allowed).",
      "Eligibility: Open to students of NIT Nagaland and other invited institutes. Cross-institutional teams are not allowed (all members must belong to the same institution).",
      "Phase 1 — Case Analysis (1:30 PM – 2:30 PM): Teams receive a technical case study describing a real-world or hypothetical problem and prepare a written or slide-based solution within the time limit.",
      "Phase 2 — Presentation Round (2:30 PM – 3:30 PM): Teams present their proposed solution before a panel of judges (5–7 minutes presentation followed by 2 minutes of Q&A).",
      "Time & Submission: Teams must submit their presentation or report within the allotted analysis time. Late submissions will not be accepted.",
      "Judging Criteria: Problem Understanding, Innovation & Creativity, Technical Feasibility, and Presentation & Communication.",
      "Plagiarism or copied solutions will lead to immediate disqualification. Judges' and organizers' decisions are final and binding."
    ],
    generalRules: "A participant can only be part of one team. Teams must register in advance under a unique team name. Participants must maintain professional behavior and respect event decorum."
  },
  {
    id: "stock",
    title: "Stock Race",
    club: "E-Cell, NIT Nagaland",
    category: "Stock Market Simulation & Virtual Trading",
    totalPrize: "₹ 10,000/-",
    firstPrize: "₹ 6,000/-",
    secondPrize: "₹ 4,000/-",
    thirdPrize: null,
    feeNIT: "₹ 99/-",
    feeOutside: "₹ 149/-",
    image: "/event/STOCK RAZE.jpeg",
    date: "6 November 2026",
    time: "9:00am - 4:00pm",
    venue: "Smart Lab, NIT Nagaland",
    rulebook: "/rulebooks/stock_race.pdf",
    contacts: ["6003801527", "8545869601"],
    description: "Stock Race is a premier stock market simulation competition organized by E-Cell NIT Nagaland where participants trade virtual portfolios over the course of the event. Each participant receives a fixed virtual amount to trade with and competes to grow it into the highest portfolio value by the end of the event.",
    rules: [
      "Individual participation only (solo traders).",
      "Participation & Virtual Amount: Each participant gets a fixed virtual amount to begin trading with. All trades are conducted using this virtual amount only — no real money is involved.",
      "Company List: The list of companies/stocks available for trading will be shared in the official event WhatsApp group. Participants should only trade in the companies announced on the shared list.",
      "Trading Hours: Trading time is from 9:00 AM to 4:00 PM daily. Participants can buy or sell stocks at any time within these trading hours.",
      "Winning Criteria: The winner is the participant with the highest portfolio value at the end of the event.",
      "Fair Play: No fake trades or manipulation of any kind is allowed. Any participant found manipulating trades or data will be disqualified.",
      "Judges' and organizers' decisions are final and binding."
    ],
    generalRules: "Participants must join the official event WhatsApp group to receive company rosters and trading credentials. High-speed internet connection is required."
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
