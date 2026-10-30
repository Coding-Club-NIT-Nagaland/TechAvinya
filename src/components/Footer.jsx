import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub, FaYoutube, FaEnvelope, FaPhone, FaCode } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-gray-300 py-4 px-6 sm:px-10 lg:px-20 border-t border-white/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/image/logo2.png" alt="Tech Avinya Logo" className="h-20 w-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2 variable">About Tech Avinya</h3>
          <p className="text-lg font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Hind', sans-serif" }}>
            टेक अविन्य
          </p>
          <p className="text-sm rokkitt">
            Tech Avinya is the annual technical fest of NIT Nagaland. It's a platform for students to showcase their technical skills, innovate, and compete in various events, workshops, and hackathons.
          </p>
        </div>

        <div className="text-center md:text-left variable">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/home" className="hover:text-cyan-400 transition cursor-pointer">Home</Link></li>
            <li><Link to="/events" className="hover:text-cyan-400 transition cursor-pointer">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-cyan-400 transition cursor-pointer">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition cursor-pointer">About</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition cursor-pointer">Contact</Link></li>
            <li><Link to="/promos" className="hover:text-cyan-400 transition cursor-pointer">Promos</Link></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4 variable">Contact Us</h3>
          <p className="text-sm rokkitt">
            National Institute of Technology Nagaland<br />
            Chumukedima, Dimapur - 797103<br />
            Nagaland, India
          </p>
          <div className="mt-4 space-y-2 rokkitt">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FaEnvelope className="text-lg text-cyan-400" />
              <p className="text-sm">techavi@nitnagaland.ac.in</p>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FaPhone className="text-lg text-cyan-400" />
              <p className="text-sm">+91 7755803253</p>
              <p className="text-sm">+91 8413065222</p>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4 variable">Affiliations</h3>
          <div className="mb-6">
            <a
              href="https://www.coding-club-nitn.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start space-x-2 text-cyan-400 hover:text-cyan-300 transition-all group"
            >
              <FaCode className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium underline">NIT Nagaland Coding Club</span>
            </a>
            <p className="text-xs mt-2 text-gray-400 max-w-[200px] mx-auto md:mx-0">
              Where innovation meets tradition
            </p>
          </div>

          <h3 className="text-xl font-semibold text-white mb-4 variable">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://www.instagram.com/techavinya_/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://www.facebook.com/Nitnagaland0/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="https://www.youtube.com/@NITNagalandOfficial" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com/company/director-nit-nagaland/posts/?feedView=all" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300">
              <FaLinkedinIn className="text-2xl" />
            </a>
            <a href="https://github.com/Coding-Club-NIT-Nagaland" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300">
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-300">
        <p>&copy; 2025 Tech Avinya. All rights reserved.</p>
        <p>Developed By Web Team</p>
      </div>
    </footer>
  );
}
