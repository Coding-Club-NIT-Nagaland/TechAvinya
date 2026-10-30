import React, { useState, useEffect } from 'react';
import backvideo from '../assets/events.mp4';
import AftermovieCard from '../components/AftermovieCard';
import Aboutus from '../components/Aboutus';
import VantaNetBackground from '../components/VantaNetBackground';
import HeroSection from '../components/HeroSection';
import UpdatesTicker from '../components/UpdatesTicker';

// ── Section wrapper with glowing heading ──────────────────────────────────────
function Section({ id, title, accent, children, dark = false }) {
  return (
    <section
      id={id}
      className={`relative z-10 py-16 md:py-24 overflow-hidden ${
        dark
          ? 'bg-gradient-to-b from-gray-900 via-[#0a0f1e] to-black'
          : 'bg-gradient-to-b from-black via-gray-900 to-[#0a0f1e]'
      }`}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glow blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${accent ?? 'rgba(6,182,212,0.12)'} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section heading */}
        {title && (
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
              <span
                className="text-xs sm:text-sm tracking-[0.4em] text-cyan-400/70 uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Tech Avinya 2K26
              </span>
              <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 text-center"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {title}
            </h2>
            <div
              className="mt-4 h-0.5 w-24 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #6366f1)',
                boxShadow: '0 0 12px rgba(6,182,212,0.6)',
              }}
            />
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const isSeen =
    typeof window !== 'undefined' && sessionStorage.getItem('home_loader_seen');

  const [showLoader, setShowLoader] = useState(!isSeen);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const updates = [
    'Updated Venue for Digital Arts Event is EDC Lab',
    'Venue for Tech Crisis has been shifted to Smart Lab',
    'Registration for Internal NIT Students is Resumed Now !',
    'NIT Nagaland Student can now purchase Club Bundle to participate in any event organized by that Club',
    'Stay Tuned for further Updates',
  ];

  useEffect(() => {
    if (isSeen) return;

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) { clearInterval(progressInterval); return 95; }
        return p + Math.random() * 12;
      });
    }, 180);

    const hideLoaderSmoothly = () => {
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        sessionStorage.setItem('home_loader_seen', 'true');
        setTimeout(() => setShowLoader(false), 600);
      }, 300);
    };

    const video = document.getElementById('home-video');
    if (video) {
      if (video.readyState >= 3) {
        hideLoaderSmoothly();
      } else {
        video.addEventListener('canplaythrough', hideLoaderSmoothly, { once: true });
      }
    }

    const fallbackTimer = setTimeout(hideLoaderSmoothly, 2500);

    return () => {
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
    };
  }, [isSeen]);

  return (
    <div className="bg-black min-h-screen text-white">

      {/* ── LOADING SCREEN ─────────────────────────────────────────────────── */}
      {showLoader && (
        <div
          className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ease-in-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative flex flex-col items-center gap-8 z-10">
            {/* Dual-ring spinner */}
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 border-[3px] border-cyan-500/20 rounded-full" />
              <div className="absolute inset-0 border-[3px] border-transparent border-t-cyan-400 rounded-full animate-spin" />
              <div
                className="absolute inset-3 border-[3px] border-transparent border-t-indigo-500 rounded-full"
                style={{ animation: 'spin 1.8s linear infinite reverse' }}
              />
              <div
                className="absolute inset-6 border-[3px] border-transparent border-t-purple-500 rounded-full animate-spin"
                style={{ animationDuration: '1.2s' }}
              />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center space-y-1">
              <h2
                className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                TECH AVINYA
              </h2>
              <p
                className="text-xs tracking-[0.5em] text-cyan-400/50 uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                2K26 · Initializing
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-56 sm:w-72">
              <div className="flex justify-between text-[10px] text-cyan-400/40 mb-1.5 tracking-widest font-mono">
                <span>LOADING</span>
                <span>{Math.round(Math.min(progress, 100))}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(90deg, #06b6d4, #6366f1)',
                    boxShadow: '0 0 10px rgba(6,182,212,0.8)',
                  }}
                />
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* ── UPDATES TICKER ───────────────────────────────────────────────────── */}
      <div className="fixed top-20 left-0 right-0 z-40">
        <UpdatesTicker items={updates} className="shadow-lg" />
      </div>
      <div className="h-10" />

      {/* ── HERO VIDEO + HERO SECTION ───────────────────────────────────────── */}
      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video
          id="home-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.45) saturate(1.2)' }}
        >
          <source src={backvideo} type="video/mp4" />
        </video>

        {/* Vanta fallback */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <VantaNetBackground />
        </div>

        {/* Bottom fade-out to next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
        />

        <div className="relative z-10 w-full h-full">
          <HeroSection />
        </div>
      </div>

      {/* ── AFTERMOVIE SECTION ──────────────────────────────────────────────── */}
      <Section
        id="aftermovie"
        title="Relive The Moments"
        accent="rgba(99,102,241,0.15)"
        dark
      >
        <AftermovieCard />
      </Section>

      {/* ── ABOUT SECTION ───────────────────────────────────────────────────── */}
      <Section
        id="about"
        title="About Tech Avinya"
        accent="rgba(6,182,212,0.12)"
      >
        <Aboutus />
      </Section>

      {/* ── GLOBAL STYLES ───────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap');

        .duration-600 { transition-duration: 600ms; }
      `}</style>
    </div>
  );
}
