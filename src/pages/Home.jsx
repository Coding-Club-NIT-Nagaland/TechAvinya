import React, { useState, useEffect } from 'react';
import backvideo from '../assets/events.mp4';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import VantaNetBackground from '../components/VantaNetBackground';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const video = document.getElementById('home-video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
        // Delay hiding loader slightly for smooth transition
        setTimeout(() => setShowLoader(false), 500);
      });
    }

    // Fallback: hide loader after 5 seconds even if video doesn't load
    const fallbackTimer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center space-y-6">
            {/* Animated Logo or Spinner */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-blue-500 rounded-full animate-spin-slow"></div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Loading Experience
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full h-screen overflow-hidden">
        {/* Always show VantaNetBackground as fallback */}
        <VantaNetBackground />

        <HeroSection />



        {/* Optional: Uncomment if you want overlay text */}
        {/*<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              TECH AVINYA
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 font-light">
              NIT Nagaland's Premier Technical Festival
            </p>
            <div className="mt-8 animate-pulse">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div> */}
      </div>

      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <AftermovieCard />
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <Aboutus />
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </>
  );
}
