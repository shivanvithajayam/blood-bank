'use client';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css'; // Import layout-specific CSS

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // 👈 ensures cookie is sent/cleared
      });

      if (res.ok) {
        // Redirect to home after successful logout
        window.location.href = "/";
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
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
              <li><Link href="\Nurse\dashboard">Dashboard</Link></li>
              <li><Link href="\Nurse\request">Request Blood</Link></li>
              <li><Link href="\Nurse\approved">Approved Requests</Link></li>
              <li><Link href="\Nurse\history">Request History</Link></li>
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
