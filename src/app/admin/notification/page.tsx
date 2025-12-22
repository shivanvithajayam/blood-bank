'use client';

import React, { useEffect, useState } from 'react';
import './notifications.css';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase client (frontend-safe)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Notification = {
  sno: number;
  heading: string;
  body: string;
  date: string;
  time: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch existing notifications on page load
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setNotifications(data || []);
      } else {
        console.error('Fetch error:', error);
      }

      setLoading(false);
    };

    fetchNotifications();
  }, []);

  // 2️⃣ REALTIME notifications (trigger inserts)
  useEffect(() => {
    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prev) => {
            // prevent duplicates
            if (prev.some((n) => n.sno === payload.new.sno)) return prev;
            return [payload.new as Notification, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <p style={{ color: 'white' }}>Loading notifications...</p>;
  }

  return (
    <div className="timeline-container">
      <h1>All Notifications</h1>

      <div className="timeline">
        {notifications.map((note) => (
          <div key={note.sno} className="timeline-item">
            <div className="timeline-dot" />

            <div className="timeline-content">
              <div className="notification-box">
                {/* 🔔 Heading */}
                <p className="message">{note.heading}</p>

                {/* 📝 Body */}
                <p className="body-text">{note.body}</p>

                {/* 🕒 Time & Date */}
                <div className="meta">
                  <span className="time">
                    {new Date(`1970-01-01T${note.time}`).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  <span className="date">
                    {new Date(note.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <button className="action-button">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="load-more">Load more</button>
    </div>
  );
}
