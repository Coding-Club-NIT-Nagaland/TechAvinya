import React, { useState } from 'react'; // Import useState
import { useParams, Link } from 'react-router-dom';
import eventdetail from '../assets/eventdetail.jpg'; 
import VantaNetBackground from '../components/VantaNetBackground';
const calculateTotalPrize = (prize1, prize2) => {
    const cleanPrize = (p) => parseInt(p.replace(/[^\d]/g, ''), 10) || 0;
    return `₹ ${(cleanPrize(prize1) + cleanPrize(prize2)).toLocaleString('en-IN')}/-`;
};

const allEventsData = [
  {
      id: "code", 
      title: "Code Raze",
      prize: "₹ 15,000/-",
      secondPrize: "₹ 7,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 250/-", 
      image: "/event/coding.webp",
      date: "31-10-2025",
      time: "9:30am-11:30am",
      venue: "smart lab or HackerRank platform",
      rulebook: "/rulebooks/code_raze.pdf",
      description: " Code Raze will feature a series of coding questions for participants to solve, testing their problem-solving abilities and programming skills across different levels of difficulty. Join us to tackle these challenges and enhance your coding expertise! ",
      rules: ["Participants must compete individually.", "The competition consists of a single round with multiple programming problems.", "The coding round will last 2 hours.", "All submissions must be made before the deadline.","Participants may use any programming language of their choice.","Plagiarism, AI-generated or copied solutions, cheating, or collaboration will result in immediate disqualification.","Each question will be assigned a specific weight, contributing to the overall score."],
      generalRules: "Open to all college students and independent coders. Use of external tools is restricted. Plagiarism will result in immediate disqualification.You can join the WhatsApp group: https://chat.whatsapp.com/H3kwXg5VWa6BGWsHEXIuLp?mode=wwt"
    },
    {
      id: "digital",
      title: "Digital Art",
      prize: "₹ 7,000/-",
      secondPrize: "₹ 3,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 250/-", 
      image: "/event/art.webp",
      date: "31-10-2025",
      time: "9:00am-12:00pm",
      venue: "vch",
      rulebook: "/rulebooks/digital_art.pdf",
      description: "The Digital Art Competition, organized by the Digital Art Club of NIT Nagaland, is a platform where creativity meets innovation. It is designed to encourage participants to push the boundaries of imagination and showcase their artistic vision through 2D digital mediums. Using tools such as Adobe Photoshop, Illustrator, Procreate, Krita, and drawing tablets, participants will bring their concepts to life with skill and originality. ",
      rules: [" Participation is individual; team entries are not allowed", "Participants must bring their own device.", "The duration of the competition is 3 hours; no extra time will be provided.","The theme is “Exploring the Metaverse” and artworks must strictly follow it. ","Each participant must create and submit an original artwork during the competition. ","Software allowed includes Adobe Photoshop, Illustrator, Procreate, Krita, or equivalent 2D digital art software."],
      generalRules: "The competition is open to all "
    },
    {
      id: "aerial",
      title: "Aerial Adrenaline",
      prize: "₹ 12,000/-",
      secondPrize: "₹ 7,000/-", 
      feeOutside: "₹ 500/-", 
      image: "/event/drone.webp",
      date: "31-10-2025",
      time: "11:00am-2:00pm",
      venue: "ground",
      rulebook: "/rulebooks/aerial.pdf",
      description: "A high-speed drone racing challenge that pushes the limits of piloting skills and custom drone engineering. Navigate complex courses against the clock.",
      rules: ["Drones must meet specified weight limits.", "Pilot must pass safety inspection.", "No FPV goggles allowed (line-of-sight only).", "All teams must complete a minimum of 3 laps."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "bug",
      title: "Bug Hunt",
      prize: "₹ 10,000/-",
      secondPrize: "₹ 5,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 250/-", 
      image: "/event/bughunt.webp",
      date: "31-10-2025",
      time: "2:00pm-4:00pm",
      venue: "smart lab",
      rulebook: "/rulebooks/bug_hunt.pdf",
      description: "Bug Hunt is a 2-hour debugging challenge where participants must fix buggy programs across multiple languages — C, Python, and Java. Each language folder contains a small multi-file project with syntax, logic, and case-based errors. Participants must debug all repositories to make the programs fully functional and pass all test cases. This event tests coding accuracy, logical thinking, and multi-language debugging skills under pressure.",
      rules: ["Duration: 2 hours (strict). ", "Participants will be given access to a main repository containing three(3) folders : /C ,/Python ,/Java ", "Each folder contains 1 buggy project with multiple interconnected files.", "Participants must try to debug all three projects completely within the given time. "],
      generalRules: "Open to all students with basic knowledge of programming. "
    },
    {
  id: "animation",
  title: "Animation",
  prize: "₹ 7,000/-",
  secondPrize: "₹ 4,000/-",
  feeNIT: "₹ 99/-",
  feeOutside: "₹ 300/-",
  image: "/event/animation.webp",
  date: "31-10-2025",
  time: "2:00pm-4:00pm",
  venue: "BCR 1",
  rulebook: "/rulebooks/animation.pdf",
  description:
    "The Animation Making Competition is a celebration of creativity, storytelling, and digital artistry. It provides a platform for aspiring animators, designers, and storytellers to bring their imagination to life through motion and visuals. Participants are challenged to combine artistic expression, technical skill, and innovative thinking to produce original animated works that captivate and inspire.",
  rules: [
    "All work must be done within the event time.",
    "No pre-made or AI-generated content.",
    "Software choice is FlipaClip, Clip Studio Paint, Procreate, Adobe Animate, or Blender (2D).",
    "Duration of the animation should be between 30 seconds – 2 minutes.",
    "Participants must present their animation using their own device (e.g., laptop, tablet, or phone) on the event day itself.",
    "No plagiarism – all work must be original.",
    "Submit in .mp4 or .mov format (1080p).",
    "Decision of judges is final."
  ],
  generalRules:
    "The competition is open to all registered participants. Participants may compete individually or in teams (maximum of 3–5 members per team)."
},
    {
     id: "bgmi",
    title: "BGMI",
    prize: "₹ 12,000/-",
    secondPrize: "₹ 8,000/-",
    feeNIT: "₹ 500/-", 
    feeOutside: "₹ 1000/-", 
    image: "/event/bgmi.webp", 
    date: "31-10-2025",
    time: "3:00pm-6:00pm",
    venue: "Classroom 1a",
    rulebook: "/rulebooks/BGMI Rules.pdf",
    description: "Battlegrounds Mobile India tournament. Standard competitive gaming rules apply. Compete for ultimate supremacy and cash prizes. You can join the WhatsApp group: https://chat.whatsapp.com/H3kwXg5VWa6BGWsHEXIuLp?mode=wwt",
    rules: [
      "Standard BGMI competitive rules.",
      "Cheating is grounds for instant ban.",
      "Teams must have a designated leader.",
      "Kindly refer Rule Book for Match Rules."
    ],
    generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
  },
    {
      id: "mlbb",
      title: "MLBB",
      prize: "₹ 12,000/-",
      secondPrize: "₹ 8,000/-",
      feeNIT: "₹ 500/-", 
      feeOutside: "₹ 1000/-", 
      image: "/event/mlbb.webp",
      date: "01-11-2025",
      time: "2:00pm-4:30pm",
      venue: "classroom 1b",
      rulebook: "/rulebooks/code_raze_rules.pdf",
      description: "Mobile Legends: Bang Bang competition. Team strategy and execution will be tested in a series of intense arena battles.",
      rules: ["Standard MLBB competitive rules.", "Drafting phase is mandatory.", "No player substitutions after the first match.", "Minimum rank requirement applies."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "free",
      title: "Free Fire",
      prize: "₹ 10,000/-",
      secondPrize: "₹ 7,000/-",
      feeNIT: "₹ 500/-", 
      feeOutside: "₹ 600/-", 
      image: "/event/freefire.webp",
      date: "01-11-2025",
      time: "9:00am-11:30am",
      venue: "classroom 1a",
      rulebook: "/rulebooks/freefire_rules.pdf",
      description: "Garena Free Fire tournament. Survival skills, quick reflexes, and teamwork are essential to secure the top spot.",
      rules: ["Standard Free Fire competitive rules.", "All decisions by the admin are final.", "Must use personal accounts.", "VPN usage is prohibited."],
      generalRules: "All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "modelling",
      title: "3D Modelling",
      prize: "₹ 5,000/-",
      secondPrize: "₹ 3,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 300/-", 
      image: "/event/3dmodelling.webp",
      date: "01-11-2025",
      time: "9:30am-12:00pm",
      venue: "smart lab",
      rulebook: "/rulebooks/3d_modelling.pdf",
      description: "3D Modelling is a competition that challenges participants to design and develop a threedimensional digital model using computer-aided design (CAD) or 3D modelling software. The event aims to test the participants’ creativity, innovation, and technical proficiency in visualizing and representing real-world or conceptual objects in 3D form.",
      rules: ["Participation is individual; team entries are not allowed ", "Participants must bring their own device.", "The duration of the competition is 3 hours; no extra time will be provided.", "Theme- Participants are free to create model of their own choice. ","Each participant must create and submit an original design during the competition. ","Software allowed includes Blender, Fusion 360, SolidWorks, AutoCAD, TinkerCAD, etc."],
      generalRules: "The competition is open to all"
    },
    {
      id: "clash",
      title: "Clash of Wheels",
      prize: "₹ 10,000/-",
      secondPrize: "₹ 6,000/-",
      feeNIT: "₹ 199/-", 
      feeOutside: "₹ 400/-", 
      image: "/event/clashofwheels.webp", 
      date: "01-11-2025",
      time: "10:30am-12:00pm",
      venue: "ground",
      rulebook: "/rulebooks/clash_of_wheels.pdf",
      description: "The ultimate robotics event: build and battle remote-controlled combat vehicles. Strategy and durable design are key to victory.",
      rules: ["Bot dimensions must not exceed X size.", "Bots must be powered by battery only.", "Structural modifications are allowed during the tournament.", "Safety gear must be worn." , "Kindly Share Your PPT/PDF to dev2025roboforge@gmail.com"],
      generalRules: "Note : Kindly Mention Your Bot Specifications followed by Your Team Members Name and Their Registartion Number (in case of NIT Nagaland Student) . All participants must be currently enrolled in an undergraduate or postgraduate program. Use of external tools is restricted. Plagiarism will result in immediate disqualification."
    },
    {
      id: "hackathon",
      title: "Hackathon",
      prize: "₹ 12,000/-",
      secondPrize: "₹ 7,000/-",
      feeNIT: "₹ 200/-", 
      feeOutside: "₹ 600/-", 
      image: "/event/hackathon.webp",
      date: "01-11-2025",
      time: "1:00pm-6:00pm",
      venue: "vch",
      rulebook: "/rulebooks/hackathon.pdf",
      description: "A 5-hour coding sprint where creativity meets technology! Participants form teams and build innovative solutions to real-world problems within a limited time. The event encourages problem-solving, teamwork, and technical skills under pressure. Projects will be judged on innovation, functionality, technical implementation, and presentation. ",
      rules: ["Teams must register before the event starts.", "Each team submits a team name and project idea/theme at the beginning.", "Total duration: 5 hours (strict) ", "Project must be built during the hackathon. ","Copy-paste from GitHub is discouraged—originality is important.","Use of open-source libraries, APIs, or pre-built tools is allowed. "],
      generalRules: "Open to all college students. Teams of 3–5 members (no solo entries)."
    },
    {
      id: "tech",
      title: "Tech Crisis",
      prize: "₹ 5,000/-",
      secondPrize: "₹ 3,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 300/-", 
      image: "/event/techcrisis.webp",
      date: "01-11-2025",
      time: "1:30pm-3:30pm",
      venue: "director hall",
      rulebook: "/rulebooks/tech_crisis.pdf",
      description: "Tech Crisis is an exciting technical case study competition that challenges participants to think analytically, work collaboratively, and devise solutions to real-world engineering and technology problems.",
      rules: ["Cross-institutional teams are not allowed - all team members must belong to the same institution. ","Participants may be from different departments or years within the same institution. ", "A participant can only be part of one team.", "Teams must register in advance under a unique team name."],
      generalRules: "he event is open to students of NIT Nagaland and other invited institutes. "
    },
    {
      id: "infinity",
      title: "Infinity Hunt",
      prize: "₹ 5,000/-",
      secondPrize: "₹ 3,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 300/-", 
      image: "/event/infinityhunt.webp",
      date: "01-11-2025",
      time: "3:30pm-5:30pm",
      venue: "classroom 1a",
      rulebook: "/rulebooks/infinity_hunt.pdf",
      description: "Infinity Hunt is the event which is conducted by RoboForge club ,NIT Nagaland.This  is the competition where participants have to solve integrals fastly  and accurately . It  is designed to test participant’s skills in solving integrals quickly and accurately. The event promotes mathematical thinking, problem-solving ability and speed under pressure.",
      rules: [" Each participant must register before the deadline. ", ".No use of mobile phones .pens are  allowed but no paper and notebook or any electronic devices is not allowed. ", ". Participants must solve problems within the allotted time. ", " Buzzing before the question is fully displayed is allowed but a wrong answer results in negative marking."," In case of ties, tie-breaker integrals will be given. ","The decision of the organizers will be final. "],
      generalRules: "Open to all college students."
    },
    {
      id: "stock",
      title: "Stock Rise",
      prize: "₹ 5,000/-",
      secondPrize: "₹ 3,000/-",
      feeNIT: "₹ 99/-", 
      feeOutside: "₹ 199/-", 
      image: "/event/stockrace.webp",
      date: "31-10-2025",
      time: "8:30am-9:00am",
      venue: "classroom 1a",
      rulebook: "/rulebooks/stock_rise.pdf",
      description: "Stock Rise is an individual stock market simulation where participants experience real-time trading in a risk-free virtual environment. Using a pre-announced stock simulation app, participants will analyse market trends, execute trades, and aim to maximize their virtual portfolio value within the designated trading window.",
      rules: ["Open to students from NIT Nagaland and other invited institutes.","This is an individual event — only one participant per team.", "Each participant must register in advance. ", "The simulation platform/app will be announced prior to the event."],
      generalRules: "Internet use is permitted only for accessing the simulation app. Any malpractice, plagiarism, or multiple accounts will result in disqualification. "
    },
];


export default function EventDetail() {
  const { eventId } = useParams(); 
  const event = allEventsData.find(e => e.id === eventId);
// The requested element is found.

    // 1. STATE for Tilt Effect on the Image
    const [tiltStyle, setTiltStyle] = useState({});

    // 2. TILT Effect Handlers
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        // The rotation angle is calculated based on the distance from the center
        const rotateX = (y / height - 0.5) * 26;
        const rotateY = (x / width - 0.5) * -26;
        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`, // Apply 3D transformation
            boxShadow: '0 25px 50px rgba(0, 255, 255, 0.4)', // Neon Shadow
            transition: 'transform 0.05s linear, box-shadow 0.05s linear',
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.5s cubic-bezier(.25,.8,.25,1), box-shadow 0.5s cubic-bezier(.25,.8,.25,1)', // Smooth transition back
        });
    };


  if (!event) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center  text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-500 font-anton animate-pulse">404 - Event Not Found 😥</h1>
        <p className="mt-4 text-xl"><Link to="/events" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors duration-300">Go back to Events</Link></p>
      </div>
   );
  }
    
    // Calculate total prize pool
    const totalPrize = calculateTotalPrize(event.prize, event.secondPrize);

  return (
    <div className="relative min-h-screen pt-32 pb-16 text-white overflow-hidden">
        {/* CSS for Side-to-Side Moving Title Effect */}
        

      <VantaNetBackground />
      
      {/* Dynamic Overlay for readability and depth */}
      <div className="fixed inset-0 z-[-1] "></div>

      {/* Main Content Container - Elevated above background */}
        <div className="relative z-10 max-w-4xl mx-auto px-6   rounded-lg p-8  border border-cyan-700/60 bg-gradient-to-br from-[#1a1a3a]/60 to-[#0a0a2a]/60">
        
        <Link 
          to="/events" 
          className="text-cyan-400 Gluten hover:text-cyan-200 hover:underline mb-8 flex items-center transition-colors duration-300 text-lg font-mono"
        >
          <svg className="w-5 h-5 mr-2 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to All Events
        </Link>
        {/* Event Title - Rocking/Shifting Effect */}
        <div className="text-center mb-4">
            <h1 className="text-5xl md:text-6xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking"
                        >
                {event.title}
            </h1>
        </div>
        
        {/* Total Prize Pool (Static) */}
        <div className="p-3 mb-8 mt-8  rounded-lg border-l-4 border-yellow-500 flex justify-between items-center">
            <p className="text-xl uppercase tracking-widest font-bold text-yellow-300 Graduate mb-1">Total Prize Pool : {totalPrize}</p>
            
        </div>


      {/* Image Display Area (WITH TILT HOVER EFFECT) */}
        <div 
            className="mx-auto w-full md:w-3/4 lg:w-1/2 mb-8 relative overflow-hidden rounded-xl 
                       transform transition-all duration-500 ease-out"
            style={tiltStyle} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave} 
            >
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-auto object-cover 
                shadow-2xl shadow-blue-500/20 border border-blue-700/50" 
            />
          </div>

        {/* PRIZE DISTRIBUTION (BELOW IMAGE) */}
        <section className="mb-10 p-4 rounded-lg Graduate">
            <h2 className="text-2xl font-bold mb-4 text-green-400 font-anton  text-center">Prize Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1st Prize */}
                <div className="p-3  rounded-lg border-l-4 border-yellow-500 flex justify-between items-center">
                    <p className="text-lg uppercase tracking-wider text-yellow-300 ">🏆 1st Prize</p>
                    <p className="text-xl font-bold text-yellow-400 ">{event.prize}</p>
                </div>

                {/* 2nd Prize */}
                <div className="p-3  rounded-lg border-l-4 border-gray-400 flex justify-between items-center">
                    <p className="text-lg uppercase tracking-wider text-gray-300">🥈 2nd Prize</p>
                    <p className="text-xl font-bold text-gray-40 ">{event.secondPrize || 'N/A'}</p>
                </div>
            </div>
        </section>

        <hr className="border-cyan-700/50 my-8"/>

        {/* Description */}
        <section className="mb-8 p-4  rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">About the Competition</h2>
          <p className="text-lg text-gray-200 font-light leading-relaxed Gluten">{event.description}</p>
        </section>

        <hr className="border-cyan-700/50 my-8"/>

        {/* Rules */}
        <section className="mb-8 p-4 rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">Specific Rules</h2>
          <ul className="list-disc list-inside text-lg text-gray-200 ml-4 space-y-2">
            {event.rules.map((rule, index) => (
              <li key={index} className="flex items-start before:content-['\2022'] before:text-cyan-400 before:mr-2 Gluten">{rule}</li>
            ))}
          </ul>
        </section>

        <hr className="border-cyan-700/50 my-8"/>

        {/* General Rules */}
        <section className="p-4 rounded-lg ">
          <h2 className="text-3xl font-bold mb-3 text-cyan-400 font-anton text-shadow-sm-cyan Graduate">General Guidelines</h2>
          <p className="text-lg text-gray-200 border-l-4 Gluten border-cyan-500 pl-4  p-3 rounded-lg font-light leading-relaxed">
            {event.generalRules}
          </p>
        </section>
        <div className="p-4  rounded-lg border-l-4 border-pink-500 flex gap-8 items-center mt-4 ml-4 Graduate">
                    <p className="text-lg uppercase font-bold tracking-wider text-pink-500 ">Event Date : </p>
                    <p className="text-xl font-bold text-pink-500 ">{event.date}</p>
        </div>
        <div className="p-4  rounded-lg border-l-4 border-teal-500 flex gap-8 items-center mt-4 ml-4 Graduate">
                    <p className="text-lg uppercase font-bold tracking-wider text-teal-300 ">Event Time : </p>
                    <p className="text-xl font-bold text-teal-400 ">{event.time}</p>
         </div>
         <div className="p-4  rounded-lg border-l-4 border-orange-500 flex gap-8 items-center mt-4 ml-4 Graduate">
                    <p className="text-lg uppercase font-bold tracking-wider text-orange-400 ">Event Venue   : </p>
                    <p className="text-xl font-bold text-orange-400 ">{event.venue}</p>
        </div>
        {/* ENTRY FEE SECTION (BELOW GENERAL GUIDELINES) */}
        <section className="mt-8 p-4 rounded-lg Graduate ">
            <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">Registration Fees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* NIT Nagaland Fee */}
                <div className="p-3  rounded-lg border-l-4 border-cyan-500 flex justify-between items-center">
                    <p className="text-lg uppercase tracking-wider text-cyan-300 ">NIT Nagaland student</p>
                    <p className="text-xl font-bold text-cyan-400 ">{event.feeNIT || 'Free'}</p>
                </div>

                {/* Outside Nagaland Fee */}
                <div className="p-3  rounded-lg border-l-4 border-purple-500 flex justify-between items-center">
                    <p className="text-lg uppercase tracking-wider text-purple-300 Graduate">Outside Student</p>
                    <p className="text-xl font-bold text-purple-400 ">{event.feeOutside || 'Free'}</p>
                </div>
            </div>
            <div className=' mt-8 p-3  rounded-lg border-l-4 border-cyan-500 flex  items-center text-lg '>Download Rulebook : 
                      <a
                            href={event.rulebook} // Use the specific path from data
                            download 
                            className="inline-flex items-center justify-center px-6 py-3 text-cyan-400 cursor-pointer"
                        >
                          click here  
                        </a>
              </div>
            <div className="flex justify-center mt-8 gap-8">
              
          <a
              href="https://www.coding-club-nitn.tech/events"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group py-3 px-8 Graduate text-lg font-semibold uppercase tracking-widest rounded-lg overflow-hidden
                         bg-gradient-to-br from-red-800/60 to-pink-800/60 border border-red-600 text-red-300 backdrop-blur-sm
                         transition-all duration-500 ease-in-out
                         hover:from-red-600/70 hover:to-pink-600/70 hover:text-white hover:border-red-400
                         hover:shadow-lg hover:shadow-red-500/40
                         active:scale-95 active:shadow-sm"
            >
              Apply to Coding Club
            </a>
        </div>
        </section>
        
    </div>
    </div>
  );
}
