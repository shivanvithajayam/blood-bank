'use client';

import Beams from './beams';
import './globals.css';
import RotatingTextWrapper from './RotatingTextWrapper';
import CardSwap, { Card } from './CardSwap';
import Link from 'next/link';
//import MetallicPaintLogo from './MetallicPaintLogo'; // Assuming you have this component
//<MetallicPaintLogo /> can be added above RotatingTextWrapper.
export default function HomePage() {
  return (
    <body>
      <main className="bg-[#e6eaf0] min-h-screen">
        <div className="page-root">
          {/* Section 1: 100vh - Logo and Rotating Text with Beams Background */}
          <section className="section-1">
            <div className="background-div">
              <Beams
                beamWidth={3}
                beamHeight={30}
                beamNumber={9}
                lightColor="#F00F0F"
                speed={2}
                noiseIntensity={8}
                scale={0.2}
                rotation={30}
              />
            </div>
            <div className="logo-and-text">
              
              <RotatingTextWrapper />
            </div>
          </section>

          {/* Section 2: 100vh - Login Text/Button beside CardSwap */}
          <section className="section-2">
            <div className="login-section">
              <p className="overlay-text">Welcome to the BloodLine.<br/>Please log in to continue.</p>
              <div className="button-row">
                <Link href="/login">
                  <button className="your-button-class">Login</button>
                </Link>
              </div>
            </div>
            <div className="stacks-section">
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
                skewAmount={5}
              >
                <Card>
                  <h3>About Us</h3>
                  <p><strong>Bloodline</strong> is a dedicated web platform committed to revolutionizing how blood banks manage their most critical resource. We believe that <em>saving lives</em> starts with <em>smart, reliable management</em>. Our system was developed to replace outdated, manual processes with a streamlined digital solution that ensures every unit of blood is accurately tracked, readily available, and safely delivered when and where it's needed most. We are the digital pipeline for life.</p>
                </Card>
                <Card>
                  <h3>Our Services</h3>
                  <p>Your content here</p>
                </Card>
                <Card>
                  <h3>Stacks Used</h3>
                  <p>Your content here</p>
                </Card>
              </CardSwap>
            </div>
          </section>

          {/* Section 3: 50vh - Contact Us */}
          <section className="section-3">
            <div className="contact-section">
              <h2>Contact Us</h2>
              <p>Get in touch with us for more information.</p>
              {/* Add contact form or details here */}
            </div>
          </section>
        </div>
      </main>
    </body>
  );
}