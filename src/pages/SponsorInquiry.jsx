import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHandshake, FaBuilding, FaUser, FaEnvelope, FaPhone, FaGlobe, FaCheckCircle, 
  FaMoneyBillWave, FaCopy, FaCheck, FaTimes, FaArrowRight, FaAward 
} from 'react-icons/fa';
import TechfestCyberBackground from '../components/TechfestCyberBackground';
import { API_BASE_URL, insertDirectToSupabase } from '../config/api';

const sponsorshipTiers = [
  { id: 'Title Sponsor', label: 'Title Sponsor', badge: '👑', color: 'from-amber-500/30 to-yellow-600/30', border: 'border-amber-400' },
  { id: 'Co-Sponsor', label: 'Co-Sponsor', badge: '💎', color: 'from-cyan-500/30 to-blue-600/30', border: 'border-cyan-400' },
  { id: 'Hackathon Sponsor', label: 'Hackathon Partner', badge: '💻', color: 'from-emerald-500/30 to-green-600/30', border: 'border-emerald-400' },
  { id: 'Event Partner', label: 'Event Partner', badge: '🚀', color: 'from-purple-500/30 to-indigo-600/30', border: 'border-purple-400' },
  { id: 'Printing / In-Kind', label: 'Printing / In-Kind', badge: '🖨️', color: 'from-pink-500/30 to-rose-600/30', border: 'border-pink-400' },
  { id: 'Associate Sponsor', label: 'Associate Sponsor', badge: '🤝', color: 'from-teal-500/30 to-teal-700/30', border: 'border-teal-400' },
];

