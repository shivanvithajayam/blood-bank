'use client';

import React from 'react';
import './notifications.css';

type Notification = {
  id: number;
  message: string;
  time: string;
  date: string;
  action: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    message: 'Unit O- contaminated',
    time: '10:00 AM',
    date: 'November 11, 2025',
    action: 'View Details',
  },
  {
    id: 2,
    message: 'Unit A+ expired on 2023-10-01',
    time: '12:30 AM',
    date: 'November 11, 2025',
    action: 'Review Expiry',
  },
  {
    id: 3,
    message: 'Low stock for AB-',
    time: '8:10 AM',
    date: 'November 11, 2025',
    action: 'Restock',
  },
  {
    id: 4,
    message: 'Emergency request from City Hospital',
    time: '5:11 AM',
    date: 'November 11, 2025',
    action: 'Respond',
  },
];

export default function Notifications() {
  return (
    <div className="timeline-container">
      <h1>All Notifications</h1>
      <div className="timeline">
        {notifications.map((note) => (
          <div key={note.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="notification-box">
                <p className="message">{note.message}</p>
                <div className="meta">
                  <span className="time">{note.time}</span>
                  <span className="date">{note.date}</span>
                </div>
                <button className="action-button">{note.action}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more">Load more</button>
    </div>
  );
}