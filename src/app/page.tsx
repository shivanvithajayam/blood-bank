'use client';

import Beams from './beams';
import './globals.css';
import RotatingTextWrapper from './RotatingTextWrapper';
import CardSwap, { Card } from './CardSwap';
import Link from 'next/link';
export default function HomePage() {
  return (
      <main className="main-root">
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
                width={500}
                height={300}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                skewAmount={5}
              >
                <Card>
                  <h3>About Us</h3>
                  <p><strong>Bloodline</strong> is a dedicated web platform committed to revolutionizing how<br/> blood banks manage their most critical resource. We believe that <em>saving lives</em> starts with <em>smart, reliable management</em>. Our system was developed to replace outdated, manual processes with a streamlined digital solution that ensures<br/> every unit of blood is accurately tracked, readily available, and safely<br/> delivered when and where it's needed most. We are the<br/> digital pipeline for life.</p>
                </Card>
                <Card>
                  <h3>Our Services</h3>
                  <p>Bloodline provides a suite of essential services designed to bring efficiency <br/>and integrity to the blood management lifecycle:
                  <br/>
                  <strong>Real-Time Inventory Tracking:</strong> 
                  We offer immediate, accurate visibility into blood stock levels, including blood type and expiration dates. This allows<br/> bank staff to make <em>data-driven decisions</em> and prevent critical shortages.</p>
                </Card>
                <Card>
                  <h3>Our Vission:A Future of zero waste</h3>
                  <p>Our long-term vision for Bloodline is to create a national or global network<br/> where <em>no life is lost due to blood scarcity or supply chain failure</em>.</p>
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
  );
}
