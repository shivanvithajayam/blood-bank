
import Link from 'next/link';

export default function AdminLayout() {
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
        <h1>Welcome to the Admin Dashboard</h1>
      </main>
    </div>
  );
}