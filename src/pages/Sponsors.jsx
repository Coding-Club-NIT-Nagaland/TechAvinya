import React, { useState, useEffect, useRef } from 'react';
import { FaHandsHelping } from 'react-icons/fa'; 
import sponsorVideo from '../assets/sponsors.jpg'; 
import VantaWavesBackground from '../components/VantaWavesBackground'; 



// --- Consolidated Sponsor Data ---
const allSponsors = [
  { id: 1, name: "GeeksForGeeks", logo: "/gfg.png",  description: "Title Sponsor" },
  { id: 2, name: "NIELIT Kohima", logo: "/nielit.png",  description: "Hackathon Sponsor" },
  { id: 3, name: "Fingerprint", logo: "/fingerprint.png",  description: "Printing Partner" },
  { id: 4, name: "Instudia", logo: "/instudia.png", description: "CodeRaze Partner"},
  { id: 5, name: "Nagabot", logo: "/nagabot.jpeg",  description: "RoboForge Partner"},
  
];

export default function Sponsors() {
  const [tiltStyle, setTiltStyle] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const elementRefs = useRef([]);
  const contactEmail = 'techavi@nitnagaland.ac.in';

  // --- INTERSECTION OBSERVER LOGIC for Scroll Animation ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    elementRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      elementRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [allSponsors]);
  // --------------------------------------------------------

  // --- Dynamic Tilt Logic (THE HOVER EFFECT) ---
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Rotation logic (20 degrees tilt)
    const rotateX = (y / height - 0.5) * 26; 
    const rotateY = (x / width - 0.5) * -26; 
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        // FAST TRANSITION: For cursor follow (0.05s)
        transition: 'transform 0.05s linear, box-shadow 0.05s linear', 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
        boxShadow: '0 15px 30px rgba(0, 255, 255, 0.5)', // Neon glow
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        // SLOW TRANSITION: For smooth snap-back (0.3s)
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out', 
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', // Subtle default shadow
      }
    }));
  };
  // ------------------------------------------

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <VantaWavesBackground />
      {/* Background Setup (Video/Pattern) */}
      {/* <img
        className="fixed inset-0 w-screen h-screen object-cover z-0"
        src={sponsorVideo}
      />
       */}
      <div className="fixed inset-0 z-0 "></div>
      
      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full pt-28 pb-16 flex flex-col items-center text-center px-4">
        
        <h1 className="text-5xl md:text-7xl font-extrabold Graduate text-white mb-4 tracking-tight glitch-effect uppercase title-glow">
          <span className="text-cyan-400">OUR</span> SPONSORS
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl leading-relaxed Gluten">
          We are immensely grateful for the unwavering support of the visionary organizations that drive technical excellence at <span className="text-cyan-300">NIT Nagaland</span>.
        </p>

        {/* Unified Partners Grid (UNIFORM SIZE) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl w-full px-4">
          {allSponsors.map((sponsor, index) => {
            const isDarkLogo = ["GitHub", "Microsoft", "TCS", "IBM", "Intel", "AMD"].includes(sponsor.name);
            const delay = index * 0.08; // Staggered delay for scroll animation

            // Calculate base style for scroll-in animation
            const baseStyle = {
                // This transition property is needed for the staggered scroll-in effect
                transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s, box-shadow 0.7s ease-out ${delay}s`,
                opacity: isVisible[sponsor.id] ? 1 : 0,
                transform: isVisible[sponsor.id] ? 'scale(1)' : 'scale(0.8) translateY(50px)',
            };

            return (
              <div
                key={sponsor.id}
                ref={el => elementRefs.current[index] = el}
                data-id={sponsor.id}
                rel="noopener noreferrer"
                
                // Dynamic Tilt Handlers
                onMouseMove={(e) => handleMouseMove(e, sponsor.id)}
                onMouseLeave={() => handleMouseLeave(sponsor.id)}

                // Style and Animation
                className={`col-span-1 
                          relative p-4 bg-gradient-to-br from-gray-900/70 to-gray-800/70 
                          border border-cyan-800/60 rounded-xl backdrop-blur-sm 
                          shadow-xl shadow-blue-900/30 group 
                          hover:border-cyan-500/80 hover:shadow-cyan-500/60 
                          cursor-pointer block aspect-[4/3] transform-gpu`} 
                
                style={{
                    // Apply base scroll-in style, then MERGE/OVERRIDE with dynamic tiltStyle
                    ...baseStyle,
                    ...tiltStyle[sponsor.id], 
                }}
              >
                {/* Background radial gradient for inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} Logo`}
                  className={`relative z-10 max-h-16 md:max-h-20 object-contain w-auto mx-auto 
                              ${isDarkLogo ? 'filter invert brightness-125' : ''} 
                              opacity-85 group-hover:opacity-100 transition-all duration-300 ease-in-out`}
                />
                <span className="relative z-10 block text-sm md:text-md font-semibold text-gray-300 mt-2 group-hover:text-cyan-300 transition-colors duration-300 ease-in-out">
                  {sponsor.name}
                </span>
                <span className="relative z-10 block text-xs text-gray-500 group-hover:text-gray-400 mt-1 transition-colors duration-300 ease-in-out">
                  {sponsor.description}
                </span>
                {/* Dynamic glowing border is handled by box-shadow and border change */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                                group-hover:border-cyan-400/50 transition-colors duration-300 
                                shadow-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action for Future Sponsors */}
        <div
          className="mt-24 bg-gradient-to-br from-blue-900/70 to-purple-900/70 border border-purple-700/50 rounded-2xl p-8 max-w-3xl text-center shadow-2xl shadow-purple-900/40"
          // Removed framer-motion logic and replaced with simple classes
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 rokkitt">Become a Visionary Sponsor!</h3>
          <p className="text-lg text-gray-300 mb-6 Gluten">
            Sponsor with NIT Nagaland to empower bright young minds, enhance your brand's visibility, and contribute to cutting-edge tech education.
          </p>
          <a 
            href={`mailto:${contactEmail}`} // MAILTO LINK
            className="inline-flex items-center justify-center px-8 py-3 
                       bg-gradient-to-r from-teal-500 to-emerald-600 
                       text-white text-lg font-semibold rounded-full 
                       shadow-lg hover:shadow-teal-400/50 transform hover:scale-105 
                       transition-all duration-300 group Gluten"
          >
            Connect With Us <FaHandsHelping className="ml-3"/>
          </a>
        </div>

      </div>
    </div>
  );
}
