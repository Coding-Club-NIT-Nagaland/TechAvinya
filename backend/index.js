import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { supabase, isSupabaseConfigured } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (frontend deployed on Vercel, localhost, Render, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Multer memory storage for file uploads (payment screenshots)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// --- VALIDATION HELPERS ---
// Clean non-digits or validate 10 digits
const validateMobile = (mobile) => {
  if (!mobile) return { valid: false, error: 'Mobile / Phone number is required.' };
  const clean = String(mobile).replace(/[\s\-+]/g, '');
  // If starts with 91 and has 12 digits, strip country code
  const normalized = (clean.length === 12 && clean.startsWith('91')) ? clean.slice(2) : clean;
  if (!/^\d{10}$/.test(normalized)) {
    return { valid: false, error: 'Mobile number must be exactly 10 digits.' };
  }
  return { valid: true, value: normalized };
};

const validateRollNumber = (rollNumber) => {
  if (!rollNumber) return { valid: true, value: '' }; // Optional unless required by affiliation
  const clean = String(rollNumber).trim();
  if (!/^\d{10}$/.test(clean)) {
    return { valid: false, error: 'Roll number / Registration number must be exactly 10 digits.' };
  }
  return { valid: true, value: clean };
};

// Helper to upload screenshot to Supabase Storage
const uploadScreenshotToSupabase = async (file, folder = 'registrations') => {
  if (!file || !supabase) return null;

  try {
    const fileExt = file.originalname ? file.originalname.split('.').pop() : 'png';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('payment-proofs')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype || 'image/png',
        upsert: true,
      });

    if (error) {
      console.warn('[Supabase Storage Warning] Could not upload to bucket "payment-proofs":', error.message);
      // Fallback: Store as base64 data URI so screenshot is never lost
      const base64Data = `data:${file.mimetype || 'image/png'};base64,${file.buffer.toString('base64')}`;
      return base64Data;
    }

    const { data: publicUrlData } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('[Upload Exception]', err);
    // Fallback as base64
    return `data:${file.mimetype || 'image/png'};base64,${file.buffer.toString('base64')}`;
  }
};

