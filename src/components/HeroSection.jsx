import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Animated floating particle
function Particle({ style }) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

// Typewriter hook
function useTypewriter(texts, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

// Stats badge
function StatBadge({ value, label }) {
  return (
    <div
      className="flex flex-col items-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl"
      style={{
        background: "rgba(6,182,212,0.07)",
        border: "1px solid rgba(6,182,212,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="text-xl sm:text-2xl font-black text-cyan-300"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {value}
      </span>
      <span
        className="text-[10px] sm:text-xs text-cyan-400/60 tracking-widest uppercase mt-0.5"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const tagline = useTypewriter([
    "WHERE INNOVATION MEETS INSPIRATION",
    "CODE. CREATE. CONQUER.",
    "HACK THE FUTURE. BUILD TOMORROW.",
    "NEXT-GEN TECH. LIMITLESS POSSIBILITIES.",
  ]);

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H, particles;
    let mouseX = 0, mouseY = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const particleCount = Math.floor((W * H) / 15000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update and draw particles
      particles.forEach((p, i) => {
        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.vx -= dx * force * 0.01;
          p.vy -= dy * force * 0.01;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,0.6)`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.2 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    width: `${4 + Math.random() * 10}px`,
    height: `${4 + Math.random() * 10}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    background: i % 3 === 0
      ? "rgba(6,182,212,0.55)"
      : i % 3 === 1
      ? "rgba(99,102,241,0.45)"
      : "rgba(255,255,255,0.3)",
    animation: `floatParticle ${5 + Math.random() * 8}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 6}s`,
    filter: "blur(0.5px)",
  }));

  const techAvinyaTexts = Array.from({ length: 12 }, (_, i) => ({
    left: `${10 + (i % 4) * 25}%`,
    top: `${15 + Math.floor(i / 4) * 25}%`,
    opacity: 0.04,
    fontSize: `${14 + (i % 3) * 6}px`,
    rotation: `${(i % 4) * 15}deg`,
  }));

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;800;900&family=Michroma&family=Rajdhani:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-28px) scale(1.15); opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glitchX {
          0%, 100% { clip-path: inset(0 0 98% 0); transform: translateX(0); }
          20% { clip-path: inset(33% 0 50% 0); transform: translateX(-6px); }
          40% { clip-path: inset(70% 0 8% 0); transform: translateX(6px); }
          60% { clip-path: inset(15% 0 75% 0); transform: translateX(-3px); }
          80% { clip-path: inset(55% 0 30% 0); transform: translateX(3px); }
        }
        @keyframes titlePulse {
          0%, 100% { text-shadow: 0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.2); }
          50% { text-shadow: 0 0 60px rgba(6,182,212,0.9), 0 0 100px rgba(6,182,212,0.4), 0 0 140px rgba(99,102,241,0.3); }
        }
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes badgePop {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hero-title { animation: titlePulse 3s ease-in-out infinite; }
        .badge-appear { animation: badgePop 0.6s ease forwards; }
        .btn-gradient-border {
          background: linear-gradient(90deg, #06b6d4, #6366f1, #06b6d4);
          background-size: 200% 200%;
          animation: borderFlow 3s ease infinite;
        }
        .scanline-fx {
          animation: scanline 8s linear infinite;
        }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)" }}
      >
        {/* Dot-grid canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Floating particles */}
        {particles.map((style, i) => (
          <Particle key={i} style={{ ...style, position: "absolute", zIndex: 1 }} />
        ))}

        {/* Static Tech Avinya text */}
        {techAvinyaTexts.map((text, i) => (
          <div
            key={`text-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: text.left,
              top: text.top,
              opacity: text.opacity,
              fontSize: text.fontSize,
              transform: `rotate(${text.rotation})`,
              fontFamily: "'Orbitron', sans-serif",
              color: 'rgba(6,182,212,0.4)',
              fontWeight: 'bold',
              zIndex: 0,
            }}
          >
            Tech Avinya
          </div>
        ))}

        {/* Scanline sweep */}
        <div
          className="scanline-fx absolute left-0 right-0 h-[2px] pointer-events-none z-1"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.18), transparent)",
          }}
        />

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/5 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/5 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-2/3 left-1/2 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        {/* Side accent bars */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 z-10"
          style={{
            background: "linear-gradient(180deg, transparent, #06b6d4 40%, #6366f1 70%, transparent)",
            boxShadow: "0 0 15px rgba(6,182,212,0.8)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-1 sm:w-1.5 z-10"
          style={{
            background: "linear-gradient(180deg, transparent, #6366f1 40%, #06b6d4 70%, transparent)",
            boxShadow: "0 0 15px rgba(99,102,241,0.8)",
          }}
        />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 text-center max-w-5xl mx-auto w-full">

          {/* Event badge pill */}
          <div className="badge-appear flex justify-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest text-cyan-300 uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.4)",
                backdropFilter: "blur(6px)",
                letterSpacing: "0.25em",
              }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Annual Tech Fest · 2026
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-cyan-500 leading-none tracking-tight select-none"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Tech
            <br className="sm:hidden" />
            <span className="sm:ml-4">Avinya</span>
          </h1>

          {/* Year badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <span
              className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                backgroundImage: "linear-gradient(90deg, #06b6d4, #818cf8, #06b6d4)",
                backgroundSize: "200%",
                animation: "borderFlow 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(6,182,212,0.6))",
              }}
            >
              2K26
            </span>
          </div>

          {/* Typewriter tagline */}
          <div
            className="h-7 sm:h-9 flex items-center justify-center mb-10 sm:mb-12"
          >
            <p
              className="text-sm sm:text-base md:text-lg text-cyan-300/90 tracking-[0.25em] sm:tracking-[0.35em] font-medium"
              style={{ fontFamily: "'Michroma', sans-serif" }}
            >
              {tagline}
              <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </p>
          </div>

          {/* Date Display */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
              style={{
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-2xl sm:text-3xl">📅</span>
              <div className="text-left">
                <div
                  className="text-lg sm:text-xl font-black text-cyan-300"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Nov 5 & 6, 2026
                </div>
                <div
                  className="text-[10px] sm:text-xs text-cyan-400/60 tracking-widest uppercase"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  Event Dates
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-14">
            {[
              { value: "12", label: "Official Events" },
              { value: "2 Days", label: "of Action" },
              { value: "₹2,00,000+", label: "Prize Pool" },
              { value: "5", label: "Clubs" },
            ].map((s, i) => (
              <StatBadge key={i} {...s} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/events")}
              className="group relative overflow-hidden px-10 sm:px-12 py-4 sm:py-4.5 rounded-full font-bold text-base sm:text-lg text-black transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #6366f1)",
                boxShadow: "0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(99,102,241,0.2)",
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                LIVE NOW
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* shimmer */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </button>
          </div>

          {/* Scroll hint */}
          <div className="mt-14 sm:mt-16 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] tracking-[0.3em] text-cyan-400/70 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-cyan-400/40 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-cyan-400/70 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
