import React, { useState, useRef, useEffect, useCallback } from 'react';
import animatedVideo from '../assets/animated.webm';

export default function PreLoader({ onAnimationFinish }) {
  const [animationFinished, setAnimationFinished] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = useCallback(() => {
    setAnimationFinished(true);
    setTimeout(() => {
      onAnimationFinish();
    }, 500);
  }, [onAnimationFinish]);

  useEffect(() => {
    // Safety fallback: if video stalls or takes too long, dismiss preloader after 4 seconds
    const fallbackTimer = setTimeout(() => {
      handleVideoEnd();
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, [handleVideoEnd]);

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-all duration-500 ease-in-out ${animationFinished ? 'opacity-0 transform scale-150 pointer-events-none' : ''}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen md:max-w-10xl">
        <video
          ref={videoRef}
          src={animatedVideo}
          className="w-full h-auto object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
        />
      </div>
      <button
        type="button"
        onClick={handleVideoEnd}
        className="absolute bottom-6 right-6 z-50 text-xs tracking-widest text-cyan-400/70 hover:text-cyan-300 uppercase px-3 py-1.5 rounded border border-cyan-500/30 bg-black/60 backdrop-blur-sm transition-all cursor-pointer"
      >
        Skip &rarr;
      </button>
    </div>
  );
}
