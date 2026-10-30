import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Calendar, Users, Info, Phone, Camera, Heart, ChevronRight } from 'lucide-react';

const getSessionData = () => {
  const itemStr = sessionStorage.getItem('admin_session');
  if (!itemStr) return null;
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem('admin_session');
    return null;
  }
  return item.value;
};

const baseNavItems = [
  { name: "HOME", path: "/", icon: Home, hasSub: false },
  { name: "SCHEDULE", path: "/schedule", icon: Calendar, hasSub: false },
  { name: "EVENTS", path: "/events", icon: Users, hasSub: false },
  { name: "ABOUT", path: "/about", icon: Info, hasSub: false },
  { name: "CONTACT", path: "/contact", icon: Phone, hasSub: false },
  { name: "GALLERY", path: "/gallery", icon: Camera, hasSub: false },
  { name: "SPONSORS", path: "/sponsors", icon: Heart, hasSub: false },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const checkAuth = useCallback(() => {
    const session = getSessionData();
    setIsLoggedIn(!!session);
  }, []);

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    window.addEventListener('authStatusChange', checkAuth);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('authStatusChange', checkAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkAuth]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent('authStatusChange'));
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes navGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(99,102,241,0.4); }
        }
        @keyframes borderPulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .nav-glow {
          animation: navGlow 3s ease-in-out infinite;
        }
        .border-animated {
          background: linear-gradient(90deg, #06b6d4, #6366f1, #06b6d4);
          background-size: 200% 200%;
          animation: borderPulse 3s ease infinite;
        }
      `}</style>

      <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out h-20 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl' : 'bg-black/60 backdrop-blur-lg border-b border-white/10'}`}>
        {/* Animated top border */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 border-animated ${scrolled ? 'opacity-100' : 'opacity-50'}`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <img
                  src="/image/logo2.png"
                  alt="Tech Avinya Logo"
                  className="h-14 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          {/* Center nav (desktop) */}
          <div className="hidden lg:flex items-center flex-1 min-w-0 justify-center px-8">
            <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm">
              {baseNavItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative px-4 py-2.5 rounded-xl transition-all duration-300 flex-shrink-0
                      ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'}
                    `}
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    <span className="relative z-10 font-medium">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-md" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="hidden lg:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  <User size={16} />
                  <span>DASHBOARD</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden lg:flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  <LogOut size={16} />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                <User size={16} />
                <span>LOGIN</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 relative"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
              {!open && <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-slate-900 via-slate-900 to-black z-50 lg:hidden transition-transform duration-300 ease-out shadow-2xl border-l border-cyan-500/20 ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-lg" />
                <img src="/image/logo2.png" alt="Logo" className="h-10 w-auto relative z-10" />
              </div>
              <span className="text-xl font-bold text-cyan-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>TECH AVINYA</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-2">
              {baseNavItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20 border border-cyan-500/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    onClick={() => setOpen(false)}
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                        <item.icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'} />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-gray-500 group-hover:translate-x-1'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 space-y-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 transform hover:scale-105"
                  onClick={() => setOpen(false)}
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  <User size={18} />
                  <span>DASHBOARD</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/20 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  <LogOut size={18} />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105"
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                <User size={18} />
                <span>LOGIN</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
