import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

/* ---------- starfield background ---------- */
const starOptions = {
  background: { color: { value: 'transparent' } },
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    color: { value: ['#ffffff', '#cfe9ff', '#ffe9b0'] },
    links: { enable: false },
    move: { enable: true, speed: 0.15, direction: 'none', outModes: 'out' },
    number: { value: 90, density: { enable: true, area: 900 } },
    opacity: {
      value: { min: 0.15, max: 0.8 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: { value: { min: 0.4, max: 1.8 } },
  },
  interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
};

/* ---------- slide content ---------- */
const SLIDES = [
  {
    title: ['Tech', 'Avinya'],
    image: '/about/tech-avinya.png',
    seed: 7,
    seal: ['TA'],
    paras: [
      'Tech Avinya is the annual technical festival of NIT Nagaland, serving as a dynamic platform for students to showcase their skills in a series of events, workshops, and hackathons.',
      'The fest is a celebration of technology, creativity, and collaboration, providing unique opportunities for networking with industry experts and inspiring the next generation of leaders in engineering and innovation.',
    ],
  },
  {
    title: ['NIT', 'Nagaland'],
    image: '/about/nitn.png',
    seed: 23,
    seal: ['NIT'],
    paras: [
      'National Institute of Technology Nagaland is a premier technical institute established in 2010 as one of the 31 NITs in India, dedicated to providing quality technical education and fostering innovation.',
      'Located in Chümoukedima, Nagaland, the institute is committed to promoting regional diversity and a rich, multicultural learning environment, offering a wide range of undergraduate and postgraduate programs.',
    ],
  },
];

/* ---------- torn edge generation ---------- */
const N = 56; // points along the tear

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Natural tear = slow wander (big bulges) + medium wobble + sharp fibre jitter + occasional spikes
function makeEdge(seed) {
  const r = rng(seed);
  const ph = [r() * 6.28, r() * 6.28, r() * 6.28];
  const pts = [];
  let walk = 0;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    walk += (r() - 0.5) * 2.2;
    walk *= 0.88;
    const slow = Math.sin(t * 5.2 + ph[0]) * 4.2 + Math.sin(t * 11 + ph[1]) * 1.6;
    const spike = r() > 0.88 ? (r() - 0.5) * 7 : 0;
    const jag = (r() - 0.5) * 3.2 + spike;
    const rim = (r() - 0.5) * 3.6 + (r() > 0.9 ? (r() - 0.5) * 5 : 0);
    pts.push({ s: slow + walk, j: jag, rim });
  }
  return pts;
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// p: 0 (fully closed) -> 1 (fully torn open). The tear travels along the edge as it opens.
function polygon(edge, p, rest, mobile, rimMode) {
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const local = easeInOut(clamp(p * 1.6 - t * 0.6));
    const e = edge[i];
    const target = rest + e.s + (rimMode ? e.rim * 0.9 - 1.6 : e.j);
    const pos = 102 + (target - 102) * local;
    pts.push(mobile ? `${(t * 100).toFixed(2)}% ${pos.toFixed(2)}%` : `${pos.toFixed(2)}% ${(t * 100).toFixed(2)}%`);
  }
  pts.push(mobile ? '102% 102%' : '102% 102%');
  pts.push(mobile ? '-2% 102%' : '102% -2%');
  return `polygon(${pts.join(',')})`;
}

function useMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(max-width: 767px)');
    const f = () => setM(q.matches);
    f();
    q.addEventListener('change', f);
    return () => q.removeEventListener('change', f);
  }, []);
  return m;
}

/* ---------- small decorative pieces ---------- */
const Cloud = ({ className }) => (
  <svg className={className} viewBox="0 0 160 60" fill="none" stroke="#e8c76a" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
    <path d="M4 38c14 0 18-12 30-12 8 0 10 8 18 8 6 0 8-6 16-6 12 0 12 14 26 14 8 0 12-4 20-4" />
    <path d="M30 26c0-8 10-10 14-5-2-6 6-10 11-4" />
    <path d="M12 46c20 2 30-4 50-4s28 6 56 4" opacity=".6" />
  </svg>
);

