import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PreLoader from './components/PreLoader';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import EventDetail from './pages/EventDetail';
import Enroll from './pages/Enroll';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Sponsors from './pages/Sponsors';
import SponsorInquiry from './pages/SponsorInquiry';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Promos from './pages/Promos.jsx';
import ScrollToTopButton from './components/ScrollToTopButton';

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/enroll/:eventId" element={<Enroll />} />
        <Route path="/register/:eventId" element={<Enroll />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/sponsors/connect" element={<SponsorInquiry />} />
        <Route path="/sponsor-inquiry" element={<SponsorInquiry />} />
      </Routes>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleAnimationFinish = () => {
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      {isLoading ? (
        <PreLoader onAnimationFinish={handleAnimationFinish} />
      ) : (
        <>
          <Navbar />
          <AppContent />
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
