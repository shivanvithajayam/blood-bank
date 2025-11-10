'use client';

import React from 'react';
import Image from 'next/image';
import './LogoComponent.css';

const LogoComponent: React.FC = () => {
  return (
    <div className="logo-wrapper">
      <Image
        src="/b-logo.webp"
        alt="BloodLine B Logo"
        width={180}
        height={180}
        className="b-logo"
        priority
      />
    </div>
  );
};

export default LogoComponent;
