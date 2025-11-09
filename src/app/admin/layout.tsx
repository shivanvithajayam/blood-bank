import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-container">
      {/* Side Navigation */}
      <nav className="side-nav">
        <h3>Admin Panel</h3>
        <ul>
          <li><Link href="/admin/dashboard">Dashboard</Link></li>
          <li><Link href="/admin/requests">Requests</Link></li>
          <li><Link href="/admin/notifications">Notifications</Link></li>
        </ul>
      </nav>
      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}