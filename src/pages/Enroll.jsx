import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaUsers, FaGamepad, FaUniversity, FaPhone, FaEnvelope, FaIdCard, 
  FaQrcode, FaCheckCircle, FaExclamationCircle, FaCopy, FaCheck, FaPrint, 
  FaTicketAlt, FaCalendarAlt, FaTimes, FaArrowRight, FaTrophy
} from 'react-icons/fa';
import VantaNetBackground from '../components/VantaNetBackground';
import { API_BASE_URL, insertDirectToSupabase, uploadScreenshotDirect } from '../config/api';

const ALL_EVENTS = [
  { id: 'code', title: 'Code Raze', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 250/-', prize: '₹ 22,000/-', category: 'Coding', date: '31-10-2025' },
  { id: 'digital', title: 'Digital Art', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 250/-', prize: '₹ 10,000/-', category: 'Design', date: '31-10-2025' },
  { id: 'aerial', title: 'Aerial Adrenaline', minMembers: 2, maxMembers: 4, feeNIT: '₹ 0/-', feeOutside: '₹ 500/-', prize: '₹ 19,000/-', category: 'Robotics', date: '31-10-2025' },
  { id: 'clash', title: 'Clash of Wheels', minMembers: 1, maxMembers: 4, feeNIT: '₹ 199/-', feeOutside: '₹ 400/-', prize: '₹ 16,000/-', category: 'Robotics', date: '31-10-2025' },
  { id: 'bug', title: 'Bug Hunt', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 250/-', prize: '₹ 15,000/-', category: 'Debugging', date: '31-10-2025' },
  { id: 'hackathon', title: 'Hackathon', minMembers: 3, maxMembers: 5, feeNIT: '₹ 200/-', feeOutside: '₹ 600/-', prize: '₹ 19,000/-', category: 'Hackathon', date: '31-10-2025' },
  { id: 'animation', title: 'Animation', minMembers: 3, maxMembers: 5, feeNIT: '₹ 99/-', feeOutside: '₹ 300/-', prize: '₹ 11,000/-', category: 'Animation', date: '31-10-2025' },
  { id: 'bgmi', title: 'BGMI', minMembers: 4, maxMembers: 4, feeNIT: '₹ 500/-', feeOutside: '₹ 1000/-', prize: '₹ 20,000/-', category: 'Esports', date: '31-10-2025' },
  { id: 'mlbb', title: 'MLBB', minMembers: 5, maxMembers: 5, feeNIT: '₹ 500/-', feeOutside: '₹ 1000/-', prize: '₹ 20,000/-', category: 'Esports', date: '31-10-2025' },
  { id: 'free', title: 'Free Fire', minMembers: 4, maxMembers: 4, feeNIT: '₹ 500/-', feeOutside: '₹ 600/-', prize: '₹ 17,000/-', category: 'Esports', date: '31-10-2025' },
  { id: 'modelling', title: '3D Modelling', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 300/-', prize: '₹ 8,000/-', category: '3D Art', date: '31-10-2025' },
  { id: 'tech', title: 'Tech Crisis', minMembers: 3, maxMembers: 3, feeNIT: '₹ 99/-', feeOutside: '₹ 300/-', prize: '₹ 8,000/-', category: 'Case Study', date: '31-10-2025' },
  { id: 'infinity', title: 'Infinity Hunt', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 300/-', prize: '₹ 8,000/-', category: 'Maths & Integrals', date: '31-10-2025' },
  { id: 'stock', title: 'Stock Rise', minMembers: 1, maxMembers: 1, feeNIT: '₹ 99/-', feeOutside: '₹ 199/-', prize: '₹ 8,000/-', category: 'Trading Simulation', date: '31-10-2025' },
];

const ESPORTS_IDS = ['bgmi', 'mlbb', 'free'];

export default function Enroll() {
  const { eventId: paramEventId } = useParams();
  const navigate = useNavigate();

  // Find initial event or default to first
  const [selectedEventId, setSelectedEventId] = useState(paramEventId || 'code');
  const currentEvent = ALL_EVENTS.find((e) => e.id === selectedEventId) || ALL_EVENTS[0];

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
    note: '',
  });

  // Dynamic team members (for slots beyond the leader)
  const initialMemberStructure = { name: '', rollNumber: '', inGameID: '' };
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
  }, [selectedEventId]);

  const [screenshotFile, setScreenshotFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submittedEnrollment, setSubmittedEnrollment] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyRefId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Input change handler with 10-digit validation logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Numbers only, strictly max 10 digits
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
      // 10 digits requirement
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

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Team member change handler
  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    if (field === 'rollNumber') {
      // 10 digits validation for team member roll number
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
    // Current total team size = 1 (leader) + teamMembers.length
    if (teamMembers.length < currentEvent.maxMembers - 1) {
      setTeamMembers([...teamMembers, { ...initialMemberStructure }]);
    }
  };

  const handleRemoveMember = (index) => {
    if (teamMembers.length > Math.max(0, currentEvent.minMembers - 1)) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

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

    setIsSubmitting(true);

    try {
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
      data.append('note', formData.note.trim());

      // Clean team members
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
      let msg = '';
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
          msg = result.message || `🎉 Enrollment Successful for ${currentEvent.title}! Your spot has been reserved.`;
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
            note: formData.note.trim() || null,
            screenshot_url: screenshotUrl,
            status: 'Pending',
          };

          const inserted = await insertDirectToSupabase('registrations', record);
          isSuccess = true;
          msg = `🎉 Enrollment Successful for ${currentEvent.title}! Your spot has been reserved.`;
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

        // Open Submission Palette with comprehensive details
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
          entryFee: entryFee,
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
          note: '',
        });
        setScreenshotFile(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 Gluten text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30';
  const labelClass = 'block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate';
  const fieldsetClass = 'border border-cyan-700/50 p-6 rounded-lg space-y-5 shadow-inner shadow-cyan-900/40';
  const legendClass = 'px-3 text-lg font-extrabold Graduate text-cyan-300 uppercase';

  const entryFee = collegeAffiliation === 'NIT Nagaland' ? currentEvent.feeNIT : currentEvent.feeOutside;

  return (
    <div className="relative min-h-screen pt-28 pb-16 text-white flex flex-col items-center">
      {/* NEW High-Tech 3D Cyber Network Interactive Background */}
      <VantaNetBackground options={{ color: 0x00f0ff, backgroundColor: 0x040817, points: 14, maxDistance: 24, spacing: 17 }} />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-950/75 via-black/55 to-gray-950/85 pointer-events-none" />

      {/* Cyberpunk Ambient Neon Mesh & Grid Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        {/* Cyber Grid Texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6">
        {/* Title Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-white tracking-wide mb-2">
            EVENT <span className="text-cyan-400">ENROLLMENT</span>
          </h1>
          <p className="text-gray-300 Gluten text-lg">
            Register now for Tech Avinya 2026 competitions at NIT Nagaland.
          </p>
        </div>

        {/* Dynamic Event Selection Banner */}
        <div className="bg-gradient-to-r from-gray-900/90 via-cyan-950/70 to-gray-900/90 border border-cyan-600/60 rounded-xl p-6 mb-8 backdrop-blur-md shadow-xl">
          <label className={labelClass}>Selected Competition / Event *</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full p-3 text-lg font-bold rounded-lg bg-gray-900 border-2 border-cyan-500 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer mb-4"
          >
            {ALL_EVENTS.map((ev) => (
              <option key={ev.id} value={ev.id} className="bg-gray-900 text-white font-normal">
                {ev.title} ({ev.category}) - Prize: {ev.prize}
              </option>
            ))}
          </select>

          {/* Dynamic Badges that vary according to event */}
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-500 text-cyan-300 font-semibold flex items-center gap-2">
              {isTeamEvent ? <FaUsers /> : <FaUser />}
              {isTeamEvent
                ? `Team Event (${currentEvent.minMembers === currentEvent.maxMembers ? currentEvent.minMembers : `${currentEvent.minMembers}-${currentEvent.maxMembers}`} members)`
                : 'Individual (Solo)'}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500 text-purple-300 font-semibold">
              Category: {currentEvent.category}
            </span>

            <span className="px-3 py-1 rounded-full bg-amber-900/50 border border-amber-500 text-amber-300 font-semibold">
              🏆 Prize: {currentEvent.prize}
            </span>

            <span className="px-3 py-1 rounded-full bg-lime-900/50 border border-lime-500 text-lime-300 font-bold">
              Entry Fee: {entryFee}
            </span>
          </div>
        </div>

        {/* Enrollment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 p-8 md:p-12 rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-700/50 space-y-8 backdrop-blur-md"
        >
          {statusMessage && (
            <div
              className={`p-4 rounded-lg font-semibold border flex items-center gap-3 ${
                statusMessage.type === 'success'
                  ? 'bg-green-600/40 border-green-400 text-green-200'
                  : 'bg-red-600/40 border-red-400 text-red-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <FaCheckCircle className="text-xl flex-shrink-0" />
              ) : (
                <FaExclamationCircle className="text-xl flex-shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Fieldset 1: Affiliation */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>
              <FaUniversity className="inline mr-2 text-cyan-400" />
              College Affiliation
            </legend>

            <div className="flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="affiliation"
                  value="NIT Nagaland"
                  checked={collegeAffiliation === 'NIT Nagaland'}
                  onChange={() => setCollegeAffiliation('NIT Nagaland')}
                  className="h-5 w-5 text-cyan-500 focus:ring-cyan-400"
                />
                <span className="text-base text-white font-medium">NIT Nagaland Student</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="affiliation"
                  value="Other College/University"
                  checked={collegeAffiliation === 'Other College/University'}
                  onChange={() => setCollegeAffiliation('Other College/University')}
                  className="h-5 w-5 text-cyan-500 focus:ring-cyan-400"
                />
                <span className="text-base text-white font-medium">Other College / University</span>
              </label>
            </div>

            {collegeAffiliation === 'Other College/University' && (
              <div className="pt-2">
                <label className={labelClass}>College / Institute Name *</label>
                <input
                  type="text"
                  required
                  value={otherCollegeName}
                  onChange={(e) => setOtherCollegeName(e.target.value)}
                  className={inputClass}
                  placeholder="E.g., IIT Guwahati, Dimapur Govt. College, etc."
                />
              </div>
            )}
          </fieldset>

          {/* Fieldset 2: Participant / Leader Details */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>
              <FaUser className="inline mr-2 text-cyan-400" />
              {isTeamEvent ? "Team Leader's Details" : 'Participant Details'}
            </legend>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="E.g., Alex Johnson"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaEnvelope className="inline mr-1 text-cyan-400" /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="alex@example.com"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaPhone className="inline mr-1 text-cyan-400" /> Mobile / WhatsApp (10 Digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${inputClass} ${errors.phone ? 'border-red-500 focus:border-red-400' : ''}`}
                  placeholder="9876543210 (10 digits)"
                />
                {errors.phone ? (
                  <p className="text-red-400 text-xs mt-1 Gluten">{errors.phone}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1 Gluten">Must be exactly 10 digits.</p>
                )}
              </div>

              {/* Roll Number (Strict 10 digits) */}
              <div>
                <label className={labelClass}>
                  <FaIdCard className="inline mr-1 text-cyan-400" />
                  Roll No. / Registration No. {collegeAffiliation === 'NIT Nagaland' ? '*' : '(10 Digits)'}
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  required={collegeAffiliation === 'NIT Nagaland'}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className={`${inputClass} ${errors.rollNumber ? 'border-red-500 focus:border-red-400' : ''}`}
                  placeholder="10-digit Roll No. (e.g. 2310101010)"
                />
                {errors.rollNumber ? (
                  <p className="text-red-400 text-xs mt-1 Gluten">{errors.rollNumber}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1 Gluten">Must be exactly 10 digits.</p>
                )}
              </div>

              {/* Conditional In-Game ID for Esports */}
              {isEsports && (
                <div>
                  <label className={labelClass}>
                    <FaGamepad className="inline mr-1 text-cyan-400" /> In-Game ID / Character ID *
                  </label>
                  <input
                    type="text"
                    name="inGameID"
                    required
                    value={formData.inGameID}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="E.g., 5123984719"
                  />
                </div>
              )}

              {/* Conditional Team Name */}
              {isTeamEvent && (
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    <FaUsers className="inline mr-1 text-cyan-400" /> Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    required
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="E.g., Apex Cyber Hawks"
                  />
                </div>
              )}
            </div>
          </fieldset>

          {/* Fieldset 3: Team Members (Varies dynamically according to team events) */}
          {isTeamEvent && (
            <fieldset className={fieldsetClass}>
              <div className="flex justify-between items-center">
                <legend className={legendClass}>
                  Team Members ({teamMembers.length + 1} of {currentEvent.maxMembers})
                </legend>
                {teamMembers.length < currentEvent.maxMembers - 1 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="text-cyan-400 hover:text-cyan-300 text-sm border border-cyan-500/40 px-3 py-1 rounded-lg Gluten transition-all"
                  >
                    + Add Member
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 Gluten">
                Leader is Member 1. Add details for other team members ({currentEvent.minMembers}-{currentEvent.maxMembers} members required).
              </p>

              <div className="space-y-4">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/60 p-4 rounded-lg border border-cyan-800/40 grid grid-cols-1 md:grid-cols-3 gap-3 relative"
                  >
                    <div>
                      <label className="text-xs text-cyan-400 uppercase font-semibold block mb-1">
                        Member {idx + 2} Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className={inputClass}
                        placeholder={`Member ${idx + 2} Name`}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-cyan-400 uppercase font-semibold block mb-1">
                        Roll No. (10 Digits)
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={member.rollNumber}
                        onChange={(e) => handleMemberChange(idx, 'rollNumber', e.target.value)}
                        className={inputClass}
                        placeholder="10-digit Roll No."
                      />
                      {errors[`memberRoll_${idx}`] && (
                        <p className="text-red-400 text-xs mt-1 Gluten">{errors[`memberRoll_${idx}`]}</p>
                      )}
                    </div>

                    {isEsports && (
                      <div>
                        <label className="text-xs text-cyan-400 uppercase font-semibold block mb-1">
                          In-Game ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={member.inGameID}
                          onChange={(e) => handleMemberChange(idx, 'inGameID', e.target.value)}
                          className={inputClass}
                          placeholder="Player Character ID"
                        />
                      </div>
                    )}

                    {teamMembers.length > Math.max(0, currentEvent.minMembers - 1) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="text-xs text-red-400 hover:text-red-300 md:col-span-3 text-right"
                      >
                        Remove Member
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {/* Fieldset 4: Payment Instructions & Screenshot */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>
              <FaQrcode className="inline mr-2 text-cyan-400" />
              Payment & Verification
            </legend>

            <div className="flex flex-col items-center gap-4 py-2 border-b border-cyan-800/40 pb-6">
              <img
                src="/qr.jpg"
                alt="Tech Avinya Payment QR"
                className="w-40 h-40 rounded-lg border-2 border-cyan-400 shadow-lg shadow-cyan-500/30"
              />
              <a
                href="/qr.jpg"
                download="tech_avinya_qr.jpg"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold underline"
              >
                Download QR Code
              </a>
              <div className="text-center">
                <p className="text-sm text-gray-300 Gluten">Applicable Registration Fee:</p>
                <p className="text-2xl font-bold text-lime-400 mt-1">{entryFee}</p>
                <p className="text-xs text-gray-400 Gluten mt-1">
                  NITN: {currentEvent.feeNIT} | Others: {currentEvent.feeOutside}
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Upload Payment Screenshot *</label>
              <input
                type="file"
                name="screenshot"
                accept="image/*"
                onChange={(e) => setScreenshotFile(e.target.files[0] || null)}
                className="w-full p-3 rounded-lg Gluten bg-gray-800/80 border border-gray-700 text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                           file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400
                           hover:file:bg-cyan-500/30 transition-colors"
              />
              <p className="text-xs text-gray-400 Gluten mt-2">
                Please attach the transaction confirmation screenshot showing UTR / Reference ID.
              </p>
            </div>

            <div>
              <label className={labelClass}>Additional Note / Queries (Optional)</label>
              <textarea
                name="note"
                rows={2}
                value={formData.note}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`}
                placeholder="Any special remarks or questions..."
              />
            </div>
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg transition-all duration-300
                       bg-gradient-to-r from-red-600 to-pink-600 border border-red-500 text-white
                       hover:from-red-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-red-500/50
                       active:scale-95 disabled:bg-gray-700 disabled:border-gray-600 cursor-pointer"
          >
            {isSubmitting ? 'Submitting Enrollment...' : `Submit Enrollment for ${currentEvent.title}`}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to={`/events/${currentEvent.id}`} className="text-gray-400 hover:text-white Gluten text-sm transition-colors">
            &larr; Back to Event Details
          </Link>
        </div>
      </div>

      {/* ============================================================= */}
      {/* NEW PALETTE: ENROLLMENT CONFIRMATION MODAL */}
      {/* ============================================================= */}
      {submittedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:text-black">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900/98 via-[#0b1224]/98 to-black rounded-2xl border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.45)] p-6 md:p-8 text-white overflow-hidden max-h-[92vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
            {/* Top Glowing Cyber Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 animate-pulse print:hidden" />

            {/* Close Button */}
            <button
              onClick={() => setSubmittedEnrollment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-800/80 p-2 rounded-full transition-colors cursor-pointer print:hidden"
              title="Close Palette"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Header & Celebration */}
            <div className="text-center mb-6">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-400/60 text-green-400 mb-3 shadow-[0_0_25px_rgba(34,197,94,0.3)] print:border-black print:text-black">
                <FaCheckCircle className="text-4xl text-green-400 print:text-black" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold Graduate text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-green-300 tracking-wide print:text-black print:bg-none">
                ENROLLMENT CONFIRMED
              </h2>
              <p className="text-gray-300 Gluten text-sm mt-1 print:text-gray-700">
                You are registered for <span className="text-cyan-300 font-bold print:text-black">{submittedEnrollment.eventTitle}</span> at Tech Avinya 2026.
              </p>

              {/* Reference ID Pill */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/90 border border-cyan-500/50 rounded-full text-xs font-mono print:border-black print:bg-gray-100 print:text-black">
                <span className="text-gray-400 print:text-gray-600">Reference ID:</span>
                <span className="text-cyan-300 font-bold print:text-black">{submittedEnrollment.referenceId}</span>
                <button
                  type="button"
                  onClick={() => handleCopyRefId(submittedEnrollment.referenceId)}
                  className="ml-1 text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer print:hidden"
                  title="Copy Reference ID"
                >
                  {copied ? <FaCheck className="text-green-400 text-xs" /> : <FaCopy className="text-xs" />}
                </button>
              </div>
            </div>

            {/* Details Summary Palette */}
            <div className="bg-gray-950/70 border border-cyan-800/50 rounded-xl p-5 mb-5 space-y-3.5 text-xs md:text-sm print:bg-white print:border-black print:text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-gray-800/80 pb-3 print:border-gray-300">
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[11px] uppercase font-semibold">Competition:</span>
                  <span className="text-cyan-300 print:text-black font-bold text-base">{submittedEnrollment.eventTitle}</span>
                  <span className="text-gray-400 print:text-gray-600 text-xs block">Category: {submittedEnrollment.eventCategory}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[11px] uppercase font-semibold">Participant / Team Leader:</span>
                  <span className="text-white print:text-black font-bold text-base">{submittedEnrollment.fullName}</span>
                  {submittedEnrollment.teamName && (
                    <span className="text-purple-300 print:text-gray-700 text-xs block">Team: {submittedEnrollment.teamName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-gray-800/80 pb-3 font-mono print:border-gray-300">
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Mobile (10 Digits):</span>
                  <span className="text-lime-400 print:text-black font-bold">{submittedEnrollment.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Roll / Reg No.:</span>
                  <span className="text-purple-300 print:text-black font-bold">{submittedEnrollment.rollNumber || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Applicable Fee:</span>
                  <span className="text-yellow-400 print:text-black font-bold">{submittedEnrollment.entryFee}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase">College / Affiliation:</span>
                  <span className="text-gray-200 print:text-black font-medium">{submittedEnrollment.college}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase">Verification Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 border border-yellow-500/50 text-yellow-300 print:text-black print:border-black print:bg-yellow-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping print:hidden" />
                    Payment Verification In Progress
                  </span>
                </div>
              </div>

              {submittedEnrollment.teamMembers && submittedEnrollment.teamMembers.length > 0 && (
                <div className="border-t border-gray-800/80 pt-3 print:border-gray-300">
                  <span className="text-gray-400 print:text-gray-600 block text-[11px] uppercase font-semibold mb-1.5">
                    Team Members ({submittedEnrollment.teamMembers.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {submittedEnrollment.teamMembers.map((m, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-gray-900 border border-gray-700 text-gray-300 text-xs print:bg-gray-100 print:border-gray-300 print:text-black">
                        {i + 2}. <strong className="text-white print:text-black">{m.name}</strong> {m.rollNumber ? `(${m.rollNumber})` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {submittedEnrollment.inGameID && (
                <div className="border-t border-gray-800/80 pt-2 font-mono print:border-gray-300">
                  <span className="text-gray-400 print:text-gray-600 text-xs mr-2">Esports In-Game ID:</span>
                  <span className="text-cyan-300 print:text-black font-bold">{submittedEnrollment.inGameID}</span>
                </div>
              )}
            </div>

            {/* Advisory Alert */}
            <div className="bg-cyan-950/40 border border-cyan-700/50 rounded-lg p-3.5 mb-6 text-xs text-cyan-200 flex items-start gap-2.5 print:border-gray-300 print:bg-gray-50 print:text-black">
              <span className="text-lg">📢</span>
              <p className="leading-relaxed">
                <strong>Next Steps:</strong> Please note your Reference ID. The event coordinator will verify your enrollment and connect via your registered phone number / email before event day ({submittedEnrollment.eventDate || '31-10-2025'}).
              </p>
            </div>

            {/* Palette Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 hover:text-white hover:bg-gray-700 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all"
              >
                <FaPrint />
                <span>Print / Save Slip</span>
              </button>

              <div className="flex w-full sm:w-auto gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedEnrollment(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-gray-800 border border-cyan-700 text-cyan-300 hover:bg-cyan-950 text-xs font-semibold cursor-pointer transition-all"
                >
                  Register Another
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/events')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Explore Events</span>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
