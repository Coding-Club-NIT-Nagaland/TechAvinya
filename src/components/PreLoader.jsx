import React, { useState, useEffect, useRef } from 'react';
import animatedVideo from '../assets/animated.webm';

export default function PreLoader({ onAnimationFinish }) {
  // Check session storage immediately on mount
  const [hasSeen] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('preloader_seen');
    }
    return false;
  });

  // If already seen this session, skip the animation instantly
  useEffect(() => {
    if (hasSeen) {
      onAnimationFinish();
    }
  }, [hasSeen, onAnimationFinish]);

  if (hasSeen) {
    return null;
  }

  const [animationFinished, setAnimationFinished] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setAnimationFinished(true);
    // Mark as seen in session storage so it never plays again on refresh/navigation
    sessionStorage.setItem('preloader_seen', 'true');
    setTimeout(() => {
      onAnimationFinish();
    }, 500);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black transition-all duration-500 ease-in-out ${animationFinished ? 'opacity-0 transform scale-150' : ''}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen md:max-w-10xl">
        <video
          ref={videoRef}
          src={animatedVideo}
          className="w-full h-auto object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  );
}