// =============================================================
// RESEND TRANSACTIONAL EMAIL HELPER
// =============================================================
const sendResendEmail = async ({ to, fullName, eventTitle, status, registrationId, reason }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn('⚠️ [Resend Notice] RESEND_API_KEY is not configured in backend/.env. Automatic email skipped.');
    return { success: false, skipped: true, message: 'RESEND_API_KEY is not configured in backend/.env' };
  }

  if (!to) {
    console.warn('⚠️ [Resend Notice] Recipient email is missing. Email notification skipped.');
    return { success: false, message: 'Recipient email is missing.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Tech Avinya 2026 <onboarding@resend.dev>';
  const isAccepted = String(status).toLowerCase() === 'accepted';
  const cleanName = fullName || 'Technologist';
  const cleanEvent = eventTitle || 'Flagship Event';
  const cleanRef = registrationId ? String(registrationId).slice(0, 13).toUpperCase() : 'TA26-CONFIRMED';

  const subject = isAccepted
    ? `🎉 Enrollment Confirmed: Tech Avinya 2026 - ${cleanEvent}`
    : `⚠️ Status Update: Your Tech Avinya 2026 Enrollment - ${cleanEvent}`;

  const htmlContent = isAccepted
    ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0b1329; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #3b82f6 100%); padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 26px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; }
          .header p { margin: 6px 0 0; color: #e0f2fe; font-size: 13px; letter-spacing: 1.5px; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
          .pass-box { background: #030712; border: 1px solid #0284c7; border-radius: 12px; padding: 20px; margin: 24px 0; }
          .pass-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1f2937; font-size: 13px; }
          .pass-row:last-child { border-bottom: none; }
          .label { color: #9ca3af; }
          .val { color: #ffffff; font-weight: 600; }
          .highlight { color: #38bdf8; font-family: monospace; font-size: 15px; font-weight: 800; }
          .instructions { background: rgba(59, 130, 246, 0.08); border-left: 4px solid #0284c7; padding: 14px; border-radius: 6px; font-size: 13px; line-height: 1.6; color: #cbd5e1; margin-top: 20px; }
          .footer { background: #030712; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Tech Avinya 2026</h1>
            <p>NIT NAGALAND • PREMIER TECHNICAL FESTIVAL</p>
          </div>
          <div class="content">
            <div style="text-align: center;">
              <span class="badge">✓ ENROLLMENT ACCEPTED & VERIFIED</span>
            </div>
            <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Greetings, ${cleanName}!</h2>
            <p style="color: #cbd5e1; line-height: 1.6; font-size: 14px;">
              We are delighted to confirm that your registration for <strong>${cleanEvent}</strong> at <strong>Tech Avinya 2026</strong> has been officially approved and verified by the festival coordinators.
            </p>

            <div class="pass-box">
              <div class="pass-row">
                <span class="label">Pass / Reference ID:</span>
                <span class="highlight">${cleanRef}</span>
              </div>
              <div class="pass-row">
                <span class="label">Event / Competition:</span>
                <span class="val">${cleanEvent}</span>
              </div>
              <div class="pass-row">
                <span class="label">Candidate Name:</span>
                <span class="val">${cleanName}</span>
              </div>
              <div class="pass-row">
                <span class="label">Festival Dates:</span>
                <span class="val">5th & 6th November 2026</span>
              </div>
              <div class="pass-row">
                <span class="label">Host Venue:</span>
                <span class="val">National Institute of Technology Nagaland</span>
              </div>
              <div class="pass-row">
                <span class="label">Status:</span>
                <span class="val" style="color: #34d399;">Confirmed Entry</span>
              </div>
            </div>

            <div class="instructions">
              <strong>Important Guidelines for Event Day:</strong>
              <ul style="margin: 8px 0 0; padding-left: 20px;">
                <li>Please carry your valid College / Student ID card to the reporting desk.</li>
                <li>Present this confirmation email or your digital reference ID (<strong>${cleanRef}</strong>) at the desk to collect your official participant lanyard.</li>
                <li>Report at the respective laboratory / auditorium 30 minutes prior to event commencement.</li>
              </ul>
            </div>

            <p style="color: #9ca3af; font-size: 13px; margin-top: 24px; line-height: 1.5;">
              For any competition queries or travel assistance, feel free to reply directly to this email or reach us at <a href="mailto:techavi@nitnagaland.ac.in" style="color: #38bdf8;">techavi@nitnagaland.ac.in</a>.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">National Institute of Technology Nagaland • Chumukedima, Nagaland - 797103</p>
            <p style="margin: 6px 0 0;">Where Innovation Meets Inspiration • Tech Avinya 2026</p>
          </div>
        </div>
      </body>
      </html>
    `
    : `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0b1329; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ea580c 100%); padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 2px; font-weight: 800; text-transform: uppercase; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
          .box { background: #030712; border: 1px solid #374151; border-radius: 12px; padding: 18px; margin: 20px 0; font-size: 13px; }
          .instructions { background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 14px; border-radius: 6px; font-size: 13px; line-height: 1.6; color: #cbd5e1; margin-top: 20px; }
          .footer { background: #030712; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Tech Avinya 2026</h1>
            <p style="margin: 6px 0 0; color: #fef2f2; font-size: 13px; letter-spacing: 1.5px;">NIT NAGALAND</p>
          </div>
          <div class="content">
            <div style="text-align: center;">
              <span class="badge">✕ REGISTRATION NOT APPROVED</span>
            </div>
            <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Dear ${cleanName},</h2>
            <p style="color: #cbd5e1; line-height: 1.6; font-size: 14px;">
              Thank you for registering for <strong>${cleanEvent}</strong> at <strong>Tech Avinya 2026</strong>.
            </p>
            <p style="color: #cbd5e1; line-height: 1.6; font-size: 14px;">
              Following desk review, your enrollment could not be approved at this time.
            </p>

            <div class="box">
              <p style="margin: 0 0 6px 0; color: #9ca3af;">Reference ID: <strong style="color: #ffffff;">${cleanRef}</strong></p>
              <p style="margin: 0; color: #9ca3af;">Event: <strong style="color: #ffffff;">${cleanEvent}</strong></p>
              ${reason ? `<p style="margin: 8px 0 0; color: #fca5a5;"><strong>Coordinator Note:</strong> ${reason}</p>` : ''}
            </div>

            <div class="instructions">
              <strong>Possible Reasons for Disapproval:</strong>
              <ul style="margin: 8px 0 0; padding-left: 20px;">
                <li>The UPI Transaction ID / UTR number could not be reconciled with the bank records.</li>
                <li>The attached payment proof screenshot was unclear, missing, or cropped.</li>
                <li>Incomplete roster details or duplicate entries.</li>
              </ul>
            </div>

            <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6; margin-top: 20px;">
              <strong>Need Help?</strong><br/>
              If you have already transferred the fee and believe this rejection is a discrepancy, please reply directly to this email or contact us at <a href="mailto:techavi@nitnagaland.ac.in" style="color: #38bdf8;">techavi@nitnagaland.ac.in</a> with your valid payment screenshot and UTR number.
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">National Institute of Technology Nagaland • Tech Avinya 2026 Committee</p>
          </div>
        </div>
      </body>
      </html>
    `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to.trim()],
        subject: subject,
        html: htmlContent,
      }),
    });

    const resData = await res.json();
    if (res.ok) {
      console.log(`✅ [Resend Success] Decision email successfully sent to ${to} (${status}). Resend ID: ${resData.id}`);
      return { success: true, id: resData.id };
    } else {
      console.error(`❌ [Resend Error] Failed to send email to ${to}:`, resData);
      return { success: false, error: resData, message: resData.message || 'Resend API rejected email.' };
    }
  } catch (err) {
    console.error('[Resend Network Exception]', err);
    return { success: false, error: err.message, message: 'Network error communicating with Resend.' };
  }
};

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Tech Avinya Backend API',
    supabaseConnected: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    supabaseConnected: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// 1. EVENT ENROLLMENT / REGISTRATION
// Supports both /api/enroll and /api/register
// -------------------------------------------------------------
const handleEnrollment = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    // Field normalizations (supporting both Enroll.jsx and RegistrationForm.jsx)
    const eventId = body.eventId || body.event_id;
    const eventTitle = body.eventTitle || body.event_title || 'Event Registration';
    const fullName = body.fullName || body.leaderName || body.name;
    const email = body.email;
    const phone = body.phone || body.mobile;
    const college = body.college || body.collegeAffiliation || body.affiliation || 'Other College/University';
    const rollNumber = body.rollNumber || body.roll_number || body.registrationNumber;
    const teamName = body.teamName || body.team_name || null;
    const inGameID = body.inGameID || body.id || body.in_game_id || null;
    const utrNumber = body.utrNumber || body.utr || body.paymentReference || null;
    const rawNote = body.note || body.queries || '';
    const note = utrNumber && !rawNote.includes(utrNumber)
      ? `[UTR: ${utrNumber}] ${rawNote}`.trim()
      : (rawNote || null);

    // 1. Basic validation
    if (!eventId || !fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: Event, Name, Email, and Mobile Number are required.',
      });
    }

    // 2. Validate Mobile Number (Must be 10 digits)
    const phoneValidation = validateMobile(phone);
    if (!phoneValidation.valid) {
      return res.status(400).json({
        success: false,
        message: phoneValidation.error,
      });
    }

    // 3. Validate Roll Number (If provided or if NIT Nagaland, must be 10 digits)
    if (rollNumber) {
      const rollValidation = validateRollNumber(rollNumber);
      if (!rollValidation.valid) {
        return res.status(400).json({
          success: false,
          message: rollValidation.error,
        });
      }
    } else if (college === 'NIT Nagaland') {
      return res.status(400).json({
        success: false,
        message: 'Registration / Roll Number is required for NIT Nagaland students and must be exactly 10 digits.',
      });
    }

    // 4. Validate Team Members (if team event)
    let parsedTeamMembers = [];
    if (body.teamMembers) {
      try {
        parsedTeamMembers = typeof body.teamMembers === 'string'
          ? JSON.parse(body.teamMembers)
          : body.teamMembers;
      } catch {
        parsedTeamMembers = [];
      }
    }

    // Check team members roll numbers
    for (let i = 0; i < parsedTeamMembers.length; i++) {
      const member = parsedTeamMembers[i];
      if (member.rollNumber && member.rollNumber.trim() !== '') {
        if (!/^\d{10}$/.test(member.rollNumber.trim())) {
          return res.status(400).json({
            success: false,
            message: `Team Member ${i + 1} (${member.name || 'Member'}) Roll Number must be exactly 10 digits.`,
          });
        }
      }
    }

    // 5. Handle payment screenshot
    let screenshotUrl = null;
    if (file) {
      screenshotUrl = await uploadScreenshotToSupabase(file, 'enrollments');
    }

    // 6. Save to Supabase (or fallback in-memory if Supabase not yet configured)
    if (isSupabaseConfigured()) {
      const record = {
        event_id: eventId,
        event_title: eventTitle,
        full_name: fullName,
        email: email,
        phone: phoneValidation.value,
        college: college,
        roll_number: rollNumber ? String(rollNumber).trim() : null,
        team_name: teamName,
        team_members: parsedTeamMembers,
        in_game_id: inGameID,
        note: note,
        screenshot_url: screenshotUrl,
        status: 'Pending',
      };

      const { data, error } = await supabase
        .from('registrations')
        .insert([record])
        .select();

      if (error) {
        console.error('[Supabase Insert Error]', error);
        return res.status(500).json({
          success: false,
          message: `Database error: ${error.message}`,
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Your details have been submitted.',
        registration: data ? data[0] : record,
      });
    } else {
      // Mock success response when Supabase credentials are yet to be filled
      return res.status(201).json({
        success: true,
        message: 'Registration successful! (Demo Mode: Add SUPABASE_URL to persist to database)',
        registration: {
          id: `demo_${Date.now()}`,
          eventId,
          eventTitle,
          fullName,
          email,
          phone: phoneValidation.value,
          college,
          rollNumber,
          teamName,
          teamMembers: parsedTeamMembers,
          status: 'Pending',
          registrationTime: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('[Enrollment Handler Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while processing enrollment.',
    });
  }
};

// Support both single file field names: 'screenshot' and 'imageUpload'
app.post(
  '/api/enroll',
  upload.fields([{ name: 'screenshot', maxCount: 1 }, { name: 'imageUpload', maxCount: 1 }]),
  (req, res, next) => {
    if (req.files) {
      req.file = req.files['screenshot']?.[0] || req.files['imageUpload']?.[0] || null;
    }
    next();
  },
  handleEnrollment
);

app.post(
  '/api/register',
  upload.fields([{ name: 'screenshot', maxCount: 1 }, { name: 'imageUpload', maxCount: 1 }]),
  (req, res, next) => {
    if (req.files) {
      req.file = req.files['screenshot']?.[0] || req.files['imageUpload']?.[0] || null;
    }
    next();
  },
  handleEnrollment
);

// -------------------------------------------------------------
// 2. SPONSOR INQUIRIES ("CONNECT WITH US")
// POST /api/sponsors
// -------------------------------------------------------------
app.post('/api/sponsors', upload.none(), async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, website, tier, message } = req.body;

    // 1. Validation
    if (!companyName || !contactPerson || !email || !phone || !tier) {
      return res.status(400).json({
        success: false,
        message: 'Company Name, Contact Person, Email, Phone, and Sponsorship Tier are required.',
      });
    }

    // 2. 10-Digit Mobile Validation
    const phoneValidation = validateMobile(phone);
    if (!phoneValidation.valid) {
      return res.status(400).json({
        success: false,
        message: phoneValidation.error,
      });
    }

    // 3. Save to Supabase
    const rawWebsite = website ? String(website).trim() : '';
    const cleanWebsite = rawWebsite
      ? (rawWebsite.startsWith('http://') || rawWebsite.startsWith('https://') ? rawWebsite : `https://${rawWebsite}`)
      : null;

    if (isSupabaseConfigured()) {
      const record = {
        company_name: companyName.trim(),
        contact_person: contactPerson.trim(),
        email: email.trim(),
        phone: phoneValidation.value,
        website: cleanWebsite,
        tier: tier.trim(),
        message: message ? message.trim() : null,
        status: 'New',
      };

      const { data, error } = await supabase
        .from('sponsor_inquiries')
        .insert([record])
        .select();

      if (error) {
        console.error('[Supabase Sponsor Insert Error]', error);
        return res.status(500).json({
          success: false,
          message: `Database error: ${error.message}`,
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Thank you! Your sponsor inquiry has been submitted. Our team will contact you shortly.',
        sponsor: data ? data[0] : record,
      });
    } else {
      // Demo response
      return res.status(201).json({
        success: true,
        message: 'Inquiry received! (Demo Mode: Add SUPABASE_URL to persist to database)',
        sponsor: {
          id: `sponsor_${Date.now()}`,
          companyName,
          contactPerson,
          email,
          phone: phoneValidation.value,
          tier,
          status: 'New',
          created_at: new Date().toISOString(),
        },
      });
    }
  } catch (err) {
    console.error('[Sponsor API Error]', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error while submitting sponsor inquiry.',
    });
  }
});

// -------------------------------------------------------------
// 3. ADMIN AUTHENTICATION
// POST /api/admin/login
// -------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPass = String(password).trim();

  // Custom credentials configured via environment variables (or defaults if not set)
  const customEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim().toLowerCase() : 'admin@nitn.ac.in';
  const customPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : 'Admin@123';

  if (cleanEmail === customEmail && cleanPass === customPassword) {
    return res.json({
      success: true,
      message: 'Login successful!',
      registrations: {
        token: `token_${Date.now()}`,
        email: cleanEmail,
        role: 'admin',
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid admin credentials. Please check email and password.',
  });
});

// -------------------------------------------------------------
// 4. ADMIN - FETCH ALL REGISTRATIONS
// GET /api/admin/registrations
// -------------------------------------------------------------
app.get('/api/admin/registrations', async (req, res) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Fetch Registrations Error]', error);
        return res.status(500).json({ success: false, message: error.message });
      }

      // Format data to match frontend properties
      const mapped = (data || []).map((item) => ({
        registrationId: item.id,
        id: item.id,
        eventId: item.event_id,
        eventTitle: item.event_title,
        leaderName: item.full_name,
        fullName: item.full_name,
        email: item.email,
        phone: item.phone,
        college: item.college,
        rollNumber: item.roll_number,
        teamName: item.team_name,
        teamMembers: item.team_members,
        inGameID: item.in_game_id,
        note: item.note,
        imageUrl: item.screenshot_url,
        screenshot_url: item.screenshot_url,
        status: item.status || 'Pending',
        registrationTime: item.created_at,
        created_at: item.created_at,
      }));

      return res.json({ success: true, registrations: mapped });
    }

    // Default empty array if DB not yet connected
    return res.json({ success: true, registrations: [] });
  } catch (err) {
    console.error('[Admin Registrations Route Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 5. ADMIN - UPDATE REGISTRATION STATUS
// PUT /api/admin/registration/status/:id
// -------------------------------------------------------------
app.put('/api/admin/registration/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status, reason, email, fullName, eventTitle } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required.' });
  }

  try {
    let updatedRecord = null;

    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('registrations')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      updatedRecord = data && data[0] ? data[0] : null;
    }

    // Automatically trigger Resend decision email when status is Accepted or Rejected
    let emailResult = null;
    const targetEmail = updatedRecord?.email || email;
    const targetName = updatedRecord?.full_name || fullName;
    const targetEvent = updatedRecord?.event_title || eventTitle;

    if (targetEmail && (status === 'Accepted' || status === 'Rejected')) {
      emailResult = await sendResendEmail({
        to: targetEmail,
        fullName: targetName,
        eventTitle: targetEvent,
        status,
        registrationId: id,
        reason: reason || null,
      });
    }

    return res.json({
      success: true,
      message: `Status updated to ${status}.${emailResult?.success ? ' Confirmation email forwarded via Resend.' : ''}`,
      emailSent: Boolean(emailResult?.success),
      emailResult,
      data: updatedRecord,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 5B. ADMIN - MANUAL RESEND EMAIL TRIGGER
// POST /api/admin/send-email
// -------------------------------------------------------------
app.post('/api/admin/send-email', async (req, res) => {
  const { to, fullName, eventTitle, status, registrationId, reason } = req.body;

  if (!to || !status) {
    return res.status(400).json({ success: false, message: 'Recipient email and status are required.' });
  }

  try {
    const result = await sendResendEmail({
      to,
      fullName,
      eventTitle,
      status,
      registrationId,
      reason,
    });

    if (result.success) {
      return res.json({ success: true, message: `Email forwarded to ${to} via Resend.`, id: result.id });
    } else {
      return res.status(result.skipped ? 200 : 500).json({
        success: false,
        message: result.message || 'Failed to send email via Resend.',
        error: result.error,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 6. ADMIN - FETCH ALL SPONSORS INQUIRIES
// GET /api/admin/sponsors
// -------------------------------------------------------------
app.get('/api/admin/sponsors', async (req, res) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('sponsor_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Fetch Sponsors Error]', error);
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.json({ success: true, sponsors: data || [] });
    }

    return res.json({ success: true, sponsors: [] });
  } catch (err) {
    console.error('[Admin Sponsors Route Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// 7. ADMIN - UPDATE SPONSOR INQUIRY STATUS
// PUT /api/admin/sponsors/status/:id
// -------------------------------------------------------------
app.put('/api/admin/sponsors/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required.' });
  }

  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('sponsor_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();

      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

      return res.json({ success: true, message: 'Sponsor status updated successfully.', data });
    }

    return res.json({ success: true, message: `Status updated to ${status} (Demo Mode).` });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Only start listener if not running in a serverless environment (like Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tech Avinya Backend is running on port ${PORT}`);
    console.log(`📡 Supabase configured: ${isSupabaseConfigured() ? '✅ YES' : '❌ NO (check .env)'}`);
  });
}

// Export default for Vercel Serverless
export default app;
