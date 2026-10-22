import React, { useState, useRef } from 'react';
import animatedVideo from '../assets/animated.webm';

export default function PreLoader({ onAnimationFinish }) {
  const [animationFinished, setAnimationFinished] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setAnimationFinished(true);
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