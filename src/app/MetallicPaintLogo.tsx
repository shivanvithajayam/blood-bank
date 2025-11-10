'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import './MetallicPaintLogo.css';

const MetallicPaintLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = containerRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Create gradient that moves
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const hue = (time * 50) % 360;
      
      gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
      gradient.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${(hue + 120) % 360}, 100%, 50%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="metallic-paint-logo-container" ref={containerRef}>
      <div className="metallic-paint-overlay">
        <Image
          src="/logo.webp"
          alt="BloodLine Logo"
          width={200}
          height={200}
          className="logo-image"
          priority
        />
      </div>
      <canvas className="metallic-paint-canvas" width={250} height={250}></canvas>
    </div>
  );
};

export default MetallicPaintLogo;
