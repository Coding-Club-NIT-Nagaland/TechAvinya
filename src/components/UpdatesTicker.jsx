import React from 'react';

export default function UpdatesTicker({ items = [], speed = 80, className = '' }) {
  const content = items.length ? items : [
    'Welcome to Tech Avinya!',
    'Add your important updates here from Home.jsx',
  ];

  // Calculate animation duration based on speed (px/s) and approximate content width
  // We will rely on CSS to loop seamlessly by duplicating the content block.
  const durationSeconds = Math.max(10, Math.floor(1200 / speed));

  return (
    <div className={`relative w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-sm ${className}`} aria-live="polite">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />

      <div className="relative flex items-center gap-4 py-2 text-sm md:text-base text-cyan-200">
        <span className="z-10 ml-3 mr-2 shrink-0 rounded bg-cyan-600/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-500/30">
          Updates
        </span>

        <div className="relative z-10 flex-1 overflow-hidden">
          <div className="ticker-track group" style={{ ['--duration'] : `${durationSeconds}s` }}>
            <div className="ticker-content">
              {content.map((t, i) => (
                <span key={`a-${i}`} className="mx-6 whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
            <div className="ticker-content" aria-hidden="true">
              {content.map((t, i) => (
                <span key={`b-${i}`} className="mx-6 whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ticker-track {
          display: flex;
          width: max-content;
          user-select: none;
          will-change: transform;
          animation: ticker-scroll var(--duration, 20s) linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }

        .ticker-content { display: inline-flex; align-items: center; }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
