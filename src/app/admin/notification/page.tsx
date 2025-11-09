import { lazy, Suspense } from 'react';

// Sample notifications
const notifications = [
  { id: 1, type: 'contamination', message: 'Unit O- contaminated' },
  { id: 2, type: 'expiry', message: 'Unit A+ expired on 2023-10-01' },
  { id: 3, type: 'low_stock', message: 'Low stock for AB-' },
  { id: 4, type: 'emergency', message: 'Emergency request from City Hospital' },
];

export default function Notifications() {
  return (
    <Suspense fallback={<div>Loading Notifications...</div>}>
      <div>
        <h1>Notifications</h1>
        <ul className="notifications-list">
          {notifications.map((note) => (
            <li key={note.id} className={`notification ${note.type}`}>
              {note.message}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}