import React, { useState, useEffect } from 'react';
import { 
  FaSortDown, FaFilter, FaRedo, FaSignOutAlt, FaFilePdf, FaCheck, FaTimes, 
  FaEye, FaHandshake, FaUserGraduate, FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaSearch 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import backvideo from '../assets/dashboard.jpg';
import { API_BASE_URL, fetchDirectFromSupabase, updateDirectInSupabase } from '../config/api';

const normalizeRegistration = (item) => ({
  registrationId: item.id || item.registrationId,
  id: item.id || item.registrationId,
  eventId: item.event_id || item.eventId || '',
  eventTitle: item.event_title || item.eventTitle || 'Event Registration',
  leaderName: item.full_name || item.leaderName || item.fullName || 'Participant',
  fullName: item.full_name || item.fullName || item.leaderName || 'Participant',
  email: item.email || '',
  phone: item.phone || '',
  college: item.college || '',
  rollNumber: item.roll_number || item.rollNumber || '',
  teamName: item.team_name || item.teamName || '',
  teamMembers: item.team_members || item.teamMembers || [],
  inGameID: item.in_game_id || item.inGameID || '',
  utrNumber: item.utr_number || item.utrNumber || (item.note || '').match(/\[UTR:\s*([^\]]+)\]/i)?.[1] || (item.note || '').match(/UTR(?:\s*[/:]\s*|\s+)([A-Za-z0-9]+)/i)?.[1] || '',
  note: item.note || '',
  imageUrl: item.screenshot_url || item.imageUrl || '',
  screenshot_url: item.screenshot_url || item.imageUrl || '',
  status: item.status || 'Pending',
  registrationTime: item.created_at || item.registrationTime || new Date().toISOString(),
  created_at: item.created_at || item.registrationTime || new Date().toISOString(),
});

const normalizeSponsor = (s) => ({
  id: s.id || s._id,
  _id: s.id || s._id,
  company_name: s.company_name || s.companyName || '',
  companyName: s.company_name || s.companyName || '',
  contact_person: s.contact_person || s.contactPerson || '',
  contactPerson: s.contact_person || s.contactPerson || '',
  email: s.email || '',
  phone: s.phone || '',
  website: s.website || '',
  tier: s.tier || 'Associate Sponsor',
  message: s.message || '',
  status: s.status || 'New',
  created_at: s.created_at || new Date().toISOString(),
});

const eventOptions = [
  'All Time', 'Code Raze', 'Hackathon', 'Aerial Adrenaline', 'Clash of Wheels',
  'Digital Art', 'Bug Hunt', 'Animation', 'BGMI', 'MLBB', 'Free Fire', 
  '3D Modelling', 'Tech Crisis', 'Infinity Hunt', 'Stock Rise'
];

const registrationStatusOptions = ['All', 'Pending', 'Accepted', 'Rejected'];
const sponsorStatusOptions = ['All', 'New', 'Contacted', 'Confirmed', 'Declined'];
const sponsorTierOptions = [
  'All', 'Title Sponsor', 'Co-Sponsor', 'Hackathon Partner', 
  'Event Partner', 'Printing / In-Kind', 'Associate Sponsor'
];

