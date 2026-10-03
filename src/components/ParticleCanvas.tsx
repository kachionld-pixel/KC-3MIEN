import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface ParticleEffectHandle {
  burstExplosion: () => void;
  burstFireworks: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  shape: 'circle' | 'spark' | 'star';
  rotation?: number;
  rotationSpeed?: number;
}

export const ParticleCanvas = forwardRef<ParticleEffectHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleResize = () => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }, []);

    const startLoop = () => {
      if (animFrameRef.current) return;

      const render = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= p.decay;
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
          }

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;

          if (p.shape === 'star') {
            ctx.translate(p.x * dpr, p.y * dpr);
            if (p.rotation) ctx.rotate(p.rotation);
            ctx.beginPath();
            const spikes = 5;
            const outerR = p.size * dpr;
            const innerR = (p.size / 2) * dpr;
            let rot = (Math.PI / 2) * 3;
            const step = Math.PI / spikes;
            ctx.moveTo(0, -outerR);
            for (let s = 0; s < spikes; s++) {
              ctx.lineTo(Math.cos(rot) * outerR, Math.sin(rot) * outerR);
              rot += step;
              ctx.lineTo(Math.cos(rot) * innerR, Math.sin(rot) * innerR);
              rot += step;
            }
            ctx.closePath();
            ctx.fill();
          } else if (p.shape === 'spark') {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2 * dpr;
            ctx.beginPath();
            ctx.moveTo(p.x * dpr, p.y * dpr);
            ctx.lineTo((p.x - p.vx * 2.5) * dpr, (p.y - p.vy * 2.5) * dpr);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }

        if (particles.length > 0) {
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(render);
    };

    useImperativeHandle(ref, () => ({
      burstExplosion: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const colors = ['#ef4444', '#f97316', '#fbbf24', '#78716c', '#44403c', '#dc2626'];
        const newParticles: Particle[] = [];

        // Center explosion particles
        for (let i = 0; i < 65; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 8.5;
          newParticles.push({
            x: cx + (Math.random() - 0.5) * 30,
            y: cy + (Math.random() - 0.5) * 30,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.2,
            alpha: 1,
            decay: 0.02 + Math.random() * 0.03,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 2.5 + Math.random() * 5,
            gravity: 0.22,
            shape: Math.random() > 0.5 ? 'spark' : 'circle',
          });
        }

        // Smoke particles floating up
        for (let i = 0; i < 25; i++) {
          newParticles.push({
            x: cx + (Math.random() - 0.5) * 60,
            y: cy + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: -1.5 - Math.random() * 3,
            alpha: 0.7,
            decay: 0.015,
            color: 'rgba(120, 113, 108, 0.65)',
            size: 8 + Math.random() * 12,
            gravity: -0.04,
            shape: 'circle',
          });
        }

        particlesRef.current.push(...newParticles);
        startLoop();
      },

      burstFireworks: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        // 3 separate fireworks bursts
        const burstCenters = [
          { x: rect.width * 0.3, y: rect.height * 0.4 },
          { x: rect.width * 0.5, y: rect.height * 0.25 },
          { x: rect.width * 0.7, y: rect.height * 0.45 },
        ];

        const paletteSets = [
          ['#34d399', '#10b981', '#a7f3d0', '#6ee7b7', '#fef08a'], // emerald & gold
          ['#38bdf8', '#0ea5e9', '#7dd3fc', '#bae6fd', '#f43f5e'], // sky & coral
          ['#fbbf24', '#f59e0b', '#fde68a', '#ec4899', '#a855f7'], // gold & purple
        ];

        const newParticles: Particle[] = [];

        burstCenters.forEach((center, idx) => {
          const colors = paletteSets[idx % paletteSets.length];
          const count = 45;

          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 7;
            newParticles.push({
              x: center.x,
              y: center.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.8,
              alpha: 1,
              decay: 0.012 + Math.random() * 0.018,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: 2.5 + Math.random() * 4.5,
              gravity: 0.12,
              shape: Math.random() > 0.4 ? 'star' : 'spark',
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.2,
            });
          }
        });

        particlesRef.current.push(...newParticles);
        startLoop();
      }
    }));

    return (
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 z-30 h-full w-full ${className}`}
      />
    );
  }
);

ParticleCanvas.displayName = 'ParticleCanvas';