const Arrow = ({ dir, onClick, label, side }) => (
  <button type="button" onClick={onClick} aria-label={label} className={`ta-arrow ${side}`}>
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

/* ---------- component ---------- */
export default function About() {
  const mobile = useMobile();
  const [shown, setShown] = useState(0); // slide whose content is on screen
  const [active, setActive] = useState(0); // slide the dots highlight
  const [progress, setProgress] = useState(0);
  const [textIn, setTextIn] = useState(false);
  const busy = useRef(false);
  const raf = useRef(0);

  const edges = useMemo(() => SLIDES.map((s) => makeEdge(s.seed)), []);
  const rest = mobile ? 58 : 57;

  const tween = useCallback(
    (from, to, ms) =>
      new Promise((resolve) => {
        const start = performance.now();
        const step = (now) => {
          const k = clamp((now - start) / ms);
          setProgress(from + (to - from) * k);
          if (k < 1) raf.current = requestAnimationFrame(step);
          else resolve();
        };
        raf.current = requestAnimationFrame(step);
      }),
    []
  );

  // opening reveal
  useEffect(() => {
    let live = true;
    busy.current = true;
    const id = setTimeout(async () => {
      setTextIn(true);
      await tween(0, 1, 1800);
      if (live) busy.current = false;
    }, 250);
    return () => {
      live = false;
      clearTimeout(id);
      cancelAnimationFrame(raf.current);
    };
  }, [tween]);

  const goTo = useCallback(
    async (next) => {
      if (busy.current || next === shown) return;
      busy.current = true;
      setActive(next);
      setTextIn(false);
      await tween(1, 0, 750); // paper closes over the picture
      setShown(next);
      await new Promise((r) => setTimeout(r, 120));
      setTextIn(true);
      await tween(0, 1, 1500); // new tear opens
      busy.current = false;
    },
    [shown, tween]
  );

  const slide = SLIDES[shown];
  const edge = edges[shown];
  const clip = polygon(edge, progress, rest, mobile, false);
  const rimClip = polygon(edge, progress, rest, mobile, true);

  return (
    <section className="ta-about">
      <style>{css}</style>

      <Particles
        id="tsparticles-about"
        init={async (m) => loadSlim(m)}
        options={starOptions}
        className="ta-stars"
      />

      <div className="ta-wrap">
        <div className="ta-card">
          {/* gold paper */}
          <div className="ta-paper" />
          <Cloud className="ta-cloud c1" />
          <Cloud className="ta-cloud c2" />

          {/* torn reveal: soft shadow wrapper > teal rim > picture */}
          <div className="ta-reveal" aria-hidden="true">
            <div className="ta-rim" style={{ clipPath: rimClip, WebkitClipPath: rimClip }} />
            <div className="ta-pic" style={{ clipPath: clip, WebkitClipPath: clip }}>
              <img src={slide.image} alt="" />
              <div className="ta-pic-fade" />
            </div>
          </div>

          {/* text */}
          <div className={`ta-text ${textIn ? 'in' : ''}`}>
            <p className="ta-eyebrow">About</p>
            <h2 className="ta-title">
              {slide.title.map((w) => (
                <span key={w}>{w}</span>
              ))}
              <i className="ta-seal">
                {slide.seal[0].split('').map((c, i) => (
                  <b key={i}>{c}</b>
                ))}
              </i>
            </h2>
            {slide.paras.map((p, i) => (
              <p key={i} className="ta-para" style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
                {p}
              </p>
            ))}
          </div>

          <Arrow dir="left" side="l" label="Previous" onClick={() => goTo((shown + 1) % SLIDES.length)} />
          <Arrow dir="right" side="r" label="Next" onClick={() => goTo((shown + 1) % SLIDES.length)} />
        </div>

        <div className="ta-dots" role="tablist" aria-label="About slides">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Slide ${i + 1}`}
              className={active === i ? 'on' : ''}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- styles ---------- */
const noise =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.12  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
const mottle =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='.012 .02' numOctaves='4' seed='4'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.78  0 0 0 0 0.25  0 0 0 .9 -.25'/></filter><rect width='100%' height='100%' filter='url(%23m)'/></svg>\")";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Kaushan+Script&display=swap');

.ta-about{position:relative;width:100%;min-height:100vh;background:radial-gradient(ellipse at 50% 30%,#0b1a33 0%,#050a16 60%,#02040a 100%);overflow:hidden;display:flex;align-items:center;justify-content:center;padding:80px 16px}
.ta-stars{position:absolute;inset:0;z-index:0}
.ta-stars canvas{position:absolute!important;inset:0;width:100%!important;height:100%!important}
.ta-wrap{position:relative;z-index:1;width:100%;max-width:1120px}

.ta-card{position:relative;width:100%;aspect-ratio:2.05/1;min-height:430px;border-radius:8px;overflow:hidden;background:#b58a14;box-shadow:0 30px 70px -20px rgba(0,0,0,.8),0 0 0 1px rgba(255,226,140,.18)}
.ta-paper{position:absolute;inset:0;background:
  ${mottle},
  radial-gradient(ellipse at 20% 15%,#d2a824 0%,transparent 55%),
  radial-gradient(ellipse at 70% 90%,#7b5a08 0%,transparent 60%),
  linear-gradient(135deg,#a67f12,#c49a1c 45%,#8f6c0b);
  background-blend-mode:soft-light,normal,normal,normal}
.ta-paper::after{content:'';position:absolute;inset:0;background:${noise};mix-blend-mode:multiply;opacity:.55}
.ta-paper::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 55%,rgba(40,24,0,.45) 100%);z-index:1}

.ta-cloud{position:absolute;width:130px;opacity:.45;z-index:2;pointer-events:none}
.ta-cloud.c1{left:3%;top:14%}
.ta-cloud.c2{left:42%;top:28%;width:110px}

.ta-reveal{position:absolute;inset:0;z-index:3;pointer-events:none;filter:drop-shadow(-8px 0 14px rgba(30,16,0,.55))}
.ta-rim{position:absolute;inset:0;background:linear-gradient(180deg,#a8ffe0 0%,#32d3b8 35%,#f6dc8a 70%,#2fcfb0 100%);filter:drop-shadow(0 0 6px rgba(120,255,214,.55))}
.ta-pic{position:absolute;inset:0;background:#06101f}
.ta-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right center}
.ta-pic-fade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,8,20,.35),transparent 30%)}

.ta-text{position:absolute;z-index:4;left:7%;top:0;bottom:0;width:46%;display:flex;flex-direction:column;justify-content:center;color:#fff4d2;font-family:'Cormorant Garamond',serif}
.ta-eyebrow{font-size:.78rem;letter-spacing:.42em;text-transform:uppercase;opacity:0;transform:translateY(8px);transition:all .7s ease;margin:0 0 .6rem;color:#f6e3a6}
.ta-title{position:relative;display:flex;flex-direction:column;margin:0 0 1.4rem;font-family:'Kaushan Script',cursive;font-weight:400;font-size:clamp(2.6rem,6vw,4.9rem);line-height:.92;color:#fff6dc;text-shadow:0 0 18px rgba(255,236,170,.55),0 2px 0 rgba(120,80,0,.35);opacity:0;transform:translateY(14px) rotate(-2deg);transform-origin:left;transition:all .9s cubic-bezier(.2,.7,.2,1) .1s}
.ta-title span:nth-child(2){padding-left:.5em}
.ta-seal{position:absolute;right:4%;bottom:6%;display:flex;flex-direction:column;align-items:center;justify-content:center;width:26px;min-height:44px;padding:3px 0;border:1.5px solid #e2492b;border-radius:2px;color:#e2492b;font:normal 600 10px/1.15 'Cormorant Garamond',serif;opacity:.9;text-shadow:none}
.ta-para{font-size:clamp(.92rem,1.45vw,1.14rem);line-height:1.55;margin:0 0 .95rem;max-width:30em;color:#fff1c6;opacity:0;transform:translateY(12px);transition:opacity .8s ease,transform .8s ease}
.ta-text.in .ta-eyebrow,.ta-text.in .ta-title,.ta-text.in .ta-para{opacity:1;transform:none}

.ta-arrow{position:absolute;z-index:6;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(18,12,2,.88);color:#fff4d2;border:1.5px solid rgba(255,238,185,.85);cursor:pointer;transition:transform .25s,background .25s}
.ta-arrow:hover{transform:translateY(-50%) scale(1.1);background:#000}
.ta-arrow:focus-visible{outline:2px solid #7ff0d2;outline-offset:3px}
.ta-arrow.l{left:14px}.ta-arrow.r{right:14px}

.ta-dots{display:flex;justify-content:center;gap:14px;margin-top:22px}
.ta-dots button{width:13px;height:13px;border-radius:50%;border:1.5px solid rgba(255,255,255,.8);background:transparent;cursor:pointer;padding:0;transition:background .3s,transform .3s}
.ta-dots button.on{background:#fff;transform:scale(1.1)}
.ta-dots button:focus-visible{outline:2px solid #7ff0d2;outline-offset:3px}

@media (max-width:767px){
  .ta-card{aspect-ratio:auto;min-height:700px}
  .ta-text{left:7%;right:7%;width:auto;top:5%;bottom:auto;justify-content:flex-start}
  .ta-pic img{object-position:center bottom}
  .ta-pic-fade{background:linear-gradient(180deg,rgba(2,8,20,.35),transparent 30%)}
  .ta-arrow{top:auto;bottom:16px;transform:none}
  .ta-arrow:hover{transform:scale(1.1)}
  .ta-cloud.c2{display:none}
}
@media (prefers-reduced-motion:reduce){
  .ta-title,.ta-para,.ta-eyebrow{transition-duration:.01s!important}
}
`;