export default function SponsorInquiry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    tier: 'Title Sponsor',
    message: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submittedSponsor, setSubmittedSponsor] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyRefId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Allow only numbers and max 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setPhoneError('Mobile number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTierSelect = (tierId) => {
    setFormData((prev) => ({ ...prev, tier: tierId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    // Validate 10-digit mobile
    if (!/^\d{10}$/.test(formData.phone)) {
      setPhoneError('Mobile number must be exactly 10 digits.');
      return;
    }

    setIsSubmitting(true);

    try {
      let isSuccess = false;
            let assignedRefId = null;

      // Clean and normalize website URL (auto-prepend https:// if missing)
      const rawWebsite = formData.website ? formData.website.trim() : '';
      const cleanWebsite = rawWebsite
        ? (rawWebsite.startsWith('http://') || rawWebsite.startsWith('https://') ? rawWebsite : `https://${rawWebsite}`)
        : null;

      const submissionPayload = {
        ...formData,
        website: cleanWebsite,
      };

      // 1. Try Backend API with fast 2.5s timeout so the site never hangs
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const response = await fetch(`${API_BASE_URL}/api/sponsors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok && data.success) {
          isSuccess = true;
          assignedRefId = data.sponsor?.id || data.sponsor?._id;
        } else if (response.status === 400) {
          setSubmitResult({
            type: 'error',
            text: data.message || 'Validation error. Please verify your details.',
          });
          return;
        }
      } catch (backendErr) {
        console.warn('[Backend submit unreachable, attempting direct Supabase insert...]', backendErr);
      }

      // 2. Direct Supabase Fallback
      if (!isSuccess) {
        try {
          const record = {
            company_name: formData.companyName.trim(),
            contact_person: formData.contactPerson.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            website: cleanWebsite,
            tier: formData.tier.trim(),
            message: formData.message ? formData.message.trim() : null,
            status: 'New',
          };

          const inserted = await insertDirectToSupabase('sponsor_inquiries', record);
          isSuccess = true;
          if (inserted && inserted[0] && inserted[0].id) {
            assignedRefId = inserted[0].id;
          }
        } catch (supabaseErr) {
          console.error('[Supabase Direct Insert Error]', supabaseErr);
          setSubmitResult({
            type: 'error',
            text: 'Unable to submit inquiry. Please verify your internet connection.',
          });
          return;
        }
      }

      if (isSuccess) {
        const fallbackRef = `TA26-SPN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const finalRefId = assignedRefId ? String(assignedRefId).slice(0, 13).toUpperCase() : fallbackRef;

        // Open Submission Palette Modal
        setSubmittedSponsor({
          referenceId: finalRefId,
          companyName: formData.companyName.trim(),
          contactPerson: formData.contactPerson.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          website: cleanWebsite,
          tier: formData.tier.trim(),
          message: formData.message ? formData.message.trim() : null,
          timestamp: new Date().toISOString(),
        });

        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          website: '',
          tier: 'Title Sponsor',
          message: '',
        });
      }
    } catch (err) {
      console.error('[Sponsor Form Error]', err);
      setSubmitResult({
        type: 'error',
        text: 'Unable to submit inquiry. Please verify your internet connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full p-3 rounded-lg bg-gray-800/80 border border-gray-700 Gluten text-white placeholder-gray-500 transition-all duration-300 focus:border-cyan-500 focus:ring-0 focus:shadow-lg focus:shadow-cyan-500/30';
  const labelClass = 'block text-sm font-medium text-cyan-400 mb-2 tracking-wider uppercase Graduate';
  const fieldsetClass = 'border border-cyan-700/50 p-6 rounded-lg space-y-5 shadow-inner shadow-cyan-900/40';
  const legendClass = 'px-3 text-lg font-extrabold Graduate text-cyan-300 uppercase';

  return (
    <div className="relative min-h-screen pt-28 pb-16 text-white flex flex-col items-center bg-[#020409]">
      {/* Signature IIT Bombay Techfest Cybernetic Background */}
      <TechfestCyberBackground />

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-cyan-950/60 rounded-full border border-cyan-500/50 mb-4 shadow-lg shadow-cyan-500/20">
            <FaHandshake className="text-cyan-400 text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold Graduate text-white tracking-wide mb-3">
            <span className="text-cyan-400">CONNECT</span> WITH US
          </h1>
          <p className="text-gray-300 Gluten text-lg max-w-xl mx-auto">
            Partner with <span className="text-cyan-300 font-semibold">Tech Avinya @ NIT Nagaland</span> and empower the next generation of technologists and innovators.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900/70 border border-cyan-800/50 rounded-xl p-4 text-center backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-cyan-400 Graduate">1000+</p>
            <p className="text-xs text-gray-400 Gluten mt-1">Footfall & Reach</p>
          </div>
          <div className="bg-gray-900/70 border border-cyan-800/50 rounded-xl p-4 text-center backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-purple-400 Graduate">12+</p>
            <p className="text-xs text-gray-400 Gluten mt-1">Flagship Events</p>
          </div>
          <div className="bg-gray-900/70 border border-cyan-800/50 rounded-xl p-4 text-center backdrop-blur-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-lime-400 Graduate">₹ 2.5L+</p>
            <p className="text-xs text-gray-400 Gluten mt-1">Prize Pool</p>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 p-8 md:p-12 rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-700/50 space-y-8 backdrop-blur-md"
        >
          {submitResult && (
            <div
              className={`p-4 rounded-lg font-semibold border flex items-center gap-3 ${
                submitResult.type === 'success'
                  ? 'bg-green-600/40 border-green-400 text-green-200'
                  : 'bg-red-600/40 border-red-400 text-red-200'
              }`}
            >
              {submitResult.type === 'success' && <FaCheckCircle className="text-xl flex-shrink-0" />}
              <span>{submitResult.text}</span>
            </div>
          )}

          {/* Tier Selection */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>
              <FaMoneyBillWave className="inline mr-2 text-cyan-400" />
              Sponsorship Tier *
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sponsorshipTiers.map((tier) => {
                const isSelected = formData.tier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleTierSelect(tier.id)}
                    className={`p-3 rounded-lg border text-sm font-semibold transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? `bg-gradient-to-br ${tier.color} ${tier.border} text-white shadow-lg shadow-cyan-500/30 scale-105 border-2`
                        : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:border-cyan-600 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{tier.badge}</span>
                    <span className="Gluten text-xs font-bold">{tier.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Company Details */}
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>
              <FaBuilding className="inline mr-2 text-cyan-400" />
              Organization & Contact Details
            </legend>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="E.g., TechCorp India Pvt. Ltd."
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaUser className="inline mr-1 text-cyan-400" /> Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaEnvelope className="inline mr-1 text-cyan-400" /> Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="contact@example.in"
                />
              </div>

              <div>
                <label className={labelClass}>
                  <FaPhone className="inline mr-1 text-cyan-400" /> Mobile / WhatsApp Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-400' : ''}`}
                  placeholder="0000000000 (10 digits)"
                />
                {phoneError ? (
                  <p className="text-red-400 text-xs mt-1 Gluten">{phoneError}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1 Gluten">Must be exactly 10 digits.</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  <FaGlobe className="inline mr-1 text-cyan-400" /> Website / Social URL (Optional)
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="e.g. www.company.com or https://company.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Proposal, Queries, or Custom Requirements (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your sponsorship objectives, customized deliverables, or booth requirements..."
                />
              </div>
            </div>
          </fieldset>

          <div className="bg-cyan-950/40 border border-cyan-800/40 rounded-lg p-4 text-xs text-cyan-300 Gluten flex items-center justify-between">
            <span>Direct Email: <strong>techavi@nitnagaland.ac.in</strong></span>
            <span>Venue: NIT Nagaland Campus</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-lg font-semibold uppercase tracking-widest Graduate rounded-lg transition-all duration-300
                       bg-gradient-to-r from-teal-500 to-cyan-600 border border-teal-400 text-white 
                       hover:from-teal-400 hover:to-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/50 
                       active:scale-95 disabled:bg-gray-700 disabled:border-gray-600 cursor-pointer"
          >
            {isSubmitting ? 'Submitting Details...' : 'Submit Sponsorship Details'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/sponsors" className="text-gray-400 hover:text-white Gluten text-sm transition-colors">
            &larr; Back to Sponsors Page
          </Link>
        </div>
      </div>

      {/* ============================================================= */}
      {/* NEW PALETTE: SPONSOR INQUIRY CONFIRMATION MODAL */}
      {/* ============================================================= */}
      {submittedSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:text-black">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900/98 via-[#140b24]/98 to-black rounded-2xl border-2 border-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.45)] p-6 md:p-8 text-white overflow-hidden max-h-[92vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
            {/* Top Glowing Purple Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 animate-pulse print:hidden" />

            {/* Close Button */}
            <button
              onClick={() => setSubmittedSponsor(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-800/80 p-2 rounded-full transition-colors cursor-pointer print:hidden"
              title="Close Palette"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Header & Celebration */}
            <div className="text-center mb-6">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/60 text-purple-300 mb-3 shadow-[0_0_25px_rgba(168,85,247,0.35)] print:border-black print:text-black">
                <FaHandshake className="text-4xl text-purple-300 print:text-black" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold Graduate text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-amber-300 tracking-wide print:text-black print:bg-none">
                PARTNERSHIP APPLICATION RECEIVED
              </h2>
              <p className="text-gray-300 Gluten text-sm mt-1 print:text-gray-700">
                Thank you for partnering with Tech Avinya 2026, <span className="text-purple-300 font-bold print:text-black">{submittedSponsor.companyName}</span>!
              </p>

              {/* Reference ID Pill */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/90 border border-purple-500/50 rounded-full text-xs font-mono print:border-black print:bg-gray-100 print:text-black">
                <span className="text-gray-400 print:text-gray-600">Inquiry Ref:</span>
                <span className="text-purple-300 font-bold print:text-black">{submittedSponsor.referenceId}</span>
                <button
                  type="button"
                  onClick={() => handleCopyRefId(submittedSponsor.referenceId)}
                  className="ml-1 text-gray-400 hover:text-purple-300 transition-colors cursor-pointer print:hidden"
                  title="Copy Reference ID"
                >
                  {copied ? <FaCheck className="text-green-400 text-xs" /> : <FaCopy className="text-xs" />}
                </button>
              </div>
            </div>

            {/* Details Summary Palette */}
            <div className="bg-gray-950/70 border border-purple-800/50 rounded-xl p-5 mb-5 space-y-3.5 text-xs md:text-sm print:bg-white print:border-black print:text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-b border-gray-800/80 pb-3 print:border-gray-300">
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[11px] uppercase font-semibold">Company / Brand:</span>
                  <span className="text-white print:text-black font-bold text-base flex items-center gap-2 mt-0.5">
                    <FaBuilding className="text-purple-400 print:text-black text-sm" />
                    {submittedSponsor.companyName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[11px] uppercase font-semibold">Contact Representative:</span>
                  <span className="text-cyan-300 print:text-black font-bold text-base mt-0.5 block">{submittedSponsor.contactPerson}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-gray-800/80 pb-3 font-mono print:border-gray-300">
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Mobile (10 Digits):</span>
                  <span className="text-lime-400 print:text-black font-bold">{submittedSponsor.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Email:</span>
                  <span className="text-gray-200 print:text-black truncate block font-sans">{submittedSponsor.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase font-sans">Selected Tier:</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-900/60 border border-purple-400 text-purple-200 print:bg-gray-100 print:border-black print:text-black">
                    {submittedSponsor.tier}
                  </span>
                </div>
              </div>

              {submittedSponsor.website && (
                <div className="text-xs">
                  <span className="text-gray-400 print:text-gray-600 mr-2">Official Website:</span>
                  <a
                    href={submittedSponsor.website.startsWith('http') ? submittedSponsor.website : `https://${submittedSponsor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 print:text-blue-700 hover:underline"
                  >
                    {submittedSponsor.website}
                  </a>
                </div>
              )}

              {submittedSponsor.message && (
                <div className="border-t border-gray-800/80 pt-3 print:border-gray-300">
                  <span className="text-gray-400 print:text-gray-600 block text-[10px] uppercase mb-1">Proposal & Scope:</span>
                  <p className="text-gray-300 print:text-black italic bg-gray-900/80 print:bg-gray-50 p-3 rounded-lg border border-gray-800 print:border-gray-300 leading-relaxed">
                    "{submittedSponsor.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Advisory Alert */}
            <div className="bg-purple-950/40 border border-purple-700/50 rounded-lg p-3.5 mb-6 text-xs text-purple-200 flex items-start gap-2.5 print:border-gray-300 print:bg-gray-50 print:text-black">
              <span className="text-lg">🤝</span>
              <p className="leading-relaxed">
                <strong>Next Steps:</strong> Our Corporate Relations & Sponsorship Team has received your inquiry. We will review your proposal and contact you directly via phone or email within <strong>24 to 48 hours</strong> with the sponsorship brochure and partnership packages.
              </p>
            </div>

            {/* Action Buttons */}
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
                    setSubmittedSponsor(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-gray-800 border border-purple-700 text-purple-300 hover:bg-purple-950 text-xs font-semibold cursor-pointer transition-all"
                >
                  Submit Another
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/sponsors')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>View Sponsors</span>
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
