import Link from 'next/link';
import './globals.css'; // Import your CSS

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {/* Persistent Side Navigation */}
          <nav className="side-nav">
            <ul>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/request">Request Blood</Link></li>
              <li><Link href="/approved">Approved Requests</Link></li>
              <li><Link href="/history">Request History</Link></li>
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