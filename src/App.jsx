import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import RegistrationForm from './pages/RegistrationForm';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Sponsors from './pages/Sponsors';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Promos from './pages/Promos.jsx';
import UpdatesTicker from './components/UpdatesTicker';
import ScrollToTopButton from './components/ScrollToTopButton';

function AppContent() {
  const location = useLocation();
  const showTicker = location.pathname === '/' || location.pathname === '/home';
  const updates = [
    
    'Updated Venue for Digital Arts Event is EDC Lab',
    'Venue for Tech Crisis has been shifted to Smart Lab',
'Registration for Internal NIT Students is Resumed Now !','NIT Nagaland Student can now purchase Club Bundle to participate in any event organized by that Club',
    'Stay Tuned for further Updates',
  ];

  return (
    <>
      {showTicker && (
        <>
          <div className="fixed top-16 left-0 right-0 z-30">
            <UpdatesTicker items={updates} className="shadow-lg" />
          </div>
          <div className="h-10" />
        </>
      )}
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
        <Route path="/register/:eventId" element={<RegistrationForm />} />
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
          <Footer/>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
