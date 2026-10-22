import React, { useEffect, useRef } from 'react';

/**
 * TechfestCyberBackground
 * Inspired by IIT Bombay Techfest's futuristic theme:
 * - Deep dark space cybernetic gradient
 * - 3D Perspective Cyber Grid undulating on the ground/plane
 * - Interactive neon constellation node particles (cyan / electric blue / purple)
 * - Mouse-reactive energy ripples & warp flares
 * - Lightweight, 60 FPS HTML5 Canvas with auto resize
 */
export default function TechfestCyberBackground({ 
  gridColor = 'rgba(0, 240, 255, 0.18)',
  accentColor = 'rgba(168, 85, 247, 0.25)',
  particleCount = 55
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Floating particles (constellation nodes)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#00f0ff' : '#a855f7',
      pulse: Math.random() * Math.PI * 2,
    }));

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Cyber Ambient Deep Space Glow
      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.35, 80,
        width / 2, height * 0.5, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a122c');
      bgGrad.addColorStop(0.5, '#040714');
      bgGrad.addColorStop(1, '#010309');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Mouse Spotlight Glow (Techfest Flare)
      if (mouse.active) {
        const flareGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.6
        );
        flareGrad.addColorStop(0, 'rgba(0, 240, 255, 0.16)');
        flareGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
        flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. 3D Perspective Cybernetic Grid (Floor horizon gliding)
      const horizonY = height * 0.52;
      const fov = 340;
      gridOffset = (gridOffset + 0.65) % 40;

      ctx.save();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Longitudinal lines vanishing to horizon center
      const vanishingX = width * 0.5;
      const numLines = 26;
      for (let i = -numLines / 2; i <= numLines / 2; i++) {
        const xBottom = vanishingX + (i * (width / 16));
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // Horizontal perspective cross-lines moving forward
      for (let z = 10; z < 420; z += 35) {
        const currentZ = (z + gridOffset) % 400 + 10;
        const scale = fov / (fov + currentZ * 1.5);
        const y = horizonY + (height - horizonY) * (1 - scale * 0.95);
        if (y > horizonY && y < height) {
          const alpha = Math.min(1, Math.max(0, (y - horizonY) / (height - horizonY)));
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Glowing horizon beam
      const horizonBeam = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 6);
      horizonBeam.addColorStop(0, 'rgba(0, 240, 255, 0)');
      horizonBeam.addColorStop(0.5, 'rgba(0, 240, 255, 0.45)');
      horizonBeam.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = horizonBeam;
      ctx.fillRect(0, horizonY - 2, width, 8);
      ctx.restore();

      // 3. Neon Constellation Particle Matrix
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse deflection
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        const size = p.size + Math.sin(p.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with tech lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.28;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gridColor, accentColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: '#020409',
      }}
    />
  );
}
