'use client';

import React, { useEffect, useRef } from 'react';
import './MetallicPaintLogo.css';

const MetallicPaintLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const width = canvas.width;
    const height = canvas.height;

    const drawGrayLogo = (paintColor: string) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = paintColor;

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = 0.8;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);

      // Draw gray "B" shape (stylized number 3 shape)
      const x = centerX - 40;
      const y = centerY - 50;

      // Left vertical bar
      ctx.fillRect(x, y, 20, 100);

      // Top right curves
      ctx.beginPath();
      ctx.ellipse(x + 40, y + 25, 35, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bottom right curves
      ctx.beginPath();
      ctx.ellipse(x + 45, y + 75, 40, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner white cutout (remove by not drawing it - using composite)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,1)';

      // Top inner circle
      ctx.beginPath();
      ctx.ellipse(x + 45, y + 28, 20, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bottom inner circle
      ctx.beginPath();
      ctx.ellipse(x + 50, y + 75, 23, 17, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
    };

    const animate = () => {
      time += 0.01;

      // Create moving metallic paint color
      const hue = (time * 50) % 360;
      const paintColor = `hsl(${hue}, 80%, 50%)`;

      drawGrayLogo(paintColor);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="metallic-paint-logo-container" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="metallic-paint-canvas"
        width={250}
        height={250}
      ></canvas>
    </div>
  );
};

export default MetallicPaintLogo;
