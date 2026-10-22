import React, { useState, useEffect } from 'react';
import backvideo from '../assets/events.mp4';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import VantaNetBackground from '../components/VantaNetBackground';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const isSeen = typeof window !== 'undefined' && sessionStorage.getItem('home_loader_seen');

  const [showLoader, setShowLoader] = useState(!isSeen);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isSeen) return;

    const hideLoaderSmoothly = () => {
      setFadeOut(true);
      sessionStorage.setItem('home_loader_seen', 'true');
      
      setTimeout(() => {
        setShowLoader(false);
      }, 500); // Matches transition duration
    };

    const video = document.getElementById('home-video');

    if (video) {
      if (video.readyState >= 3) {
        hideLoaderSmoothly();
      } else {
        video.addEventListener('canplaythrough', hideLoaderSmoothly, { once: true });
      }
    }

    // Safety fallback timer
    const fallbackTimer = setTimeout(() => {
      hideLoaderSmoothly();
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [isSeen]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Smooth Loading Screen Overlay with solid black background */}
      {showLoader && (
        <div
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ease-in-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center space-y-6">
            {/* Animated Spinner */}
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

      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {/* Background Video with preload and explicit black background */}
        <video
          id="home-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 bg-black"
        >
          <source src={backvideo} type="video/mp4" />
        </video>

        {/* Fallback canvas container */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <VantaNetBackground />
        </div>

        <div className="relative z-10 w-full h-full">
          <HeroSection />
        </div>
      </div>

      <section className="relative z-10 py-12 md:py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <AftermovieCard />
        </div>
      </section>

      <section className="relative z-10 py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <Aboutus />
        </div>
      </section>

      <style>{`
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
      `}</style>
    </div>
  );
}
