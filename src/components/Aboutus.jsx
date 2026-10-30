import React from 'react';

export default function Aboutus() {
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.478605175001!2d93.77168327523175!3d25.787779977335646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374607c5cdfdde91%3A0xf69a2518890fea22!2sNational%20Institute%20of%20Technology%20Nagaland!5e0!3m2!1sen!2sin!4v1758637874895!5m2!1sen!2sin";

  return (
    <div className="relative w-full py-12 md:py-16 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes windowGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.2), inset 0 0 20px rgba(6,182,212,0.05); }
          50% { box-shadow: 0 0 40px rgba(6,182,212,0.4), inset 0 0 30px rgba(6,182,212,0.1); }
        }
        @keyframes typingCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dataStream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .gaming-window {
          animation: windowGlow 4s ease-in-out infinite;
        }
        .typing-cursor {
          animation: typingCursor 1s step-end infinite;
        }
        .data-stream {
          animation: dataStream 3s linear infinite;
        }
      `}</style>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
        {/* Gaming Window Header */}
        <div className="gaming-window mb-8 rounded-t-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 bg-black/30 rounded px-4 py-1.5">
              <span className="text-xs text-cyan-400 font-mono tracking-wider">about_tech_avinya.exe</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400/50 rounded" />
              <div className="w-2 h-2 bg-cyan-400/50 rounded" />
              <div className="w-2 h-2 bg-cyan-400/50 rounded" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - About Text */}
          <div className="lg:col-span-2 space-y-4">
            {/* Window 1 */}
            <div className="gaming-window rounded-xl bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-2 border-b border-cyan-500/20 flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase">Mission_Statement.txt</span>
                <div className="w-16 h-1 bg-cyan-500/30 rounded overflow-hidden">
                  <div className="data-stream h-full w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-base md:text-lg leading-relaxed text-gray-200">
                  <span className="text-cyan-400 font-bold">Tech Avinya</span> is the annual <span className="text-cyan-400 font-bold">technical festival</span> of <span className="text-cyan-400 font-bold">NIT Nagaland</span>. It serves as a premier platform for young innovators, engineers, and tech enthusiasts from across the nation to showcase their technical skills, exchange groundbreaking ideas, and push the boundaries of technology.
                </p>
              </div>
            </div>

            {/* Window 2 */}
            <div className="gaming-window rounded-xl bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 border-b border-purple-500/20 flex items-center justify-between">
                <span className="text-xs text-purple-400 font-mono tracking-widest uppercase">Events_Database.log</span>
                <div className="w-16 h-1 bg-purple-500/30 rounded overflow-hidden">
                  <div className="data-stream h-full w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-base md:text-lg leading-relaxed text-gray-200">
                  Organized with a vision to foster a culture of innovation and learning, <span className="text-purple-400 font-bold">Tech Avinya</span> brings together brilliant minds for a series of events, workshops, and competitions. From intense coding challenges and robotics competitions to insightful guest lectures and hands-on workshops, the fest offers a diverse range of activities.
                </p>
              </div>
            </div>

            {/* Window 3 */}
            <div className="gaming-window rounded-xl bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 border-b border-blue-500/20 flex items-center justify-between">
                <span className="text-xs text-blue-400 font-mono tracking-widest uppercase">Network_Config.json</span>
                <div className="w-16 h-1 bg-blue-500/30 rounded overflow-hidden">
                  <div className="data-stream h-full w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" style={{ animationDelay: '2s' }} />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-base md:text-lg leading-relaxed text-gray-200">
                  <span className="text-blue-400 font-bold">Tech Avinya</span> is more than just a competition; it's a celebration of technology, creativity, and collaboration. The festival provides unique networking opportunities with industry experts, leading academics, and alumni. Join us as we explore the future of technology and inspire the next generation of engineering leaders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Map Window */}
          <div className="lg:col-span-1">
            <div className="gaming-window rounded-xl bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 px-4 py-2 border-b border-cyan-500/20 flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase">Location_Map.exe</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400 font-mono">ONLINE</span>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-full">
                <iframe
                  src={googleMapsEmbedUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: '0' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NIT Nagaland Location"
                ></iframe>
              </div>
              {/* Window Footer */}
              <div className="bg-black/30 px-4 py-2 border-t border-cyan-500/20 flex items-center justify-between">
                <span className="text-[10px] text-cyan-400/60 font-mono">COORD: 25.7878° N, 93.7717° E</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-cyan-400/40 rounded" />
                  <div className="w-1 h-1 bg-cyan-400/40 rounded" />
                  <div className="w-1 h-1 bg-cyan-400/40 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
