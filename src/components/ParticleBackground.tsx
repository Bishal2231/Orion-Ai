'use client';

import { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

interface Bubble {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  growthRate: number;
  baseOpacity: number;
  hue: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let bubbles: Bubble[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    const initBubbles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      bubbles = Array.from({ length: count }, () => createBubble(canvas));
      
      // Randomize initial sizes so they don't all pop at once
      bubbles.forEach(b => {
        b.size = Math.random() * b.maxSize;
      });
    };

    const createBubble = (canvas: HTMLCanvasElement): Bubble => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.1, // Start small
        maxSize: Math.random() * 40 + 20, // Expand up to 20px-60px
        growthRate: Math.random() * 0.1 + 0.05, // How fast it grows
        baseOpacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() > 0.5 ? 220 : 270, // Soft blue or purple
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble, index) => {
        bubble.size += bubble.growthRate;
        
        // Opacity fades as it gets closer to maxSize
        const lifePercent = bubble.size / bubble.maxSize;
        const currentOpacity = Math.max(0, bubble.baseOpacity * (1 - lifePercent));

        if (bubble.size >= bubble.maxSize || currentOpacity <= 0) {
          bubbles[index] = createBubble(canvas);
          return;
        }

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, 0,
          bubble.x, bubble.y, bubble.size
        );
        
        gradient.addColorStop(0, `hsla(${bubble.hue}, 90%, 65%, ${currentOpacity})`);
        gradient.addColorStop(1, `hsla(${bubble.hue}, 90%, 55%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Glare highlight
        ctx.beginPath();
        ctx.arc(bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, bubble.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 1.5})`;
        ctx.fill();
        
        // Outline
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${bubble.hue}, 90%, 60%, ${currentOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
