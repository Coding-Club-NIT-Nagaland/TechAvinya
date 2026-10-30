import React, { useState } from 'react';

export default function AftermovieCard() {
  const youtubeId = "T0Hf_Q9SAG8";
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8 sm:py-12">
      <style>{`
        @keyframes framePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(99,102,241,0.4); }
        }
        @keyframes cornerGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .thrilling-frame {
          animation: framePulse 3s ease-in-out infinite;
        }
        .corner-accent {
          animation: cornerGlow 2s ease-in-out infinite;
        }
        .scan-effect {
          animation: scanLine 4s linear infinite;
        }
      `}</style>

      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Main Frame Container */}
        <div className="thrilling-frame relative p-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_200%] animate-gradient">
          <div className="relative bg-black rounded-xl overflow-hidden">
            {/* Corner Accents */}
            <div className="corner-accent absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" style={{ animationDelay: '0s' }} />
            <div className="corner-accent absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" style={{ animationDelay: '0.5s' }} />
            <div className="corner-accent absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" style={{ animationDelay: '1s' }} />
            <div className="corner-accent absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" style={{ animationDelay: '1.5s' }} />

            {/* Scan Line Effect */}
            <div className="scan-effect absolute inset-0 pointer-events-none z-10">
              <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video">
              {!isPlaying ? (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer group flex items-center justify-center"
                >
                  <img 
                    src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt="Aftermovie Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Glowing Play Button */}
                  <div className="relative z-10">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-black flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform border-2 border-cyan-300">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 fill-current translate-x-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Tech Decorations */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs text-cyan-300 font-mono tracking-widest">LIVE</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="px-2 py-1 bg-black/50 rounded border border-cyan-500/30">
                      <span className="text-xs text-cyan-300 font-mono">HD</span>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Tech Avinya Aftermovie"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Bottom Tech Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute -top-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}
