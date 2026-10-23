import React, { useState } from 'react';
import aboutvideo from '../assets/globe.jpg';
import { FaInstagram, FaEnvelope, FaLinkedinIn, FaPhone } from 'react-icons/fa';

export default function Contact() {
  const contactPersons = [
    {
      id: 1,
      name: "Limathung Y Ezung",
      role: "General Secretary",
      image: "/secretary/general.jpeg",
      contact: "+91 7005734288",
      social: { instagram: "https://www.instagram.com/mark__the__middle/?hl=en", linkedin: "", email: "limzalenezung@gmail.com" }
    },
    {
      id: 2,
      name: "Diviyanshu Mishra",
      role: "Technical Secretary",
      image: "/secretary/technical.png",
      contact: "+91 7755803253",
      social: { instagram: "https://www.instagram.com/divyanshu_mishra_1911/", linkedin: "https://www.linkedin.com/in/divyanshu-mishra-nit20241033/", email: "divyanshu.nit.28@gmail.com" }
    },
    {
      id: 3,
      name: "Ayito Ladu",
      role: "Technical Secretary",
      image: "/secretary/technical2.jpg",
      contact: "+91 8413065222",
      social: { instagram: "", linkedin: "https://www.linkedin.com/in/ayito-ladu-a6009430a?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "AYITO5359@nitnagaland.ac.in" }
    },
    {
      id: 4,
      name: "Md Meraj Alam",
      role: "Coding Club Secretary",
      image: "/secretary/coding.jpg",
      contact: "+91 9534342082",
      social: { instagram: "https://www.instagram.com/_merx_zzzz__/", linkedin: "https://www.linkedin.com/in/meraj-alam75/", email: "merajalamnazeeri@gmail.com" }
    },
    {
      id: 5,
      name: "Adi Yhor",
      role: "Coding Club Secretary",
      image: "/secretary/coding2.jpg",
      contact: "+91 9233957278",
      social: { instagram: "https://www.instagram.com/a_yhor002?stkn=MTNnNjdka3lyMG10aQ==", linkedin: "https://www.linkedin.com/in/adi-yhor-a6640b36a?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "Adiyhor@gmail.com" }
    },
    {
      id: 6,
      name: "Saurabh Patel",
      role: "Robotics Club Secretary",
      image: "/secretary/robo.png",
      contact: "+91 8708676451",
      social: { instagram: "", linkedin: "https://www.linkedin.com/in/saurabhp04/", email: "saurabh4366@nitnagaland.ac.in" }
    },
    {
      id: 7,
      name: "Buti P",
      role: "Robotics Club Secretary",
      image: "/secretary/robo2.png",
      contact: "+91 8119028697",
      social: { instagram: "https://www.instagram.com/bti_bty?stkn=MTgxN2dkeDRnY3Vscw==", linkedin: "https://www.linkedin.com/in/buti-thai-47596539a?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "butithai122@gmail.com" }
    },
    {
      id: 8,
      name: "Pranjal Mishra",
      role: "Entrepreneurship Club Secretary",
      image: "/secretary/ecell.jpg",
      contact: "+91 8545869601",
      social: { instagram: "https://www.instagram.com/pranjalmishra0601/", linkedin: "https://www.linkedin.com/in/pranjal-mishra-8bb6ab306", email: "mpranjal093@gmail.com" }
    },
    {
      id: 9,
      name: "Khamthak wangsu ",
      role: "Entrepreneurship Club Secretary",
      image: "/secretary/ecell2.jpg",
      contact: "+91 6003801527",
      social: { instagram: "https://www.instagram.com/wangsukhamthak?stkn=ZjFzNGE1a3hmbGE3", linkedin: "https://www.linkedin.com/in/khamthak-wangsu-0a5211340?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "khamthak21@gmail.com" }
    },
    {
      id: 10,
      name: "Navnit kumar",
      role: "Quants Club Secretary",
      image: "/secretary/quants.png",
      contact: "+91 9341240119",
      social: { instagram: "https://www.instagram.com/___navnittt___?vrfl=bXFzczVvbDVkbDV0", linkedin: "https://www.linkedin.com/in/navnit-kumar-72b470330?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "nkmaurya934124@gmail.com" }
    },
     {
      id: 11,
      name: "Kohliba",
      role: "Quants Club Secretary",
      image: "/secretary/quants2.jpeg",
      contact: "+91 7005437886",
      social: { instagram: "", linkedin: "", email: "kohlitstm@gmail.com" }
    },
    {
      id: 12,
      name: "Sahil",
      role: "Esports Secretary",
      image: "/secretary/esports.jpeg",
      contact: "+91 92797 16769",
      social: { instagram: "https://www.instagram.com/te_quiero.28/", linkedin: "", email: "" }
    },
    {
      id: 13,
      name: "Moachiten",
      role: "Esports Secretary",
      image: "/secretary/esports2.jpeg",
      contact: "+91 9362619196",
      social: { instagram: "https://www.instagram.com/moa_chiten?stkn=MWszMmFxcDNibDN3ag%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/in/moachiten-chiten-17a24b442?utm_source=share_via&utm_content=profile&utm_medium=member_ios", email: "moachiten@gmail.com" }
    },
    {
      id: 14,
      name: "Ayush Kumar",
      role: "Finance Secretary",
      image: "/secretary/finance.jpeg",
      contact: "+91 7643965792",
      social: { instagram: "https://www.instagram.com/_.aaayush.__?stkn=MTVmZm8wYmoyd3Zzbw%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/in/ayush-kumar-b02255339?utm_source=share_via&utm_content=profile&utm_medium=member_ios", email: "ayushkumarnit15@gmail.com" }
    },
    {
      id: 15,
      name: "Nuksungla Walling",
      role: "Finance Secretary",
      image: "/secretary/finance2.jpg",
      contact: "+91 9366149673",
      social: { instagram: "", linkedin: "", email: "" }
    },
    {
      id: 16,
      name: "Gadde Aajith Sai",
      role: "Hospitality Secretary",
      image: "/secretary/hospitality.jpg",
      contact: "+91 9182634569",
      social: { instagram: "https://www.instagram.com/aajith_1126?stkn=Y3NtaHloNm9ic2Rp", linkedin: "https://www.linkedin.com/in/aajith-sai-gadde-5432a7329?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "aajithsaigadde@gmail.com" }
    },
    {
      id: 17,
      name: "Lolly I Shohe ",
      role: "Hospitality Secretary",
      image: "/secretary/hospitality2.jpeg",
      contact: "+91 9362797457",
      social: { instagram: "https://www.instagram.com/l0lly.co?stkn=NDl5a3k4NG9jeDFu&utm_source=qr", linkedin: "https://www.linkedin.com/in/lolly-shohe-881823385?utm_source=share_via&utm_content=profile&utm_medium=member_ios", email: "shohelolly@gmail.com" }
    },
    {
      id: 18,
      name: "Anuj Prasad",
      role: "Developer",
      image: "/secretary/web.png",
      contact: "+91 9958284373",
      social: { instagram: "", linkedin: "", email: "anujprasad0099@gmail.com" }
    },
    {
      id: 19,
      name: "Anuj",
      role: "Developer",
      image: "/secretary/web2.jpeg",
      contact: "+91 8813090611",
      social: { instagram: "", linkedin: "https://www.linkedin.com/in/~-anuj-7a0991287?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "anujsharma88130@gmail.com" }
    },
    {
      id: 20,
      name: "Chirag kapoor",
      role: "Developer",
      image: "/secretary/web3.jpeg",
      contact: "+91 9350424769",
      social: { instagram: "https://www.instagram.com/chiragkapoor_47?psln=MW1jeWI3dGJ0MzNpMg==", linkedin: "https://www.linkedin.com/in/chirag-kapoor-2a287936a?utm_source=share_via&utm_content=profile&utm_medium=member_android", email: "kapoorchirag47@gmail.com" }
    },
  ];

  const teamCategories = [
    { name: "Convener", members: contactPersons.slice(0, 1) },
    { name: "Technical Board", members: contactPersons.slice(1, 3) },
    { name: "Coding Club", members: contactPersons.slice(3, 5) },
    { name: "Robotics Club", members: contactPersons.slice(5, 7) },
    { name: "Entrepreneurship Club", members: contactPersons.slice(7, 9) },
    { name: "Quants Club", members: contactPersons.slice(9, 11) },
    { name: "Esports Arena", members: contactPersons.slice(11, 13) },
    { name: "Finance Team", members: contactPersons.slice(13, 15) },
    { name: "Hospitality Team", members: contactPersons.slice(15, 17) },
    { name: "Web Team", members: contactPersons.slice(17, 20) }
  ];

  const formatLink = (platform, value) => {
    if (!value || value === '#') return null;
    const hasProtocol = /^https?:\/\//i.test(value);
    if (platform === 'instagram') {
      return hasProtocol ? value : `https://www.instagram.com/${value.replace(/^@/, '')}`;
    }
    if (platform === 'linkedin') {
      return hasProtocol ? value : `https://www.linkedin.com/in/${value}`;
    }
    return value;
  };

  const [tiltStyle, setTiltStyle] = useState({});
  const [flipped, setFlipped] = useState({}); 

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y / height - 0.5) * 16;
    const rotateY = (x / width - 0.5) * -16;

    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
        boxShadow: '0 20px 40px rgba(0, 255, 255, 0.25)',
      }
    }));
  };

  const handleMouseEnter = (id) => {
    setFlipped(prev => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyle(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
      }
    }));
    setFlipped(prev => ({ ...prev, [id]: false }));
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <img
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
        src={aboutvideo}
        alt="Background"
      />

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      <div className="relative z-10 w-full pt-20 pb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold Graduate font-['Press_Start_2P'] 
                       text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 
                       text-shadow-neon-cyan title-rocking">
          TEAM TECH AVINYA'26
        </h1>
        <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto mb-16 Gluten text-gray-300">
          Meet the dedicated team making it all happen.
        </p>

        {teamCategories.map((category, catIndex) => (
          <div key={catIndex} className="w-full mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-8 font-vt323 tracking-wide">
              {category.name}
            </h2>
            <div className="gap-8 px-4 max-w-6xl mx-auto flex flex-wrap justify-center items-center">
              {category.members.map(person => {
                const ig = formatLink('instagram', person.social.instagram);
                const li = formatLink('linkedin', person.social.linkedin);
                const email = person.social.email;
                const isFlipped = !!flipped[person.id];

                return (
                  <div
                    key={person.id}
                    onMouseMove={(e) => handleMouseMove(e, person.id)}
                    onMouseEnter={() => handleMouseEnter(person.id)}
                    onMouseLeave={() => handleMouseLeave(person.id)}
                    onClick={() => toggleFlip(person.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(person.id)}
                    className="group relative w-[280px] h-[380px] mx-auto cursor-pointer select-none"
                    style={tiltStyle[person.id]}
                  >
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400/60 via-teal-500/40 to-blue-600/60 shadow-[0_15px_40px_rgba(0,255,255,0.15)]">
                      <div className="relative h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 overflow-hidden">
                      
                        <div
                          className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          }}
                        >
                          
                          {/* FRONT CARD */}
                          <div
                            className="absolute inset-0 flex flex-col"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            {/* Expanded Image Area (70% height now) */}
                            <div className="relative w-full h-[70%] overflow-hidden">
                              <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            </div>

                            {/* Compact Details Area (30% height now with tighter padding/margins) */}
                            <div className="flex-grow flex flex-col items-center justify-center px-3 py-2 text-center">
                              <h3 className="text-lg md:text-xl font-semibold Graduate text-white leading-tight">
                                {person.name}
                              </h3>
                              <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                                {person.role}
                              </p>
                              <a
                                href={`tel:${person.contact.replace(/\s+/g, '')}`}
                                className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaPhone className="text-xs" />
                                <span className="Gluten">{person.contact}</span>
                              </a>
                              <p className="mt-1 text-[10px] text-gray-400">
                                Hover or tap to flip for socials
                              </p>
                            </div>
                          </div>

                          {/* BACK CARD */}
                          <div
                            className="absolute inset-0 p-5 flex flex-col items-center justify-between"
                            style={{
                              transform: 'rotateY(180deg)',
                              backfaceVisibility: 'hidden'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-emerald-500/10" />

                            <div className="relative w-full">
                              <h3 className="text-lg font-semibold Graduate text-white">
                                Connect with {person.name.split(' ')[0]}
                              </h3>
                              <p className="text-sm text-gray-300 Gluten">{person.role}</p>
                            </div>

                            <div className="relative flex flex-col items-center gap-4">
                              <div className="flex items-center gap-5">
                                {email && (
                                  <a
                                    href={`mailto:${email}`}
                                    aria-label="Email"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaEnvelope className="text-xl" />
                                  </a>
                                )}
                                
                                {ig && (
                                  <a
                                    href={ig}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-pink-300 hover:text-pink-200 hover:border-pink-400/40 hover:bg-pink-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaInstagram className="text-xl" />
                                  </a>
                                )}
                                
                                {li && (
                                  <a
                                    href={li}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="grid place-items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-blue-300 hover:text-blue-200 hover:border-blue-400/40 hover:bg-blue-400/10 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaLinkedinIn className="text-xl" />
                                  </a>
                                )}
                              </div>

                              <div className="text-center text-xs text-gray-400">
                                Tip: Click phone/email to contact directly
                              </div>
                            </div>

                            <div className="relative w-full">
                              <a
                                href={`tel:${person.contact.replace(/\s+/g, '')}`}
                                className="inline-flex items-center justify-center w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-200 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-colors Gluten"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaPhone className="mr-2" /> Call
                              </a>
                            </div>
                          </div>

                        </div>
            
                        <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[inset_0_0_60px_rgba(20,200,220,0.08)]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}