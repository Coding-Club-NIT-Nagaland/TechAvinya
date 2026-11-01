import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaUsers, FaGamepad, FaUniversity, FaPhone, FaEnvelope, FaIdCard, 
  FaQrcode, FaCheckCircle, FaExclamationCircle, FaCopy, FaCheck, FaPrint, 
  FaTicketAlt, FaCalendarAlt, FaTimes, FaArrowRight, FaTrophy, FaMapMarkerAlt,
  FaFileImage, FaTrashAlt, FaClock, FaEye
} from 'react-icons/fa';
import TechfestCyberBackground from '../components/TechfestCyberBackground';
import { API_BASE_URL, insertDirectToSupabase, uploadScreenshotDirect } from '../config/api';

const ALL_EVENTS = [
  { 
    id: 'code', 
    title: 'Code Raze', 
    club: 'Codessy Club',
    minMembers: 1, 
    maxMembers: 1, 
    feeNIT: '₹ 99/-', 
    feeOutside: '₹ 299/-', 
    prize: '₹ 20,000/-', 
    category: 'Coding', 
    date: '5 Nov 2026',
    time: '9:00am - 11:00am',
    venue: 'Smart Lab, NITN',
    image: '/event/CODE RAZE.jpeg',
    tag: 'Competitive Coding'
  },
  { 
    id: 'hackathon', 
    title: 'Hackathon', 
    club: 'Codessy Club',
    minMembers: 2, 
    maxMembers: 5, 
    feeNIT: '₹ 199/-', 
    feeOutside: '₹ 499/-', 
    prize: '₹ 22,000/-', 
    category: 'Coding', 
    date: '6 Nov 2026',
    time: '12:00pm - 6:00pm',
    venue: 'VCH, NITN',
    image: '/event/HACKATHON.jpeg',
    tag: 'Software Prototyping Sprint'
  },
  { 
    id: 'modelling', 
    title: 'Genesis 3D', 
    club: 'Codessy Club',
    minMembers: 1, 
    maxMembers: 3, 
    feeNIT: '₹ 99/-', 
    feeOutside: '₹ 299/-', 
    prize: '₹ 20,000/-', 
    category: 'Design', 
    date: '5 Nov 2026',
    time: '2:00pm - 6:00pm',
    venue: 'VCH, NITN',
    image: '/event/GENESIS 3D.jpeg',
    tag: '3D Sculpting & Simulation'
  },
  { 
    id: 'aerial', 
    title: 'Hardware Hackathon', 
    club: 'Robotics Club',
    minMembers: 1, 
    maxMembers: 1, 
    feeNIT: '₹ 199/-', 
    feeOutside: '₹ 499/-', 
    prize: '₹ 25,000/-', 
    category: 'Robotics', 
    date: '6 Nov 2026',
    time: '9:00am - 12:00pm',
    venue: 'EDC Lab, NITN',
    image: '/event/HARDWARE HACKATHON.jpeg',
    tag: 'Think. Solve. Build.'
  },
  { 
    id: 'clash', 
    title: 'Robo Track Challenge', 
    club: 'Robotics Club',
    minMembers: 1, 
    maxMembers: 5, 
    feeNIT: '₹ 199/-', 
    feeOutside: '₹ 499/-', 
    prize: '₹ 20,000/-', 
    category: 'Robotics', 
    date: '5 Nov 2026',
    time: '9:00am - 11:00am',
    venue: 'NITN Football Ground',
    image: '/event/ROBO TRACK.jpeg',
    tag: 'RC Speed & Obstacle Track'
  },
  { 
    id: 'bgmi', 
    title: 'BGMI Tournament', 
    club: 'Esports Arena',
    minMembers: 4, 
    maxMembers: 4, 
    feeNIT: '₹ 199/- (Team)', 
    feeOutside: '₹ 500/- (Team)', 
    prize: '₹ 20,000/-', 
    category: 'Esports', 
    date: '5 Nov 2026',
    time: '10:00am - 3:00pm',
    venue: '2A & 2B, NITN',
    image: '/event/BGMI.jpeg',
    tag: 'Squad Battle Royale'
  },
  { 
    id: 'free', 
    title: 'Free Fire', 
    club: 'Esports Arena',
    minMembers: 4, 
    maxMembers: 4, 
    feeNIT: '₹ 199/- (Team)', 
    feeOutside: '₹ 500/- (Team)', 
    prize: '₹ 20,000/-', 
    category: 'Esports', 
    date: '6 Nov 2026',
    time: '10:00am - 3:00pm',
    venue: '2A & 2B, NITN',
    image: '/event/FREE FIRE.jpeg',
    tag: 'Survival Showdown'
  },
  { 
    id: 'mlbb', 
    title: 'Community Heroes (MLBB)', 
    club: 'Esports Arena',
    minMembers: 5, 
    maxMembers: 5, 
    feeNIT: '₹ 199/-', 
    feeOutside: '₹ 500/-', 
    prize: '₹ 30,000 + 10K Dias', 
    category: 'Esports', 
    date: '6 Nov 2026',
    time: '2:00pm - 6:00pm',
    venue: 'NIT Nagaland Campus',
    image: '/event/MLBB.jpeg',
    tag: '5v5 MOBA Draft'
  },
  { 
    id: 'digital', 
    title: 'Integration Bee', 
    club: 'Quants Club',
    minMembers: 1, 
    maxMembers: 1, 
    feeNIT: '₹ 70/-', 
    feeOutside: '₹ 99/-', 
    prize: '₹ 10,000/-', 
    category: 'Quants', 
    date: '5 Nov 2026',
    time: '2:30pm - 4:30pm',
    venue: 'Smart Lab, NITN',
    image: '/event/INTEGRAL BE.jpeg',
    tag: 'Calculus & Logic Duel'
  },
  { 
    id: 'infinity', 
    title: 'Quants Challenge', 
    club: 'Quants Club',
    minMembers: 1, 
    maxMembers: 2, 
    feeNIT: '₹ 70/-', 
    feeOutside: '₹ 129/-', 
    prize: '₹ 10,000/-', 
    category: 'Quants', 
    date: '5 Nov 2026',
    time: '11:00am - 2:00pm',
    venue: 'VCH, NITN',
    image: '/event/QUANTS CHALLENGE.jpeg',
    tag: 'Logic Puzzles & Riddles'
  },
  { 
    id: 'tech', 
    title: 'Tech Crisis', 
    club: 'E-Cell',
    minMembers: 1, 
    maxMembers: 3, 
    feeNIT: '₹ 129/-', 
    feeOutside: '₹ 349/-', 
    prize: '₹ 10,000/-', 
    category: 'E-Cell', 
    date: '6 Nov 2026',
    time: '1:30pm - 3:30pm',
    venue: 'Smart Lab, NITN',
    image: '/event/TECH CRISIS.jpeg',
    tag: 'Technical Case Study'
  },
  { 
    id: 'stock', 
    title: 'Stock Race', 
    club: 'E-Cell',
    minMembers: 1, 
    maxMembers: 1, 
    feeNIT: '₹ 99/-', 
    feeOutside: '₹ 149/-', 
    prize: '₹ 10,000/-', 
    category: 'E-Cell', 
    date: '6 Nov 2026',
    time: '9:00am - 4:00pm',
    venue: 'Smart Lab, NITN',
    image: '/event/STOCK RAZE.jpeg',
    tag: 'Stock Market Simulation'
  },
];

