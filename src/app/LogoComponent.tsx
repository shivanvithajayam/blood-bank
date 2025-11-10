'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import './LogoComponent.css';

const LogoComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create flowing metallic effect
      for (let i = 0; i < 3; i++) {
        const hue = (time * 30 + i * 120) % 360;
        const saturation = 70 + Math.sin(time * 0.5 + i) * 20;
        const lightness = 40 + Math.sin(time * 0.3 + i) * 15;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.globalAlpha = 0.15 - i * 0.04;

        // Create wavy distortion pattern
        ctx.beginPath();
        for (let x = 0; x < width; x += 5) {
          const y = height / 2 + Math.sin(x * 0.01 + time) * 20 + Math.cos(time * 0.5 + i) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      // Add metallic shine effect
      const shineGradient = ctx.createLinearGradient(0, 0, width, height);
      const shineHue = (time * 40) % 360;
      shineGradient.addColorStop(0, `hsla(${shineHue}, 100%, 60%, 0)`);
      shineGradient.addColorStop(0.5, `hsla(${shineHue}, 100%, 70%, 0.2)`);
      shineGradient.addColorStop(1, `hsla(${shineHue}, 100%, 60%, 0)`);

      ctx.fillStyle = shineGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="logo-wrapper">
      <div className="logo-container">
        <Image
          src="/b-logo.webp"
          alt="BloodLine B Logo"
          width={180}
          height={180}
          className="b-logo"
          priority
        />
        <canvas
          ref={canvasRef}
          className="metallic-paint-overlay"
          width={180}
          height={180}
        ></canvas>
      </div>
    </div>
  );
};

export default LogoComponent;