const getSessionData = () => {
  const itemStr = localStorage.getItem('admin_session');
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('admin_session');
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem('admin_session');
    return null;
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Active Tab: 'registrations' | 'sponsors'
  const [activeTab, setActiveTab] = useState('registrations');

  // Registrations state
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filterEvent, setFilterEvent] = useState('All Time');
  const [filterRegStatus, setFilterRegStatus] = useState('All');
  const [regSortBy, setRegSortBy] = useState('latest');
  const [regSearch, setRegSearch] = useState('');
  const [regLoading, setRegLoading] = useState(true);
  const [regError, setRegError] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Sponsors state
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [filterSponsorTier, setFilterSponsorTier] = useState('All');
  const [filterSponsorStatus, setFilterSponsorStatus] = useState('All');
  const [sponsorSearch, setSponsorSearch] = useState('');
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [sponsorError, setSponsorError] = useState(null);
  const [sponsorPreview, setSponsorPreview] = useState(null);

  // Authentication check on mount
  useEffect(() => {
    const sessionData = getSessionData();
    if (!sessionData) {
      navigate('/login', { replace: true });
      return;
    }
    fetchRegistrationData();
    fetchSponsorsData();
  }, [navigate]);

  // Filter & Sort Registrations
  useEffect(() => {
    let filtered = [...registrations];

    if (filterEvent !== 'All Time') {
      filtered = filtered.filter((item) => item.eventTitle === filterEvent);
    }
    if (filterRegStatus !== 'All') {
      filtered = filtered.filter((item) => item.status === filterRegStatus);
    }
    if (regSearch.trim() !== '') {
      const q = regSearch.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.leaderName?.toLowerCase().includes(q) ||
          item.email?.toLowerCase().includes(q) ||
          item.phone?.includes(q) ||
          item.rollNumber?.toLowerCase().includes(q) ||
          item.teamName?.toLowerCase().includes(q) ||
          item.college?.toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.registrationTime || a.created_at || 0);
      const dateB = new Date(b.registrationTime || b.created_at || 0);
      return regSortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredRegistrations(filtered);
  }, [filterEvent, filterRegStatus, regSortBy, regSearch, registrations]);

  // Filter & Sort Sponsors
  useEffect(() => {
    let filtered = [...sponsors];

    if (filterSponsorTier !== 'All') {
      filtered = filtered.filter((s) => s.tier?.toLowerCase() === filterSponsorTier.toLowerCase());
    }
    if (filterSponsorStatus !== 'All') {
      filtered = filtered.filter((s) => s.status?.toLowerCase() === filterSponsorStatus.toLowerCase());
    }
    if (sponsorSearch.trim() !== '') {
      const q = sponsorSearch.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.company_name?.toLowerCase().includes(q) ||
          s.companyName?.toLowerCase().includes(q) ||
          s.contact_person?.toLowerCase().includes(q) ||
          s.contactPerson?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.phone?.includes(q)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA;
    });

    setFilteredSponsors(filtered);
  }, [filterSponsorTier, filterSponsorStatus, sponsorSearch, sponsors]);

  // -------------------------------------------------------------
  // FETCH REGISTRATIONS
  // -------------------------------------------------------------
  const fetchRegistrationData = async () => {
    setRegLoading(true);
    setRegError(null);

    // 1. Try Backend API
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/registrations`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        const rawList = data.registrations || (Array.isArray(data) ? data : []);
        setRegistrations(rawList.map(normalizeRegistration));
        setRegLoading(false);
        return;
      }
    } catch (backendErr) {
      console.warn('[Backend unreachable for registrations. Falling back to direct Supabase...]', backendErr);
    }

    // 2. Direct Supabase Fallback
    try {
      const supabaseData = await fetchDirectFromSupabase('registrations');
      setRegistrations((supabaseData || []).map(normalizeRegistration));
      setRegError(null);
    } catch (supabaseErr) {
      console.error('[Admin Registrations Fetch Error]', supabaseErr);
      setRegError('Unable to load registrations. Please verify internet connection or database configuration.');
      setRegistrations([]);
    } finally {
      setRegLoading(false);
    }
  };

  // -------------------------------------------------------------
  // FETCH SPONSOR INQUIRIES
  // -------------------------------------------------------------
  const fetchSponsorsData = async () => {
    setSponsorLoading(true);
    setSponsorError(null);

    // 1. Try Backend API
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sponsors`, { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        const rawList = data.sponsors || (Array.isArray(data) ? data : []);
        setSponsors(rawList.map(normalizeSponsor));
        setSponsorLoading(false);
        return;
      }
    } catch (backendErr) {
      console.warn('[Backend unreachable for sponsors. Falling back to direct Supabase...]', backendErr);
    }

    // 2. Direct Supabase Fallback
    try {
      const supabaseData = await fetchDirectFromSupabase('sponsor_inquiries');
      setSponsors((supabaseData || []).map(normalizeSponsor));
      setSponsorError(null);
    } catch (supabaseErr) {
      console.error('[Admin Sponsors Fetch Error]', supabaseErr);
      setSponsorError('Unable to load sponsor inquiries.');
      setSponsors([]);
    } finally {
      setSponsorLoading(false);
    }
  };

  // -------------------------------------------------------------
  // STATUS UPDATES
  // -------------------------------------------------------------
  const handleRegStatusUpdate = async (id, newStatus) => {
    const targetItem = registrations.find((r) => (r.id || r._id || r.registrationId) === id);
    const candidateName = targetItem?.fullName || targetItem?.leaderName || 'Candidate';
    const candidateEmail = targetItem?.email || '';

    if (!window.confirm(`Change registration status to "${newStatus}" for ${candidateName}?\n\nAn automated decision email will be forwarded to ${candidateEmail || 'the participant'} via Resend.`)) return;

    let updated = false;
    let emailStatusNotice = '';

    // 1. Try Backend API (which updates DB and sends Resend email)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/registration/status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: newStatus,
          email: candidateEmail,
          fullName: candidateName,
          eventTitle: targetItem?.eventTitle,
        }),
      });
      const resJson = await response.json();
      if (response.ok && resJson.success) {
        updated = true;
        if (resJson.emailSent) {
          emailStatusNotice = `\n\n📧 Decision email forwarded to ${candidateEmail} via Resend.`;
        }
      }
    } catch (backendErr) {
      console.warn('[Backend update failed, attempting direct Supabase update...]', backendErr);
    }

    // 2. Direct Supabase Fallback
    if (!updated) {
      try {
        await updateDirectInSupabase('registrations', id, {
          status: newStatus,
          updated_at: new Date().toISOString(),
        });
        updated = true;
      } catch (err) {
        alert(`Update Failed: ${err.message}`);
        return;
      }
    }

    if (updated) {
      setRegistrations((prev) =>
        prev.map((item) => {
          const currentId = item.id || item._id || item.registrationId;
          return currentId === id ? { ...item, status: newStatus } : item;
        })
      );
      if (previewData && (previewData.id === id || previewData._id === id || previewData.registrationId === id)) {
        setPreviewData((prev) => ({ ...prev, status: newStatus }));
      }
      alert(`Registration status updated to "${newStatus}"!${emailStatusNotice}`);
    }
  };

  const handleManualEmailSend = async (item) => {
    if (!item || !item.email) {
      alert('Candidate email address is missing.');
      return;
    }

    const currentStatus = item.status || 'Pending';
    if (currentStatus !== 'Accepted' && currentStatus !== 'Rejected') {
      alert('Please set status to "Accepted" or "Rejected" before sending a decision email.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: item.email,
          fullName: item.fullName || item.leaderName,
          eventTitle: item.eventTitle,
          status: currentStatus,
          registrationId: item.registrationId || item.id,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`✅ Decision email successfully forwarded to ${item.email} via Resend!`);
      } else {
        alert(`Notice from email service: ${data.message || 'Please check your RESEND_API_KEY in backend/.env'}`);
      }
    } catch (err) {
      alert(`Unable to reach backend email service: ${err.message}. Ensure backend is running with RESEND_API_KEY.`);
    }
  };

  const handleSponsorStatusUpdate = async (id, newStatus) => {
    let updated = false;

    // 1. Try Backend API
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/sponsors/status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        updated = true;
      }
    } catch (backendErr) {
      console.warn('[Backend update failed, attempting direct Supabase update...]', backendErr);
    }

    // 2. Direct Supabase Fallback
    if (!updated) {
      try {
        await updateDirectInSupabase('sponsor_inquiries', id, {
          status: newStatus,
          updated_at: new Date().toISOString(),
        });
        updated = true;
      } catch (err) {
        alert(`Update Failed: ${err.message}`);
        return;
      }
    }

    if (updated) {
      setSponsors((prev) =>
        prev.map((s) => {
          const currentId = s.id || s._id;
          return currentId === id ? { ...s, status: newStatus } : s;
        })
      );
      if (sponsorPreview && (sponsorPreview.id === id || sponsorPreview._id === id)) {
        setSponsorPreview((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.dispatchEvent(new Event('authStatusChange'));
    navigate('/login');
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // -------------------------------------------------------------
  // PDF EXPORTS
  // -------------------------------------------------------------
  const handleDownloadRegPDF = () => {
    if (filteredRegistrations.length === 0) {
      alert('No data to export.');
      return;
    }

    const doc = new jsPDF();
    const title = `Tech Avinya Registration Report: ${filterEvent}`;
    const headers = [['ID', 'Event', 'Leader', 'Phone (10 Digits)', 'College', 'Roll No.', 'Status', 'Registered At']];

    const data = filteredRegistrations.map((item) => [
      String(item.registrationId || item.id || '').slice(0, 8),
      item.eventTitle || '',
      item.leaderName || item.fullName || '',
      item.phone || '',
      item.college || '',
      item.rollNumber || 'N/A',
      item.status || 'Pending',
      formatTimestamp(item.registrationTime || item.created_at),
    ]);

    doc.setFontSize(14);
    doc.text(title, 14, 18);

    autoTable(doc, {
      startY: 23,
      head: headers,
      body: data,
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 2, textColor: [40, 40, 40] },
      headStyles: { fillColor: [15, 30, 60], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 248, 255] },
    });

    doc.save(`TechAvinya_${filterEvent.replace(/\s+/g, '_')}_Registrations.pdf`);
  };

  const handleDownloadSponsorsPDF = () => {
    if (filteredSponsors.length === 0) {
      alert('No sponsor inquiries to export.');
      return;
    }

    const doc = new jsPDF();
    const title = 'Tech Avinya 2026 - Sponsor Inquiries Report';
    const headers = [['Company', 'Contact Person', 'Email', 'Phone (10 Digits)', 'Tier', 'Status', 'Date']];

    const data = filteredSponsors.map((s) => [
      s.company_name || s.companyName || '',
      s.contact_person || s.contactPerson || '',
      s.email || '',
      s.phone || '',
      s.tier || '',
      s.status || 'New',
      formatTimestamp(s.created_at),
    ]);

    doc.setFontSize(14);
    doc.text(title, 14, 18);

    autoTable(doc, {
      startY: 23,
      head: headers,
      body: data,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2.5, textColor: [40, 40, 40] },
      headStyles: { fillColor: [60, 20, 80], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [250, 245, 255] },
    });

    doc.save('TechAvinya_Sponsor_Inquiries.pdf');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
      case 'Confirmed':
        return 'text-green-400 bg-green-500/10 border-green-500';
      case 'Rejected':
      case 'Declined':
        return 'text-red-400 bg-red-500/10 border-red-500';
      case 'Contacted':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500';
      default:
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 text-white px-4 md:px-10 print:pt-0">
      <img className="fixed inset-0 w-screen h-screen object-cover z-[-1]" src={backvideo} alt="Background" />
      <div className="fixed inset-0 bg-black/60 z-[-1]" />

      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 max-w-7xl mx-auto gap-4 print:hidden">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 Graduate tracking-wide">
            ADMIN CONTROL PANEL
          </h1>
          <p className="text-gray-400 text-sm Gluten mt-1">
            Tech Avinya 2026 Database & Communication Manager (Supabase Connected)
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-950/60 border border-red-700/60 text-red-300 hover:bg-red-900/80 px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <FaSignOutAlt />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </header>

      {/* TAB NAVIGATION */}
      <div className="max-w-7xl mx-auto mb-6 flex border-b border-cyan-800/60 print:hidden">
        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'registrations'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FaUserGraduate className="text-lg" />
          <span>Event Enrollments & Registrations</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-cyan-900/60 border border-cyan-700 text-cyan-300 font-bold">
            {registrations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sponsors')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'sponsors'
              ? 'border-purple-400 text-purple-300 bg-purple-950/30'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FaHandshake className="text-lg" />
          <span>Sponsors & Connect Requests</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-purple-900/60 border border-purple-700 text-purple-300 font-bold">
            {sponsors.length}
          </span>
        </button>
      </div>

      {/* ============================================================= */}
      {/* TAB 1: REGISTRATIONS & ENROLLMENTS */}
      {/* ============================================================= */}
      {activeTab === 'registrations' && (
        <>
          {/* Controls Bar */}
          <div className="bg-gray-900/80 p-4 rounded-xl shadow-lg border border-cyan-700/50 mb-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 backdrop-blur-md print:hidden">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search by name, email, 10-digit phone, roll no..."
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-800/90 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter by Event */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-cyan-400 text-sm flex-shrink-0" />
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 border border-cyan-500/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {eventOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center space-x-2">
              <label className="text-gray-400 text-xs uppercase">Status:</label>
              <select
                value={filterRegStatus}
                onChange={(e) => setFilterRegStatus(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 border border-cyan-500/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {registrationStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <FaSortDown className="text-cyan-400 text-sm" />
              <select
                value={regSortBy}
                onChange={(e) => setRegSortBy(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 border border-cyan-500/50 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={fetchRegistrationData}
                className="text-cyan-300 hover:text-white bg-cyan-950/60 border border-cyan-500/50 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <FaRedo className={regLoading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleDownloadRegPDF}
                className="text-red-300 hover:text-white bg-red-950/60 border border-red-500/50 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <FaFilePdf />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="bg-gray-900/80 rounded-xl shadow-2xl overflow-x-auto border border-blue-700/50 max-w-7xl mx-auto backdrop-blur-md">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-800 text-cyan-400 uppercase text-xs leading-normal font-bold">
                  <th className="py-3 px-4 text-left">Event</th>
                  <th className="py-3 px-4 text-left">Leader / Name</th>
                  <th className="py-3 px-4 text-left">Mobile (10 Digits)</th>
                  <th className="py-3 px-4 text-left">Roll No. (10 Digits)</th>
                  <th className="py-3 px-4 text-left">College</th>
                  <th className="py-3 px-4 text-center">Registered At</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center print:hidden">Actions</th>
                  <th className="py-3 px-3 text-center print:hidden">Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs">
                {regError ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-red-400 font-mono">
                      {regError}
                    </td>
                  </tr>
                ) : regLoading ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-cyan-400 font-mono animate-pulse">
                      Loading registrations from Supabase...
                    </td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-gray-500">
                      No enrollments found matching the criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((item) => {
                    const id = item.id || item._id || item.registrationId;
                    return (
                      <tr key={id} className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors">
                        <td className="py-3 px-4 font-semibold text-cyan-300">{item.eventTitle}</td>
                        <td className="py-3 px-4 font-medium text-white">
                          {item.leaderName || item.fullName}
                          {item.teamName && (
                            <span className="block text-[10px] text-gray-400">Team: {item.teamName}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-lime-400 font-semibold">{item.phone}</td>
                        <td className="py-3 px-4 font-mono text-purple-300">
                          {item.rollNumber || <span className="text-gray-600">N/A</span>}
                        </td>
                        <td className="py-3 px-4 text-gray-300 max-w-[150px] truncate">{item.college}</td>
                        <td className="py-3 px-4 text-center font-mono text-gray-400">
                          {formatTimestamp(item.registrationTime || item.created_at)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold border text-[11px] ${getStatusColor(item.status)}`}>
                            {item.status || 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center print:hidden">
                          <div className="flex space-x-3 justify-center">
                            <button
                              onClick={() => handleRegStatusUpdate(id, 'Accepted')}
                              title="Accept Enrollment"
                              className="text-green-400 hover:text-green-300 p-1 hover:bg-green-900/30 rounded"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleRegStatusUpdate(id, 'Rejected')}
                              title="Reject Enrollment"
                              className="text-red-400 hover:text-red-300 p-1 hover:bg-red-900/30 rounded"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center print:hidden">
                          <button
                            onClick={() => {
                              setPreviewData(item);
                              setIsImageZoomed(false);
                            }}
                            title="View Full Details"
                            className="text-cyan-400 hover:text-cyan-200 p-1 hover:bg-cyan-900/30 rounded cursor-pointer"
                          >
                            <FaEye className="text-base" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400 text-right max-w-7xl mx-auto Gluten">
            Total Enrollments: {filteredRegistrations.length} of {registrations.length}
          </p>
        </>
      )}

      {/* ============================================================= */}
      {/* TAB 2: SPONSOR INQUIRIES & CONNECT WITH US */}
      {/* ============================================================= */}
      {activeTab === 'sponsors' && (
        <>
          {/* Sponsors Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-6">
            <div className="bg-gray-900/80 border border-purple-800/40 rounded-xl p-4 backdrop-blur-md">
              <p className="text-xs text-purple-300 uppercase font-semibold">Total Inquiries</p>
              <p className="text-3xl font-extrabold text-white mt-1 Graduate">{sponsors.length}</p>
            </div>
            <div className="bg-gray-900/80 border border-yellow-800/40 rounded-xl p-4 backdrop-blur-md">
              <p className="text-xs text-yellow-300 uppercase font-semibold">New / Unread</p>
              <p className="text-3xl font-extrabold text-yellow-400 mt-1 Graduate">
                {sponsors.filter((s) => (s.status || 'New').toLowerCase() === 'new').length}
              </p>
            </div>
            <div className="bg-gray-900/80 border border-cyan-800/40 rounded-xl p-4 backdrop-blur-md">
              <p className="text-xs text-cyan-300 uppercase font-semibold">Contacted</p>
              <p className="text-3xl font-extrabold text-cyan-400 mt-1 Graduate">
                {sponsors.filter((s) => s.status?.toLowerCase() === 'contacted').length}
              </p>
            </div>
            <div className="bg-gray-900/80 border border-green-800/40 rounded-xl p-4 backdrop-blur-md">
              <p className="text-xs text-green-300 uppercase font-semibold">Confirmed Partners</p>
              <p className="text-3xl font-extrabold text-green-400 mt-1 Graduate">
                {sponsors.filter((s) => s.status?.toLowerCase() === 'confirmed').length}
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-900/80 p-4 rounded-xl shadow-lg border border-purple-700/50 mb-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 backdrop-blur-md print:hidden">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search company, contact person, 10-digit phone, email..."
                value={sponsorSearch}
                onChange={(e) => setSponsorSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-800/90 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Filter by Tier */}
            <div className="flex items-center space-x-2">
              <FaFilter className="text-purple-400 text-sm flex-shrink-0" />
              <select
                value={filterSponsorTier}
                onChange={(e) => setFilterSponsorTier(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 border border-purple-500/50 text-sm text-white focus:outline-none"
              >
                {sponsorTierOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center space-x-2">
              <label className="text-gray-400 text-xs uppercase">Status:</label>
              <select
                value={filterSponsorStatus}
                onChange={(e) => setFilterSponsorStatus(e.target.value)}
                className="p-2 rounded-lg bg-gray-800 border border-purple-500/50 text-sm text-white focus:outline-none"
              >
                {sponsorStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={fetchSponsorsData}
                className="text-purple-300 hover:text-white bg-purple-950/60 border border-purple-500/50 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <FaRedo className={sponsorLoading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleDownloadSponsorsPDF}
                className="text-red-300 hover:text-white bg-red-950/60 border border-red-500/50 px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <FaFilePdf />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Sponsors Table */}
          <div className="bg-gray-900/80 rounded-xl shadow-2xl overflow-x-auto border border-purple-800/50 max-w-7xl mx-auto backdrop-blur-md">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-800 text-purple-300 uppercase text-xs leading-normal font-bold">
                  <th className="py-3 px-4 text-left">Company / Organization</th>
                  <th className="py-3 px-4 text-left">Contact Person</th>
                  <th className="py-3 px-4 text-left">Phone (10 Digits)</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Tier</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Submitted At</th>
                  <th className="py-3 px-3 text-center print:hidden">Update Status</th>
                  <th className="py-3 px-3 text-center print:hidden">View Proposal</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs">
                {sponsorError ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-red-400 font-mono">
                      {sponsorError}
                    </td>
                  </tr>
                ) : sponsorLoading ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-purple-400 font-mono animate-pulse">
                      Loading sponsor inquiries from Supabase...
                    </td>
                  </tr>
                ) : filteredSponsors.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-gray-500">
                      No sponsor inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredSponsors.map((s) => {
                    const id = s.id || s._id;
                    const company = s.company_name || s.companyName;
                    const contact = s.contact_person || s.contactPerson;
                    return (
                      <tr key={id} className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                          <FaBuilding className="text-purple-400 flex-shrink-0" />
                          <span>{company}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-cyan-300">{contact}</td>
                        <td className="py-3 px-4 font-mono text-lime-400 font-semibold">
                          <a href={`tel:${s.phone}`} className="hover:underline">
                            {s.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <a href={`mailto:${s.email}`} className="text-gray-300 hover:text-cyan-300 underline">
                            {s.email}
                          </a>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-900/50 border border-purple-500 text-purple-200">
                            {s.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold border text-[11px] ${getStatusColor(s.status)}`}>
                            {s.status || 'New'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-gray-400">
                          {formatTimestamp(s.created_at)}
                        </td>
                        <td className="py-3 px-3 text-center print:hidden">
                          <select
                            value={s.status || 'New'}
                            onChange={(e) => handleSponsorStatusUpdate(id, e.target.value)}
                            className="bg-gray-800 border border-purple-600/60 rounded px-2 py-1 text-xs text-white focus:outline-none cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Declined">Declined</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-center print:hidden">
                          <button
                            onClick={() => setSponsorPreview(s)}
                            className="text-purple-400 hover:text-purple-200 p-1 hover:bg-purple-900/30 rounded cursor-pointer"
                            title="View Message / Proposal"
                          >
                            <FaEye className="text-base" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400 text-right max-w-7xl mx-auto Gluten">
            Total Inquiries: {filteredSponsors.length} of {sponsors.length}
          </p>
        </>
      )}

      {/* ============================================================= */}
      {/* REGISTRATION PREVIEW MODAL */}
      {/* ============================================================= */}
      {previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-cyan-500/60 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-gray-800 pb-3">
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 Graduate">
                  {previewData.teamName || previewData.leaderName || previewData.fullName}
                </h2>
                <p className="text-xs text-gray-400 Gluten">{previewData.eventTitle}</p>
              </div>
              <button
                onClick={() => setPreviewData(null)}
                className="text-gray-400 hover:text-white text-3xl font-light cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Payment Proof Screenshot */}
            {(previewData.imageUrl || previewData.screenshot_url) ? (
              <div className="border border-cyan-800/60 rounded-lg p-3 bg-gray-950/60">
                <p className="text-xs text-cyan-400 uppercase font-semibold mb-2">Payment Verification Screenshot:</p>
                <img
                  src={previewData.imageUrl || previewData.screenshot_url}
                  alt="Payment Proof"
                  onClick={() => setIsImageZoomed(true)}
                  className="w-full h-auto max-h-56 object-contain rounded-lg cursor-zoom-in hover:opacity-90 transition-all border border-gray-800"
                />
                <p className="text-[10px] text-gray-500 text-center mt-1">Click image to enlarge</p>
              </div>
            ) : (
              <div className="p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg text-xs text-gray-400 text-center">
                No payment screenshot uploaded.
              </div>
            )}

            {/* Candidate Details */}
            <div className="space-y-2 text-xs border-t border-gray-800 pt-3">
              <p>
                <span className="text-gray-400 font-semibold">Participant / Leader:</span>{' '}
                <span className="text-white font-medium">{previewData.leaderName || previewData.fullName}</span>
              </p>
              <p>
                <span className="text-gray-400 font-semibold">Mobile (10 Digits):</span>{' '}
                <a href={`tel:${previewData.phone}`} className="text-lime-400 font-mono font-bold hover:underline">
                  {previewData.phone}
                </a>
              </p>
              <p>
                <span className="text-gray-400 font-semibold">Email:</span>{' '}
                <a href={`mailto:${previewData.email}`} className="text-cyan-300 hover:underline">
                  {previewData.email}
                </a>
              </p>
              <p>
                <span className="text-gray-400 font-semibold">College / University:</span>{' '}
                <span className="text-white">{previewData.college}</span>
              </p>
              <p>
                <span className="text-gray-400 font-semibold">Roll No. / Reg No. (10 Digits):</span>{' '}
                <span className="text-purple-300 font-mono font-bold">{previewData.rollNumber || 'N/A'}</span>
              </p>
              {previewData.utrNumber && (
                <div className="bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/30 my-2">
                  <span className="text-cyan-300 font-semibold block text-xs font-mono uppercase tracking-wider">UTR / UPI Transaction ID:</span>
                  <span className="text-emerald-300 font-mono font-bold tracking-wider text-sm select-all">{previewData.utrNumber}</span>
                </div>
              )}
              {previewData.inGameID && (
                <p>
                  <span className="text-gray-400 font-semibold">In-Game Character ID:</span>{' '}
                  <span className="text-amber-400 font-mono">{previewData.inGameID}</span>
                </p>
              )}
              {previewData.note && (
                <p className="bg-gray-800/50 p-2 rounded text-gray-300">
                  <span className="text-cyan-400 font-semibold block mb-0.5">Note from participant:</span>
                  {previewData.note}
                </p>
              )}
              <p>
                <span className="text-gray-400 font-semibold">Current Status:</span>{' '}
                <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] ${getStatusColor(previewData.status)}`}>
                  {previewData.status}
                </span>
              </p>
            </div>

            {/* Team Members List */}
            {previewData.teamMembers && previewData.teamMembers.length > 0 && (
              <div className="border-t border-gray-800 pt-3">
                <p className="text-xs text-cyan-400 font-bold uppercase mb-2">Team Members ({previewData.teamMembers.length}):</p>
                <ul className="space-y-1.5">
                  {previewData.teamMembers.map((m, idx) => (
                    <li key={idx} className="bg-gray-800/50 p-2 rounded text-xs flex justify-between items-center">
                      <span className="font-semibold text-white">{m.name}</span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        {m.rollNumber && `Roll: ${m.rollNumber}`}
                        {m.inGameID && ` | IGN: ${m.inGameID}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Status Quick Actions */}
            <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">Change Status:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRegStatusUpdate(previewData.id || previewData._id || previewData.registrationId, 'Accepted')}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Accept & Send Email
                </button>
                <button
                  onClick={() => handleRegStatusUpdate(previewData.id || previewData._id || previewData.registrationId, 'Rejected')}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Reject & Send Email
                </button>
                <button
                  onClick={() => handleRegStatusUpdate(previewData.id || previewData._id || previewData.registrationId, 'Pending')}
                  className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  Set Pending
                </button>
              </div>
            </div>

            {/* Manual Resend Email Trigger */}
            <div className="border-t border-gray-800/80 pt-3 flex justify-between items-center bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
              <span className="text-xs text-cyan-300 font-mono">Resend Email:</span>
              <button
                type="button"
                onClick={() => handleManualEmailSend(previewData)}
                className="px-3 py-1.5 rounded-md bg-cyan-500 text-black hover:bg-cyan-400 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <FaEnvelope className="w-3 h-3" />
                Forward {previewData.status === 'Accepted' ? 'Confirmation' : previewData.status === 'Rejected' ? 'Rejection' : 'Status'} Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* SPONSOR PREVIEW MODAL */}
      {/* ============================================================= */}
      {sponsorPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-purple-500/60 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-gray-800 pb-3">
              <div>
                <h2 className="text-2xl font-bold text-purple-300 Graduate">
                  {sponsorPreview.company_name || sponsorPreview.companyName}
                </h2>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-900/60 border border-purple-400 text-purple-200">
                  {sponsorPreview.tier}
                </span>
              </div>
              <button
                onClick={() => setSponsorPreview(null)}
                className="text-gray-400 hover:text-white text-3xl font-light cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50">
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Contact Person:</p>
                  <p className="text-white font-medium text-sm">
                    {sponsorPreview.contact_person || sponsorPreview.contactPerson}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Mobile (10 Digits):</p>
                  <a href={`tel:${sponsorPreview.phone}`} className="text-lime-400 font-mono font-bold text-sm hover:underline">
                    {sponsorPreview.phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Business Email:</p>
                  <a href={`mailto:${sponsorPreview.email}`} className="text-cyan-300 hover:underline">
                    {sponsorPreview.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold mb-0.5">Website:</p>
                  {sponsorPreview.website ? (
                    <a
                      href={sponsorPreview.website.startsWith('http') ? sponsorPreview.website : `https://${sponsorPreview.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 underline truncate block hover:text-cyan-100"
                    >
                      {sponsorPreview.website}
                    </a>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )}
                </div>
              </div>

              {/* Message / Proposal Content */}
              <div>
                <p className="text-purple-300 font-bold uppercase text-xs mb-1">Inquiry / Proposal Details:</p>
                <div className="bg-gray-950/70 p-4 rounded-lg border border-purple-900/40 text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {sponsorPreview.message || 'No additional message was provided by the sponsor.'}
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-400 pt-2">
                <span>Submitted: {formatTimestamp(sponsorPreview.created_at)}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold border text-xs ${getStatusColor(sponsorPreview.status)}`}>
                  {sponsorPreview.status || 'New'}
                </span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="border-t border-gray-800 pt-4 flex gap-3">
              <a
                href={`mailto:${sponsorPreview.email}?subject=Partnership%20with%20Tech%20Avinya%202026`}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-center font-bold text-xs uppercase flex items-center justify-center gap-2"
              >
                <FaEnvelope /> Email Sponsor
              </a>
              <a
                href={`tel:${sponsorPreview.phone}`}
                className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg text-center font-bold text-xs uppercase flex items-center justify-center gap-2"
              >
                <FaPhone /> Call Sponsor
              </a>
            </div>

            {/* Status Change */}
            <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400">Update Status:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSponsorStatusUpdate(sponsorPreview.id || sponsorPreview._id, 'Contacted')}
                  className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Contacted
                </button>
                <button
                  onClick={() => handleSponsorStatusUpdate(sponsorPreview.id || sponsorPreview._id, 'Confirmed')}
                  className="px-2.5 py-1 bg-green-700 hover:bg-green-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Confirmed
                </button>
                <button
                  onClick={() => handleSponsorStatusUpdate(sponsorPreview.id || sponsorPreview._id, 'Declined')}
                  className="px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  Declined
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN IMAGE ZOOM MODAL */}
      {isImageZoomed && previewData && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 cursor-zoom-out"
          onClick={() => setIsImageZoomed(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageZoomed(false);
            }}
            className="absolute top-4 right-4 text-white text-4xl p-2 rounded-full hover:bg-white/20 transition-all cursor-pointer z-[70]"
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <img
            src={previewData.imageUrl || previewData.screenshot_url}
            alt="Payment Proof Full View"
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}