const ESPORTS_IDS = ['bgmi', 'mlbb', 'free'];

export default function Enroll() {
  const { eventId: paramEventId } = useParams();
  const navigate = useNavigate();

  // Find initial event or default to first
  const [selectedEventId, setSelectedEventId] = useState(paramEventId || 'code');
  const currentEvent = useMemo(() => {
    return ALL_EVENTS.find((e) => e.id === selectedEventId) || ALL_EVENTS[0];
  }, [selectedEventId]);

  useEffect(() => {
    if (paramEventId && ALL_EVENTS.some((e) => e.id === paramEventId)) {
      setSelectedEventId(paramEventId);
    }
  }, [paramEventId]);

  const isTeamEvent = currentEvent.maxMembers > 1;
  const isEsports = ESPORTS_IDS.includes(currentEvent.id);

  // Form state
  const [collegeAffiliation, setCollegeAffiliation] = useState('NIT Nagaland');
  const [otherCollegeName, setOtherCollegeName] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNumber: '',
    teamName: '',
    inGameID: '',
    utrNumber: '',
    note: '',
  });

  // Dynamic team members (for slots beyond the leader)
  const initialMemberStructure = useMemo(() => ({ name: '', rollNumber: '', inGameID: '' }), []);
  const initialMembersCount = isTeamEvent ? Math.max(0, currentEvent.minMembers - 1) : 0;
  const [teamMembers, setTeamMembers] = useState(
    Array.from({ length: initialMembersCount }, () => ({ ...initialMemberStructure }))
  );

  // Re-adjust member slots when event changes
  useEffect(() => {
    if (isTeamEvent) {
      const minSlots = Math.max(0, currentEvent.minMembers - 1);
      setTeamMembers(Array.from({ length: minSlots }, () => ({ ...initialMemberStructure })));
    } else {
      setTeamMembers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventId]);

  const [screenshotFile, setScreenshotFile] = useState(null);
  const [previewScreenshotUrl, setPreviewScreenshotUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submittedEnrollment, setSubmittedEnrollment] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopyRefId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyField = (text, fieldKey) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleCopyAllBankDetails = () => {
    const allDetails = `Bank Name: State Bank of India (SBI)
Account Holder: AYUSH KUMAR
Account Number: 45486733847
IFSC Code: SBIN0007543`;
    handleCopyField(allDetails, 'all');
  };

  // Input change handler with 10-digit validation logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));

      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setErrors((prev) => ({ ...prev, phone: 'Mobile number must be exactly 10 digits.' }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      }
      return;
    }

    if (name === 'rollNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));

      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setErrors((prev) => ({ ...prev, rollNumber: 'Roll / Registration number must be exactly 10 digits.' }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.rollNumber;
          return next;
        });
      }
      return;
    }

    if (name === 'utrNumber') {
      const cleanVal = value.trim();
      setFormData((prev) => ({ ...prev, [name]: cleanVal }));

      if (cleanVal.length > 0 && cleanVal.length < 6) {
        setErrors((prev) => ({ ...prev, utrNumber: 'Please enter a valid UTR / UPI Transaction ID (min 6 characters).' }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.utrNumber;
          return next;
        });
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Team member change handler
  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    if (field === 'rollNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      updated[index][field] = digitsOnly;
      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setErrors((prev) => ({ ...prev, [`memberRoll_${index}`]: `Member ${index + 2} Roll number must be 10 digits.` }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[`memberRoll_${index}`];
          return next;
        });
      }
    } else {
      updated[index][field] = value;
    }
    setTeamMembers(updated);
  };

  const handleAddMember = () => {
    if (teamMembers.length < currentEvent.maxMembers - 1) {
      setTeamMembers([...teamMembers, { ...initialMemberStructure }]);
    }
  };

  const handleRemoveMember = (index) => {
    if (teamMembers.length > Math.max(0, currentEvent.minMembers - 1)) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      setPreviewScreenshotUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    if (previewScreenshotUrl) {
      URL.revokeObjectURL(previewScreenshotUrl);
      setPreviewScreenshotUrl(null);
    }
  };

  // Active fee based on affiliation
  const activeFee = collegeAffiliation === 'NIT Nagaland' ? currentEvent.feeNIT : currentEvent.feeOutside;

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // 1. Validate Mobile Number (Must be exactly 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Mobile number must be exactly 10 digits.' }));
      setStatusMessage({ type: 'error', text: 'Mobile number must be exactly 10 digits.' });
      return;
    }

    // 2. Validate Roll Number (Required if NIT Nagaland, or if entered, must be 10 digits)
    if (collegeAffiliation === 'NIT Nagaland') {
      if (!/^\d{10}$/.test(formData.rollNumber)) {
        setErrors((prev) => ({ ...prev, rollNumber: 'Roll / Registration number must be exactly 10 digits.' }));
        setStatusMessage({ type: 'error', text: 'Roll / Registration number must be exactly 10 digits for NIT Nagaland students.' });
        return;
      }
    } else if (formData.rollNumber && !/^\d{10}$/.test(formData.rollNumber)) {
      setErrors((prev) => ({ ...prev, rollNumber: 'Roll / Registration number must be exactly 10 digits.' }));
      setStatusMessage({ type: 'error', text: 'Roll / Registration number must be exactly 10 digits.' });
      return;
    }

    // 3. Validate Team Members' Roll Numbers
    for (let i = 0; i < teamMembers.length; i++) {
      const roll = teamMembers[i].rollNumber;
      if (roll && !/^\d{10}$/.test(roll)) {
        setStatusMessage({ type: 'error', text: `Team Member ${i + 2} Roll Number must be exactly 10 digits.` });
        return;
      }
    }

    // 4. Validate UTR / UPI Transaction ID
    if (!formData.utrNumber || formData.utrNumber.trim().length < 6) {
      setErrors((prev) => ({ ...prev, utrNumber: 'Please provide the 12-digit UTR or UPI Transaction ID from your payment.' }));
      setStatusMessage({ type: 'error', text: 'Please provide the 12-digit UTR or UPI Transaction ID.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const combinedNote = `[UTR: ${formData.utrNumber.trim()}]${formData.note.trim() ? ` | ${formData.note.trim()}` : ''}`;

      const data = new FormData();
      data.append('eventId', currentEvent.id);
      data.append('eventTitle', currentEvent.title);
      data.append('fullName', formData.fullName.trim());
      data.append('email', formData.email.trim());
      data.append('phone', formData.phone.trim());
      data.append('college', collegeAffiliation === 'NIT Nagaland' ? 'NIT Nagaland' : (otherCollegeName || 'Other College/University'));
      data.append('rollNumber', formData.rollNumber.trim());
      data.append('teamName', isTeamEvent ? formData.teamName.trim() : '');
      data.append('inGameID', isEsports ? formData.inGameID.trim() : '');
      data.append('utrNumber', formData.utrNumber.trim());
      data.append('note', combinedNote);

      const cleanMembers = teamMembers
        .filter((m) => m.name && m.name.trim() !== '')
        .map((m) => ({
          name: m.name.trim(),
          rollNumber: m.rollNumber ? m.rollNumber.trim() : '',
          inGameID: m.inGameID ? m.inGameID.trim() : '',
        }));
      data.append('teamMembers', JSON.stringify(cleanMembers));

      if (screenshotFile) {
        data.append('screenshot', screenshotFile);
      }

      let isSuccess = false;
      let assignedRefId = null;

      // 1. Try Backend API with 2.5s fast timeout so the request never hangs
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const response = await fetch(`${API_BASE_URL}/api/enroll`, {
          method: 'POST',
          body: data,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const result = await response.json();

        if (response.ok && result.success) {
          isSuccess = true;
          assignedRefId = result.registration?.id || result.registration?.registrationId;
        } else if (response.status === 400) {
          setStatusMessage({
            type: 'error',
            text: result.message || 'Validation error. Please verify your details.',
          });
          return;
        }
      } catch (backendErr) {
        console.warn('[Backend submit unreachable, attempting direct Supabase insert...]', backendErr);
      }

      // 2. Direct Supabase Fallback
      if (!isSuccess) {
        try {
          let screenshotUrl = null;
          if (screenshotFile) {
            screenshotUrl = await uploadScreenshotDirect(screenshotFile);
          }

          const record = {
            event_id: currentEvent.id,
            event_title: currentEvent.title,
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            college: collegeAffiliation === 'NIT Nagaland' ? 'NIT Nagaland' : (otherCollegeName || 'Other College/University'),
            roll_number: formData.rollNumber.trim() || null,
            team_name: isTeamEvent ? formData.teamName.trim() : null,
            team_members: cleanMembers,
            in_game_id: isEsports ? formData.inGameID.trim() : null,
            note: combinedNote,
            screenshot_url: screenshotUrl,
            status: 'Pending',
          };

          const inserted = await insertDirectToSupabase('registrations', record);
          isSuccess = true;
          if (inserted && inserted[0] && inserted[0].id) {
            assignedRefId = inserted[0].id;
          }
        } catch (supabaseErr) {
          console.error('[Supabase Direct Insert Error]', supabaseErr);
          setStatusMessage({
            type: 'error',
            text: 'Unable to submit enrollment. Please verify your internet connection.',
          });
          return;
        }
      }

      if (isSuccess) {
        const fallbackRef = `TA26-${currentEvent.id.toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const finalRefId = assignedRefId ? String(assignedRefId).slice(0, 13).toUpperCase() : fallbackRef;

        setSubmittedEnrollment({
          referenceId: finalRefId,
          eventId: currentEvent.id,
          eventTitle: currentEvent.title,
          eventCategory: currentEvent.category,
          eventDate: currentEvent.date,
          prize: currentEvent.prize,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          college: collegeAffiliation === 'NIT Nagaland' ? 'NIT Nagaland' : (otherCollegeName || 'Other College/University'),
          rollNumber: formData.rollNumber.trim() || 'N/A',
          teamName: isTeamEvent ? formData.teamName.trim() : null,
          teamMembers: cleanMembers,
          inGameID: isEsports ? formData.inGameID.trim() : null,
          utrNumber: formData.utrNumber.trim(),
          entryFee: activeFee,
          hasScreenshot: Boolean(screenshotFile),
          timestamp: new Date().toISOString(),
        });

        // Reset form inputs for clean state
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          rollNumber: '',
          teamName: '',
          inGameID: '',
          utrNumber: '',
          note: '',
        });
        setScreenshotFile(null);
        setPreviewScreenshotUrl(null);
      }
    } catch (err) {
      console.error('[Submission General Error]', err);
      setStatusMessage({
        type: 'error',
        text: 'An unexpected error occurred during submission. Please retry.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white pt-24 pb-20 overflow-hidden bg-[#020409]">
      {/* Signature IIT Bombay Techfest Cyber Background */}
      <TechfestCyberBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/40 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <FaTicketAlt className="w-3.5 h-3.5 text-cyan-400" />
            Official Event Registration Portal
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-500 drop-shadow-[0_10px_25px_rgba(6,182,212,0.4)]">
            Enroll in Tech Avinya '26
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-cyan-200/80 font-light mt-2">
            Secure your spot in NIT Nagaland's premier technical competitions. Select your event below to proceed.
          </p>
        </div>

        {/* Quick Event Selection Horizontal Scroller */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Select Competition Track
            </span>
            <span className="text-xs text-gray-400 font-mono">12 Official Tracks</span>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-cyan-500/40">
            {ALL_EVENTS.map((event) => {
              const isSelected = event.id === currentEvent.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    setSelectedEventId(event.id);
                    navigate(`/enroll/${event.id}`, { replace: true });
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-purple-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                      : 'bg-[#040817]/70 border-white/10 text-gray-300 hover:border-cyan-500/50 hover:bg-black/60'
                  }`}
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-10 h-10 rounded-lg object-cover border border-cyan-400/30 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-bold tracking-wide leading-tight">{event.title}</p>
                    <p className="text-[11px] font-mono text-cyan-300/80">{event.category} • {event.prize}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Notification Alerts */}
        {statusMessage && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-md shadow-xl border ${
            statusMessage.type === 'error'
              ? 'bg-red-950/80 border-red-500/60 text-red-200 shadow-red-500/20'
              : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 shadow-emerald-500/20'
          }`}>
            {statusMessage.type === 'error' ? (
              <FaExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            ) : (
              <FaCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{statusMessage.text}</p>
          </div>
        )}

        {/* Main Enrollment Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Selected Event Spotlight Card */}
          <div className="lg:col-span-5 w-full space-y-6">
            <div className="relative rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#0a1128]/85 via-[#050b1a]/90 to-[#02050e]/95 p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-cyan-500/30 mb-5 shadow-lg bg-black">
                <img 
                  src={currentEvent.image} 
                  alt={currentEvent.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/80 border border-cyan-400/40 text-cyan-300 backdrop-blur-md">
                  {currentEvent.club}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-900/80 border border-purple-400/40 text-purple-200 backdrop-blur-md">
                  {currentEvent.category}
                </div>
              </div>

              <div className="border-b border-white/10 pb-4 mb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {currentEvent.title}
                </h2>
                <p className="text-xs font-mono text-cyan-400 mt-1">{currentEvent.tag}</p>
              </div>

              {/* Prize Pool Callout */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-yellow-950/30 border border-amber-500/40 mb-4 shadow-inner">
                <div className="flex items-center gap-2 text-amber-300">
                  <FaTrophy className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Prize Pool</span>
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-amber-300">
                  {currentEvent.prize}
                </span>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm bg-black/40 p-4 rounded-xl border border-white/5 mb-5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-cyan-400" />
                    Date
                  </span>
                  <span className="text-white font-bold">{currentEvent.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <FaClock className="w-3.5 h-3.5 text-sky-400" />
                    Time
                  </span>
                  <span className="text-gray-200">{currentEvent.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-rose-400" />
                    Venue
                  </span>
                  <span className="text-gray-200">{currentEvent.venue}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <FaUsers className="w-3.5 h-3.5 text-purple-400" />
                    Participation
                  </span>
                  <span className="text-white font-bold">
                    {isTeamEvent ? `Team (${currentEvent.minMembers}-${currentEvent.maxMembers} Members)` : 'Individual (Solo)'}
                  </span>
                </div>
              </div>

              {/* Live Fee Calculator */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-400/40">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-mono text-gray-300 tracking-wider">Applicable Entry Fee</span>
                    <p className="text-xs text-cyan-300/80 font-mono mt-0.5">
                      {collegeAffiliation === 'NIT Nagaland' ? 'NIT Nagaland Student Rate' : 'Outside Participant Rate'}
                    </p>
                  </div>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-sky-400">
                    {activeFee}
                  </span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <Link
                  to={`/events/${currentEvent.id}`}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1.5"
                >
                  View full rulebook & event details &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Multi-Section Registration Form */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a1128]/85 via-[#050b1a]/90 to-[#02050e]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
              
              {/* SECTION 1: Affiliation & Basic Info */}
              <div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm">
                    01
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      Participant Identification
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">College affiliation & primary contact details</p>
                  </div>
                </div>

                {/* College Affiliation Selector */}
                <div className="mb-5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                    College / Institute Affiliation *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCollegeAffiliation('NIT Nagaland')}
                      className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        collegeAffiliation === 'NIT Nagaland'
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      <FaUniversity className="w-4 h-4 text-cyan-400" />
                      NIT Nagaland Student
                    </button>

                    <button
                      type="button"
                      onClick={() => setCollegeAffiliation('Other')}
                      className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        collegeAffiliation === 'Other'
                          ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:border-purple-500/40 hover:text-white'
                      }`}
                    >
                      <FaUniversity className="w-4 h-4 text-purple-400" />
                      Other College / University
                    </button>
                  </div>
                </div>

                {collegeAffiliation === 'Other' && (
                  <div className="mb-5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5">
                      Enter College / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={otherCollegeName}
                      onChange={(e) => setOtherCollegeName(e.target.value)}
                      placeholder="e.g. Nagaland University, IIT Guwahati..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <FaUser className="w-3 h-3 text-cyan-400" />
                      {isTeamEvent ? 'Team Leader Name *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexander Roy"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <FaEnvelope className="w-3 h-3 text-cyan-400" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Phone (10 digits) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FaPhone className="w-3 h-3 text-cyan-400" />
                        Mobile Number *
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400/80">10 digits</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                      }`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1 font-mono">{errors.phone}</p>}
                  </div>

                  {/* Roll Number (10 digits) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FaIdCard className="w-3 h-3 text-cyan-400" />
                        Roll / Reg Number {collegeAffiliation === 'NIT Nagaland' ? '*' : '(Optional)'}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400/80">10 digits</span>
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      required={collegeAffiliation === 'NIT Nagaland'}
                      maxLength={10}
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit roll number"
                      className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white placeholder-gray-500 text-sm focus:outline-none transition-all ${
                        errors.rollNumber
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                      }`}
                    />
                    {errors.rollNumber && <p className="text-red-400 text-xs mt-1 font-mono">{errors.rollNumber}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Team Members & Esports IDs (Conditional) */}
              {(isTeamEvent || isEsports) && (
                <div>
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      02
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                        {isTeamEvent ? 'Squad & Roster Details' : 'In-Game Identification'}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        {isTeamEvent ? `Configure your team roster (${currentEvent.minMembers}-${currentEvent.maxMembers} members)` : 'Character UID & gamer tag'}
                      </p>
                    </div>
                  </div>

                  {isTeamEvent && (
                    <div className="mb-5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <FaUsers className="w-3 h-3 text-purple-400" />
                        Official Team Name *
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        required
                        value={formData.teamName}
                        onChange={handleInputChange}
                        placeholder="e.g. CyberVipers, NeuralKnights"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                      />
                    </div>
                  )}

                  {isEsports && (
                    <div className="mb-5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                        <FaGamepad className="w-3 h-3 text-pink-400" />
                        Leader In-Game ID / UID (Character ID) *
                      </label>
                      <input
                        type="text"
                        name="inGameID"
                        required
                        value={formData.inGameID}
                        onChange={handleInputChange}
                        placeholder="e.g. 5183920194 (UID)"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all"
                      />
                    </div>
                  )}

                  {/* Dynamic Teammates Inputs */}
                  {isTeamEvent && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-gray-300">
                          Teammates List (Slots 2 to {currentEvent.maxMembers})
                        </span>
                        {teamMembers.length < currentEvent.maxMembers - 1 && (
                          <button
                            type="button"
                            onClick={handleAddMember}
                            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                          >
                            + Add Member Slot
                          </button>
                        )}
                      </div>

                      {teamMembers.map((member, index) => (
                        <div key={index} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-purple-300 font-semibold">
                              Teammate #{index + 2}
                            </span>
                            {teamMembers.length > Math.max(0, currentEvent.minMembers - 1) && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(index)}
                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                              >
                                <FaTrashAlt className="w-3 h-3" />
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              value={member.name}
                              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                              placeholder={`Teammate ${index + 2} Full Name *`}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:border-purple-400 focus:outline-none"
                            />

                            <input
                              type="text"
                              maxLength={10}
                              value={member.rollNumber}
                              onChange={(e) => handleMemberChange(index, 'rollNumber', e.target.value)}
                              placeholder={`Teammate ${index + 2} 10-digit Roll No.`}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:border-purple-400 focus:outline-none"
                            />

                            {isEsports && (
                              <input
                                type="text"
                                required
                                value={member.inGameID}
                                onChange={(e) => handleMemberChange(index, 'inGameID', e.target.value)}
                                placeholder={`Teammate ${index + 2} In-Game UID *`}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-xs focus:border-pink-400 focus:outline-none sm:col-span-2"
                              />
                            )}
                          </div>
                          {errors[`memberRoll_${index}`] && (
                            <p className="text-red-400 text-xs font-mono">{errors[`memberRoll_${index}`]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 3: Payment Verification & Proof Upload */}
              <div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-500/40 flex items-center justify-center text-pink-400 font-bold font-mono text-sm">
                    {isTeamEvent || isEsports ? '03' : '02'}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      Payment Verification & Proof
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">Scan the UPI QR Code and attach payment screenshot</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-black/40 p-5 sm:p-6 rounded-2xl border border-white/5">
                  {/* Official PhonePe QR Code Box with Click to View Account Details */}
                  <div className="md:col-span-5 text-center flex flex-col items-center">
                    <div 
                      onClick={() => setShowAccountModal(true)}
                      className="group relative p-3 bg-white rounded-2xl shadow-2xl max-w-[195px] border-2 border-cyan-400/80 cursor-pointer hover:border-cyan-300 hover:scale-[1.02] transition-all"
                      title="Click to view bank account details"
                    >
                      <img 
                        src="/qr.jpg" 
                        alt="Tech Avinya Official PhonePe QR - Ayush Kumar" 
                        className="w-full h-auto rounded-lg object-contain"
                      />
                      <div className="absolute inset-0 bg-black/75 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white">
                        <FaEye className="w-6 h-6 text-cyan-400 mb-1.5 animate-bounce" />
                        <span className="text-xs font-bold leading-tight text-center">Click to View Bank Account Details</span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-cyan-300 mt-2 block">
                      Pay Exact: <b className="text-white text-xs">{activeFee}</b>
                    </span>

                    {/* Interactive Button to View Direct Bank & Account Details */}
                    <button
                      type="button"
                      onClick={() => setShowAccountModal(true)}
                      className="mt-3 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-950/80 hover:bg-cyan-500 hover:text-black border border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all cursor-pointer"
                    >
                      <FaUniversity className="w-3.5 h-3.5 text-cyan-400 group-hover:text-black" />
                      View Account Details
                    </button>
                  </div>

                  {/* Payment Instructions & File Dropzone */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="text-xs space-y-1.5 text-gray-300">
                      <p className="flex items-center gap-2">
                        <FaCheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        Scan using any UPI app (GPay, PhonePe, Paytm, BHIM).
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        Take a screenshot showing the transaction ID & timestamp.
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        Upload proof below for instant desk verification.
                      </p>
                    </div>

                    {/* Screenshot Upload Input */}
                    {!previewScreenshotUrl ? (
                      <label className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-black/40 hover:bg-cyan-950/20 transition-all text-center">
                        <FaFileImage className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
                        <span className="text-xs font-semibold text-white">Click or Drag & Drop Payment Screenshot</span>
                        <span className="text-[11px] text-gray-400 font-mono mt-0.5">JPG, PNG, WebP up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/50 p-3 bg-emerald-950/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={previewScreenshotUrl} 
                            alt="Screenshot Preview" 
                            className="w-14 h-14 object-cover rounded-xl border border-emerald-400"
                          />
                          <div>
                            <p className="text-xs font-bold text-white truncate max-w-[180px]">{screenshotFile?.name}</p>
                            <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                              <FaCheck className="w-3 h-3" /> Proof attached
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="p-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 hover:text-white hover:bg-red-900 transition-all cursor-pointer"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dedicated UTR / UPI Transaction ID Field */}
                <div className="mt-5 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 shadow-inner">
                  <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold">
                      <FaTicketAlt className="w-3.5 h-3.5 text-cyan-400" />
                      UTR / UPI Transaction ID *
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400/80">12-digit UTR No.</span>
                  </label>
                  <input
                    type="text"
                    name="utrNumber"
                    required
                    value={formData.utrNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 429812345678 or UPI Ref ID"
                    className={`w-full px-4 py-3 rounded-xl bg-black/70 border text-white placeholder-gray-500 text-sm font-mono tracking-wider focus:outline-none transition-all ${
                      errors.utrNumber
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-cyan-500/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.utrNumber ? (
                    <p className="text-red-400 text-xs mt-1 font-mono">{errors.utrNumber}</p>
                  ) : (
                    <p className="text-gray-400 text-[11px] font-mono mt-1.5 flex items-center gap-1.5">
                      <FaCheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      Enter the 12-digit UTR / UPI Reference ID shown on your Google Pay / PhonePe / Paytm / BHIM confirmation screen.
                    </p>
                  )}
                </div>

                {/* Additional Note */}
                <div className="mt-4">
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Any specific note or queries for the coordinators (optional)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold uppercase tracking-widest text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Processing Enrollment...
                    </>
                  ) : (
                    <>
                      Confirm & Submit Enrollment &rarr;
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-gray-400 font-mono mt-2">
                  Instant registration with verifiable pass & reference ID generated upon submission.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUCCESS SUBMISSION PALETTE (MODAL PASS)                        */}
      {/* ============================================================= */}
      {submittedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-400/60 bg-gradient-to-b from-[#0a1435] via-[#040817] to-[#01040a] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-white overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSubmittedEnrollment(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Success Badge */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-300 text-2xl shadow-[0_0_25px_rgba(16,185,129,0.5)] mb-3">
                <FaCheck />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400">
                Enrollment Confirmed!
              </h3>
              <p className="text-xs text-gray-300 font-mono mt-1">
                Your entry pass for <b className="text-cyan-300">{submittedEnrollment.eventTitle}</b> has been issued.
              </p>
            </div>

            {/* Reference ID Pill */}
            <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-400/50 flex items-center justify-between mb-6 shadow-inner">
              <div>
                <span className="text-[11px] font-mono uppercase text-gray-400 block tracking-wider">Official Reference ID</span>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-cyan-300 tracking-wider">
                  {submittedEnrollment.referenceId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyRefId(submittedEnrollment.referenceId)}
                className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy ID'}
              </button>
            </div>

            {/* Pass Metadata Grid */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs font-mono mb-6">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Candidate / Leader:</span>
                <span className="font-bold text-white">{submittedEnrollment.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Mobile Phone:</span>
                <span className="font-bold text-white">{submittedEnrollment.phone}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Institute / Affiliation:</span>
                <span className="font-bold text-cyan-300 truncate max-w-[200px]">{submittedEnrollment.college}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Roll / Registration No:</span>
                <span className="font-bold text-white">{submittedEnrollment.rollNumber}</span>
              </div>
              {submittedEnrollment.teamName && (
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Squad Name:</span>
                  <span className="font-bold text-purple-300">{submittedEnrollment.teamName}</span>
                </div>
              )}
              {submittedEnrollment.inGameID && (
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">In-Game ID / UID:</span>
                  <span className="font-bold text-pink-300">{submittedEnrollment.inGameID}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Event Schedule:</span>
                <span className="font-bold text-amber-300">{submittedEnrollment.eventDate}</span>
              </div>
              {submittedEnrollment.utrNumber && (
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">UTR / UPI Ref:</span>
                  <span className="font-bold text-emerald-300 tracking-wider font-mono">{submittedEnrollment.utrNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Entry Fee Paid:</span>
                <span className="font-bold text-emerald-400">{submittedEnrollment.entryFee}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPrint className="w-3.5 h-3.5" />
                Print Pass
              </button>
              <button
                type="button"
                onClick={() => setSubmittedEnrollment(null)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-500/30"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* OFFICIAL BANK ACCOUNT DETAILS MODAL (SBI TREASURY)       */}
      {/* ======================================================== */}
      {showAccountModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowAccountModal(false)}
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#0b132b] via-[#070e20] to-[#02050e] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowAccountModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-4 pr-10">
              <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                <FaUniversity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-400 block">
                  Direct Bank Transfer / IMPS / NEFT / UPI
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Official Bank Account Details
                </h2>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-6 font-light">
              If you prefer not to or cannot scan the PhonePe QR code, please transfer your registration fee (<b className="text-cyan-300">{activeFee}</b>) directly using the verified State Bank of India (SBI) account details below:
            </p>

            {/* Credential Cards */}
            <div className="space-y-3 mb-6 text-sm">
              {/* Account Number */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">Account Number</p>
                  <p className="text-base sm:text-lg font-mono font-extrabold text-cyan-300 tracking-wider">
                    45486733847
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyField('45486733847', 'accNo')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-500 hover:text-black border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedField === 'accNo' ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* IFSC Code */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">IFSC Code</p>
                  <p className="text-base sm:text-lg font-mono font-extrabold text-amber-300 tracking-wider">
                    SBIN0007543
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyField('SBIN0007543', 'ifsc')}
                  className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-500 hover:text-black border border-amber-400/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedField === 'ifsc' ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Account Holder & Bank */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">Account Holder</p>
                    <p className="font-bold text-white text-sm sm:text-base mt-0.5">AYUSH KUMAR</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyField('AYUSH KUMAR', 'holder')}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition-all cursor-pointer"
                    title="Copy Name"
                  >
                    {copiedField === 'holder' ? <FaCheck className="w-3 h-3 text-emerald-400" /> : <FaCopy className="w-3 h-3 text-gray-300" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-mono">Bank Name</p>
                  <p className="font-bold text-white text-sm sm:text-base mt-0.5">State Bank of India (SBI)</p>
                </div>
              </div>
            </div>

            {/* Action button: Copy All */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleCopyAllBankDetails}
                className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedField === 'all' ? (
                  <>
                    <FaCheck className="w-4 h-4 text-black" />
                    All Details Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <FaCopy className="w-4 h-4" />
                    Copy All Bank Details
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
