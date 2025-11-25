import React from 'react';
import RotatingText from './RoatingText'; // adjust import path accordingly
import LogoComponent from './LogoComponent';
import './RotatingTextWrapper.css'; // Styles for layout and colors
//
const RotatingTextWrapper: React.FC = () => {
  return (
    <div className="rotating-text-wrapper-container">
      <div className="rotating-text-wrapper">
        <span className="fixed-text">BloodLine&nbsp;</span>
        <RotatingText
          texts={['saving', 'managing', 'streamlining']}
          mainClassName="rotating-text"
          staggerFrom="last"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
    </div>
  );
};

export default RotatingTextWrapper;
