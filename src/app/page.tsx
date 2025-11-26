// app/page.tsx
'use client';

import Beams from './beams';
import './main.css';
import RotatingTextWrapper from './RotatingTextWrapper';
import CardNav from './CardNav';
import CircularGallery from './CircularGallery';
import HexagonMenu from './hex';
export default function HomePage() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "BloodLine", ariaLabel: "About Us", href: "#about_us" },
      ],
    },
    {
      label: "Login",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Login", ariaLabel: "Login", href: "/login" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Contact", ariaLabel: "Contact us", href: "#contacts" }, // match section id
      ],
    },
  ];

  return (
    <main className="main-root">
      <div className="page-root">
        <CardNav
          logo="/b-logo.webp"   // ✅ simplified path
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />

        {/* Section 1 */}
        <section className="section-1a">
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
            
            {/* Added: Only the hexagon menu below RotatingTextWrapper */}
            </div>
            
        </section>
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
        <section id="1b"className="hexagon-menu">

          <HexagonMenu />
        </section>
        {/* Section 2 */}
        <section id="about_us" className="section-2">
          <div className="rotate">
            <div style={{ height: '100vh', position: 'relative' }}>
              <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="contacts" className="section-3">
          <h2 className="contact-heading">Contact Us</h2>
          <div className="contact-row">
            <div className="contact-box">
              <h3>📍 Address</h3>
              <p>BMS HOSPITALS, Basavanagudi, Bangalore, Karnataka, India</p>
            </div>
            <div className="contact-box">
              <h3>📞 Phone</h3>
              <p>+91 XXXXXXXX</p>
            </div>
            <div className="contact-box">
              <h3>📧 Email</h3>
              <p>xxxxxxx@XXX.com</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
