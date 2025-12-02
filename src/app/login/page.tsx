'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion'; // Import Framer Motion
import './login.css'; // Import the CSS file

const LoginForm: React.FC = () => {
  const pathControls = useAnimation();
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const emailInput = document.querySelector('#email') as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const submitInput = document.querySelector('#submit') as HTMLInputElement;

    const handleEmailFocus = () => {
      pathControls.start({
        strokeDashoffset: 0,
        strokeDasharray: '240 1386',
        transition: { duration: 0.7, ease: 'easeOut' }
      });
    };

    const handlePasswordFocus = () => {
      pathControls.start({
        strokeDashoffset: -336,
        strokeDasharray: '240 1386',
        transition: { duration: 0.7, ease: 'easeOut' }
      });
    };

    const handleSubmitFocus = () => {
      pathControls.start({
        strokeDashoffset: -730,
        strokeDasharray: '530 1386',
        transition: { duration: 0.7, ease: 'easeOut' }
      });
    };

    if (emailInput) emailInput.addEventListener('focus', handleEmailFocus);
    if (passwordInput) passwordInput.addEventListener('focus', handlePasswordFocus);
    if (submitInput) submitInput.addEventListener('focus', handleSubmitFocus);

    // Cleanup
    return () => {
      if (emailInput) emailInput.removeEventListener('focus', handleEmailFocus);
      if (passwordInput) passwordInput.removeEventListener('focus', handlePasswordFocus);
      if (submitInput) submitInput.removeEventListener('focus', handleSubmitFocus);
    };
  }, [pathControls]);

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">Welcome Nurse/Admin. Please login in to accses data.</div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse">
                <stop
                  style={{ stopColor: '#0f0ff0' }}
                  offset="0"
                  id="stop876" />
                <stop
                  style={{ stopColor: '#ff0000' }}
                  offset="1"
                  id="stop878" />
              </linearGradient>
            </defs>
            <motion.path
              ref={pathRef}
              d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
              fill="none"
              stroke="url(#linearGradient)"
              strokeWidth="4"
              strokeDasharray="240 1386"
              strokeDashoffset="0"
              animate={pathControls}
              initial={{ strokeDashoffset: 0, strokeDasharray: '240 1386' }}
            />
          </svg>
          <div className="form">
            <label htmlFor="email">User Type</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <input type="submit" id="submit" value="Submit" />
          </div>
        </div>
      </div>
      </div>
  );
};

export default LoginForm;
