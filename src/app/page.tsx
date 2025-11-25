// app/page.tsx
'use client';

import Beams from './beams';
import './main.css';
import RotatingTextWrapper from './RotatingTextWrapper';
import Link from 'next/link';
import CardNav from './CardNav';
import CircularGallery from './CircularGallery';

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
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Login", ariaLabel: "Featured Projects", href: "/login" },
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
            
            {/* Added: Only the hexagon menu below RotatingTextWrapper */}
            <div className="hexagon-menu clear">
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-universal-access"></i>
                    </span>
                    <span className="title">Welcome</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-bullseye"></i>
                    </span>
                    <span className="title">About</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-braille"></i>
                    </span>
                    <span className="title">Services</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-id-badge"></i>
                    </span>
                    <span className="title">Resume</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-life-ring"></i>
                    </span>
                    <span className="title">Works</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-clipboard"></i>
                    </span>
                    <span className="title">Testimonials</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
              <div className="hexagon-item">
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="hex-item">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <a className="hex-content">
                  <span className="hex-content-inner">
                    <span className="icon">
                      <i className="fa fa-map-signs"></i>
                    </span>
                    <span className="title">Contact</span>
                  </span>
                  <svg
                    viewBox="0 0 173.20508075688772 200"
                    height="200"
                    width="174"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                      fill="#1e2530"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
