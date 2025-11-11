'use client';
import Link from 'next/link';
import './global.css'; // Import layout-specific CSS
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogout = () => {
    // Placeholder logout logic (e.g., clear tokens, redirect)
    alert('Logged out!');
    window.location.href = '/'; // Redirect to home/login page
  };

  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {/* Persistent Side Navigation */}
          <nav className="side-nav">
            <div className="side-nav-logo">
                          <Image
                            src="/b-logo.webp"
                            alt="BloodLine Logo"
                            width={80}
                            height={80}
                            priority
                          />
            </div> 
            <ul>
              <li><Link href="\admin\dashboard">Dashboard</Link></li>
              <li><Link href="\admin\request">Blood Requests</Link></li>
              <li><Link href="\admin\notification">Notifications</Link></li>
              
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
          </nav>
          {/* Page Content */}
          <main className="page-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}