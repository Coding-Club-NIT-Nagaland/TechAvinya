import React, { useState } from 'react';
import backvideo from '../assets/universe.jpg';
import { Link } from 'react-router-dom';
import VantaWavesBackground from '../components/VantaWavesBackground'; 
export default function Events() {
  const eventData = [
    {
      id: "code",
      title: "Code Raze",
      prize: "₹ 22,000/-",
      image: "/event/coding.webp"  
    },
    {
      id: "digital",
      title: "Digital Art",
      prize: "₹ 10,000/-",
      image: "/event/art.webp"
    },
    {
      id: "aerial",
      title: "Aerial Adrenaline",
      prize: "₹ 19,000",
      image: "/event/drone.webp"
    },
    {
      id: "bug",
      title: "Bug Hunt",
      prize: "₹ 15,000/-",
      image: "/event/bughunt.webp"
    },
    {
      id: "animation",
      title: "Animation",
      prize: "₹ 11,000/-",
      image: "/event/animation.webp"
    },
    {
      id: "bgmi",
      title: "BGMI",
      prize: "₹ 20,000/-",
      image: "/event/bgmi.webp"
    },
    {
      id: "mlbb",
      title: "MLBB",
      prize: "₹ 20,000",
      image: "/event/mlbb.webp"
    },
    {
      id: "free",
      title: "Free Fire",
      prize: "₹ 17,000/-",
      image: "/event/freefire.webp"
    },
    {
      id: "modelling",
      title: "3D Modelling",
      prize: "₹ 8,000/-",
      image: "/event/3dmodelling.webp"
    },
    {
      id: "clash",
      title: "Clash of Wheels",
      prize: "₹ 16,000/-",
      image: "/event/clashofwheels.webp"
    },
    {
      id: "hackathon",
      title: "Hackathon",
      prize: "₹ 19,000/-",
      image: "/event/hackathon.webp"
    },
    {
      id: "tech",
      title: "Tech Crisis",
      prize: "₹ 8,000",
      image: "/event/techcrisis.webp"
    },
    {
      id: "infinity",
      title: "Infinity Hunt",
      prize: "₹ 8,000/-",
      image: "/event/infinityhunt.webp"
    },
    {
      id: "stock",
      title: "Stock Rise",
      prize: "₹ 8,000/-",
      image: "/event/stockrace.webp"
    },
    
  ];

  const [tiltStyle, setTiltStyle] = useState({});
  const showEvents = false;
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 26;
    const rotateY = (x / width - 0.5) * -26;
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
        boxShadow: '0 20px 40px rgba(0, 255, 255, 0.5)',
        transition: 'transform 0.05s linear, box-shadow 0.05s linear',
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }
    }));
  };

  return (
    <div className="relative w-full min-h-screen  text-white overflow-hidden">
      <VantaWavesBackground />
      <div className="fixed inset-0 z-0 "></div>

      <div className="relative z-10 w-full pt-20 pb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text text-white
                        text-shadow-neon-cyan title-rocking mb-8 mt-4">
          Events & Competitions
        </h1>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-8">
        {showEvents ? (
          eventData.map(event => (
            <div 
              key={event.id} 
              onMouseMove={(e) => handleMouseMove(e, event.id)}
              onMouseLeave={() => handleMouseLeave(event.id)}
              className="card-wrapper group relative w-[320px] h-[550px] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out mt-8 mb-8"
              style={{ ...tiltStyle[event.id] }} 
            >
              
              <div className="card-inner w-full h-full relative">
                
                <div className="card-face card-front w-full h-full bg-transparent">
                  <div className="w-full h-[77%] overflow-hidden flex-shrink-0">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>

                  <div className="flex flex-col justify-start items-center p-1 w-full h-[35%] ">
                    <h3 className="text-xl font-semibold text-white mb-2 Graduate">
                      {event.title}
                    </h3>

                    <div className="bg-blue-800/60 self-center w-fit px-4 py-1 rounded-full text-md font-bold text-white mb-2 shadow-md border border-blue-600 Gluten">
                      Prize Pool : {event.prize}
                    </div>

                    <div className="flex justify-between w-full space-x-3">
                      <Link
                        to={`/events/${event.id}`} 
                        className="relative group w-1/2 text-center rounded-lg py-2 px-3 text-sm font-semibold uppercase tracking-widest overflow-hidden
                                  bg-gradient-to-br Gluten from-cyan-900/40 to-blue-900/40 border border-cyan-700/60 text-cyan-300 backdrop-blur-sm
                                  transition-all duration-500 ease-in-out
                                  hover:from-cyan-700/60 hover:to-blue-700/60 hover:text-white hover:border-cyan-400
                                  hover:shadow-lg hover:shadow-cyan-500/40
                                  active:scale-95 active:shadow-sm"
                      >
                        Explore
                      </Link>

                      <a
                        href="https://www.coding-club-nitn.tech/events"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apply to Coding Club - ${event.title}`}
                        className="relative group w-1/2 text-center rounded-lg py-2 px-3 text-sm font-semibold uppercase tracking-widest overflow-hidden
                                  bg-gradient-to-br Gluten from-red-900/40 to-pink-900/40 border border-red-700/60 text-red-300 backdrop-blur-sm
                                  transition-all duration-500 ease-in-out
                                  hover:from-red-700/60 hover:to-pink-700/60 hover:text-white hover:border-red-400
                                  hover:shadow-lg hover:shadow-red-500/40
                                  active:scale-95 active:shadow-sm"
                      >
                        Apply
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-face card-back w-full h-full bg-gradient-to-br from-[#061026]/80 to-[#091220]/80 text-white p-6 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-bold mb-4 Graduate">{event.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">Prize Pool: {event.prize}</p>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Link
                      to={`/events/${event.id}`}
                      className="w-full text-center rounded-lg py-2 px-3 text-sm font-semibold uppercase tracking-widest
                                bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-700/60 text-cyan-300 backdrop-blur-sm
                                hover:from-cyan-700/60 hover:to-blue-700/60 hover:text-white"
                    >
                      Explore
                    </Link>

                    <a
                      href="https://www.coding-club-nitn.tech/events"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Apply to Coding Club - ${event.title}`}
                      className="w-full text-center rounded-lg py-2 px-3 text-sm font-semibold uppercase tracking-widest
                                bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-red-700/60 text-red-300 backdrop-blur-sm
                                hover:from-red-700/60 hover:to-pink-700/60 hover:text-white"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              </div>

              <style>{`
                .card-wrapper { perspective: 1200px; }
                .card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(.2,.8,.2,1); transform-style: preserve-3d; }
                .card-wrapper:hover .card-inner { transform: rotateY(180deg); }
                .card-face { position: absolute; inset: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
                .card-back { transform: rotateY(180deg); }
              `}</style>
            </div>
          ))
        ) : (
          <div className="col-span-full my-12 p-12 text-center bg-gradient-to-br from-gray-900/80 via-cyan-950/40 to-gray-900/80 border border-cyan-500/40 rounded-2xl max-w-2xl mx-auto backdrop-blur-md shadow-2xl">
           <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4 tracking-wider">
              coming soon...
           </h2>
           <p className="text-gray-300 text-lg">
              We are updating event details and prize pools. Stay tuned!
           </p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}