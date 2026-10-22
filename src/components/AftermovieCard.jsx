import React, { useState } from 'react';
import aftermovieFrame from '../assets/videocard.png';

export default function AftermovieCard() {
  const youtubeId = "T0Hf_Q9SAG8";
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 sm:py-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold Graduate font-['Press_Start_2P'] 
                      text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                      text-shadow-neon-cyan title-rocking mb-6 sm:mb-8 text-center">
        Aftermovie
      </h2>

      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-3 sm:p-5 md:p-6 rounded-2xl glow-effect">
        {/* Responsive 16:9 video container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
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
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              {/* YouTube-style glowing Play Button */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
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

        {/* The Frame Image Overlay */}
        <img
          src={aftermovieFrame}
          alt="Aftermovie Frame"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        />
      </div>
    </div>
  );
}
