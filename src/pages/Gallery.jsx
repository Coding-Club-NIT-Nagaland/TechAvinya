import React, { useState, useEffect, useRef } from 'react';
import gallary from '../assets/gallary.png';

export default function Gallery() {
  const [photos] = useState([
    { id: 1, src: '/gallary/1.jpg', alt: 'TechFest Event 1' },
    { id: 2, src: '/gallary/2.webp', alt: 'TechFest Event 2' },
    { id: 3, src: '/gallary/3.webp', alt: 'TechFest Event 3' },
    { id: 4, src: '/gallary/4.webp', alt: 'TechFest Event 4' },
    { id: 5, src: '/gallary/5.webp', alt: 'TechFest Event 5' },
    { id: 6, src: '/gallary/6.jpg', alt: 'TechFest Event 6' },
    { id: 7, src: '/gallary/7.webp', alt: 'TechFest Event 7' },
    { id: 8, src: '/gallary/8.jpg', alt: 'TechFest Event 8' },
    { id: 9, src: '/gallary/9.jpg', alt: 'TechFest Event 9' },
    { id: 10, src: '/gallary/10.jpg', alt: 'TechFest Event 10' },
    { id: 11, src: '/gallary/11.jpg', alt: 'TechFest Event 11' },
    { id: 12, src: '/gallary/12.jpg', alt: 'TechFest Event 12' },
    { id: 13, src: '/gallary/13.webp', alt: 'TechFest Event 13' },
    { id: 14, src: '/gallary/14.webp', alt: 'TechFest Event 14' },
    { id: 15, src: '/gallary/15.webp', alt: 'TechFest Event 15' },
    { id: 16, src: '/gallary/16.webp', alt: 'TechFest Event 16' },
    { id: 17, src: '/gallary/17.webp', alt: 'TechFest Event 17' },
    { id: 18, src: '/gallary/18.webp', alt: 'TechFest Event 18' },
    { id: 19, src: '/gallary/19.webp', alt: 'TechFest Event 19' },
    { id: 20, src: '/gallary/20.webp', alt: 'TechFest Event 20' },
    { id: 21, src: '/gallary/21.webp', alt: 'TechFest Event 21' },
    { id: 22, src: '/gallary/22.webp', alt: 'TechFest Event 22' },
    { id: 23, src: '/gallary/23.webp', alt: 'TechFest Event 23' },
    { id: 24, src: '/gallary/24.webp', alt: 'TechFest Event 24' },
    { id: 25, src: '/gallary/25.webp', alt: 'TechFest Event 25' },
    { id: 26, src: '/gallary/26.webp', alt: 'TechFest Event 26' },
    { id: 27, src: '/gallary/27.webp', alt: 'TechFest Event 27' },
    { id: 28, src: '/gallary/28.webp', alt: 'TechFest Event 28' },
    { id: 29, src: '/gallary/29.webp', alt: 'TechFest Event 29' },
    { id: 30, src: '/gallary/30.webp', alt: 'TechFest Event 30' },
    { id: 31, src: '/gallary/31.webp', alt: 'TechFest Event 31' },
    { id: 32, src: '/gallary/32.webp', alt: 'TechFest Event 32' },
    { id: 33, src: '/gallary/33.webp', alt: 'TechFest Event 33' },
    { id: 34, src: '/gallary/34.webp', alt: 'TechFest Event 34' },
    { id: 35, src: '/gallary/35.webp', alt: 'TechFest Event 35' },
    { id: 36, src: '/gallary/36.webp', alt: 'TechFest Event 36' },
    { id: 37, src: '/gallary/37.webp', alt: 'TechFest Event 37' },
    { id: 38, src: '/gallary/38.webp', alt: 'TechFest Event 38' },
    { id: 39, src: '/gallary/39.webp', alt: 'TechFest Event 39' },
    { id: 40, src: '/gallary/40.webp', alt: 'TechFest Event 40' },
    { id: 41, src: '/gallary/41.webp', alt: 'TechFest Event 41' },
    { id: 42, src: '/gallary/42.webp', alt: 'TechFest Event 42' },
    { id: 43, src: '/gallary/43.webp', alt: 'TechFest Event 43' },
    { id: 44, src: '/gallary/44.jpg', alt: 'TechFest Event 44' },
    { id: 45, src: '/gallary/45.jpg', alt: 'TechFest Event 45' },
    { id: 46, src: '/gallary/46.jpg', alt: 'TechFest Event 46' },
    { id: 47, src: '/gallary/47.webp', alt: 'TechFest Event 47' }
  ]);
  const [isVisible, setIsVisible] = useState({});
  const photoRefs = useRef([]);
  const [tiltStyle, setTiltStyle] = useState({}); // State to manage dynamic tilt

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    photoRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      photoRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [photos]);
  
  // --- Dynamic Tilt Handlers ---
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Calculate rotation based on mouse position relative to the card center
    const rotateX = (y / height - 0.5) * 26; // Adjust the 26 for tilt intensity
    const rotateY = (x / width - 0.5) * -26; // Adjust the -26 for tilt intensity
    
    setTiltStyle(prev => ({ 
      ...prev,
      [id]: { 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
        boxShadow: `0 20px 40px rgba(0, 255, 255, 0.5)`, // Add a glow effect
        transition: 'transform 0.05s linear, box-shadow 0.05s linear', // Smoother transition
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', // Revert shadow
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out', // Smooth return
      }
    }));
  };
  // --- End Dynamic Tilt Handlers ---

  // --- Image Viewer Handlers ---
  const handleDoubleClick = (photoIndex) => {
    setIsViewerOpen(true);
    setCurrentPhotoIndex(photoIndex);
  };
  
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
  // --- End Image Viewer Handlers ---

  return (
    <div className="relative w-full min-h-screen">
      {/* The background video is now a fixed element */}
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={gallary}
      />

      {/* A semi-transparent overlay to ensure text readability */}
      <div className="fixed inset-0 bg-black/50 z-0"></div>

      {/* The content is now on a new layer above the video and overlay */}
      <div className="relative z-10 pt-20 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold Graduate font-['Press_Start_2P'] 
                        text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                        text-shadow-neon-cyan title-rocking mb-12 mt-8">Photo Gallery</h1>
        

        {/* Masonry-style Image Grid with enhanced 3D effect */}
        <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-4 pb-20 perspective-1000">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={el => photoRefs.current[index] = el}
              data-id={photo.id}
              onDoubleClick={() => handleDoubleClick(index)}
              onMouseMove={(e) => handleMouseMove(e, photo.id)} // Dynamic tilt
              onMouseLeave={() => handleMouseLeave(photo.id)}   // Dynamic tilt reset
              className={`relative overflow-hidden rounded-lg shadow-lg mb-4 cursor-pointer transform-gpu
                ${isVisible[photo.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ 
                ...tiltStyle[photo.id], // Apply dynamic tilt styles
                transitionDelay: `${index * 50}ms`,
                // Default transition for entry animation if no tilt style is active
                transition: tiltStyle[photo.id] ? tiltStyle[photo.id].transition : 'transform 0.7s ease-in-out, opacity 0.7s ease-in-out, box-shadow 0.7s ease-in-out',
                boxShadow: tiltStyle[photo.id] ? tiltStyle[photo.id].boxShadow : '0 10px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover backface-hidden"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Full-Screen Image Viewer */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button 
            onClick={handleCloseViewer}
            className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full hover:bg-white/20 transition-all"
          >
            &times;
          </button>
          
          <button 
            onClick={handlePrevious}
            className="absolute left-4 p-4 text-white text-5xl hover:bg-white/20 transition-all rounded-full"
          >
            &#8249;
          </button>
          
          <img 
            src={photos[currentPhotoIndex].src} 
            alt={photos[currentPhotoIndex].alt} 
            // Ensures image fits screen, maintains aspect ratio, and is larger
            className="max-w-[90vw] max-h-[90vh] object-contain" 
          />
          
          <button 
            onClick={handleNext}
            className="absolute right-4 p-4 text-white text-5xl hover:bg-white/20 transition-all rounded-full"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}