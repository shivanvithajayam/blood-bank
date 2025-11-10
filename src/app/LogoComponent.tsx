'use client';

import React from 'react';
import Image from 'next/image';
import MetallicPaint from '@/components/MetallicPaint';
import './LogoComponent.css';

const LogoComponent: React.FC = () => {
  return (
    <div className="logo-wrapper">
      <MetallicPaint
        width={200}
        height={200}
        duration={6}
        colors={['#c0c0c0', '#e8e8e8', '#a8a8a8', '#ffffff', '#888888']}
      >
        <Image
          src="/b-logo.webp"
          alt="BloodLine B Logo"
          width={180}
          height={180}
          className="b-logo"
          priority
        />
      </MetallicPaint>
    </div>
  );
};

export default LogoComponent;
