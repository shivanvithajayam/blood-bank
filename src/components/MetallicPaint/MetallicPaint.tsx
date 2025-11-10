'use client';

import React, { useEffect, useRef } from 'react';
import './MetallicPaint.css';

type MetallicPaintProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
  colors?: string[];
  duration?: number;
  maskId?: string;
};

export default function MetallicPaint({
  width = '100%',
  height = 200,
  className,
  children,
  colors = ['#b9b9bf', '#e6e6ea', '#94949a', '#ffffff', '#8a8a90'],
  duration = 6,
  maskId,
}: MetallicPaintProps) {
  const idRef = useRef<string>(() => `metallic-${Math.random().toString(36).slice(2, 9)}`)();
  const gradientId = `${idRef}-g`;
  const clipId = maskId ?? `${idRef}-clip`;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(`--metallic-duration-${idRef}`, `${duration}s`);
  }, [duration, idRef]);

  return (
    <div
      className={`metallic-paint-root ${className ?? ''}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <svg
        className="metallic-paint-svg"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            {colors.map((c, i) => (
              <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>

          <filter id={`${idRef}-noise`} x="0" y="0" width="100%" height="100%">
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="overlay" in2="SourceGraphic" />
          </filter>

          <linearGradient id={`${idRef}-highlight`} x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <mask id={clipId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`}
          mask={`url(#${clipId})`}
          className="metallic-base"
          filter={`url(#${idRef}-noise)`}
        />

        <rect
          className="metallic-highlight"
          x="-50%"
          y="0"
          width="150%"
          height="100%"
          fill={`url(#${idRef}-highlight)`}
          style={{ animationDuration: `var(--metallic-duration-${idRef})` }}
        />
      </svg>

      <div className="metallic-content">{children}</div>
    </div>
  );
}
