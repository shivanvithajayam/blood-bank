'use client';
import React from 'react';
import Image from 'next/image';
import './LogoComponent.css';

type Props = {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export default function LogoComponent({
  width = 120,
  height = 120,
  alt = 'Bloodline logo',
  className = '',
}: Props) {
  return (
    <div className={`logo-root ${className}`} aria-label="Bloodline">
      <Image src="/b-logo.webp" alt={alt} width={width} height={height} priority />
    </div>
  );
}
