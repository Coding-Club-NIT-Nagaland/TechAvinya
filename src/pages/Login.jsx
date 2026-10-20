import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login.jpg';
import { API_BASE_URL } from '../config/api';

const setSessionData = (data) => {
  // 48 hours in milliseconds
  const twoDaysInMs = 48 * 60 * 60 * 1000;
  const expiryTime = new Date().getTime() + twoDaysInMs;

  const sessionData = {
    value: data,
    expiry: expiryTime,
  };

  localStorage.setItem('admin_session', JSON.stringify(sessionData));
  window.dispatchEvent(new Event('authStatusChange'));
};

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const inputEmail = formData.email.trim().toLowerCase();
    const inputPassword = formData.password.trim();

    try {
      // 1. Authenticate with backend API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await response.json();

      if (response.ok && (result.registrations || result.success)) {
        setSessionData(result.registrations || { token: `token_${Date.now()}`, role: 'admin' });
        navigate('/admin/dashboard');
        return;
      } else {
        setError(result.message || 'Invalid admin credentials. Please check email and password.');
        return;
      }
    } catch (err) {
      console.warn('[Login Notice] Backend is unreachable. Checking configured fallback credentials...', err);

      // 2. Offline / Local Fallback: Allow login with configured credentials if backend is offline
      const customEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@nitn.ac.in').toLowerCase();
      const customPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123';

      if (inputEmail === customEmail && inputPassword === customPassword) {
        setSessionData({
          token: `admin_session_${Date.now()}`,
          email: inputEmail,
          role: 'admin',
          isLocalSession: true,
        });
        navigate('/admin/dashboard');
        return;
      }

      setError('Invalid admin credentials or backend server is not running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 Gluten text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30';
  const labelClass = 'block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate';

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* High-Tech Thematic Admin Login Background */}
      <img
        src={loginBg}
        alt="Admin Login Background"
        className="fixed inset-0 w-full h-full object-cover z-0 brightness-[0.25] contrast-125 scale-105 pointer-events-none"
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-950/85 via-cyan-950/30 to-black/90 pointer-events-none" />

      {/* Cybernetic Ambient Glow & Tech Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        {/* Cyber Grid Lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Form Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 animate-fade-in">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 p-8 md:p-10 rounded-xl shadow-2xl shadow-blue-500/30 border border-cyan-700/60 space-y-6 backdrop-blur-md"
        >
          <div className="flex flex-col items-center mb-4">
            <img src="/image/logo2.png" alt="NIT Nagaland Logo" className="h-16 w-auto mb-3 title-rocking" />
            <h1 className="text-3xl md:text-4xl font-extrabold rokkitt text-cyan-400 font-anton text-center tracking-wide leading-tight">
              ADMIN ACCESS
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono Gluten">Tech Avinya Control Panel</p>
          </div>

          {error && (
            <div className="bg-red-950/70 text-red-300 p-3 rounded-lg border border-red-700/70 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Admin Email
            </label>
            <input
              type="text"
              id="email"
              required
              value={formData.email}
              className={inputClass}
              placeholder="xxxx@example.com"
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              className={inputClass}
              placeholder="••••••••"
              onChange={handleInputChange}
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg transition-all duration-300
                         bg-gradient-to-r from-teal-600 to-blue-600 border border-teal-500 text-white 
                         hover:from-teal-500 hover:to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/50 
                         active:scale-95 disabled:bg-gray-600 disabled:border-gray-500 disabled:shadow-none cursor-pointer"
            >
              {isSubmitting ? 'Authenticating...' : 'Secure Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
