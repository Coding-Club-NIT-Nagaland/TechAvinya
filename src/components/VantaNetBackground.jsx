import React, { useRef, useEffect } from 'react';

const VantaNetBackground = ({ options }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    const initializeVanta = () => {
      if (window.VANTA && vantaRef.current) {
        if (vantaEffectRef.current) {
          vantaEffectRef.current.destroy();
        }

        vantaEffectRef.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.10,
          scaleMobile: 1.30,
          color: 0x00f0ff,
          backgroundColor: 0x080a1a,
          points: 12,
          maxDistance: 25,
          spacing: 18,
          showDots: true,
          ...options
        });
      }
    };

    if (window.VANTA) {
      initializeVanta();
    } else {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
      script1.async = true;

      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js';
      script2.async = true;

      script2.onload = initializeVanta;

      document.head.appendChild(script1);
      document.head.appendChild(script2);

      return () => {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      };
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, [options]);

  return <div ref={vantaRef} className="fixed inset-0 w-screen h-screen z-0" />;
};

export default VantaNetBackground;