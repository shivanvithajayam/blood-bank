'use client';

import React, { useEffect, useState } from 'react';
import './notifications.css';
import { createClient } from '@supabase/supabase-js';

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
  created_at: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5); // ✅ default 5

  // 1️⃣ Fetch notifications with limit
  const fetchNotifications = async (newLimit: number) => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(newLimit);

    if (!error) {
      setNotifications(data || []);
    } else {
      console.error('Fetch error:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications(limit);
  }, [limit]);

  // 2️⃣ Realtime inserts
  useEffect(() => {
    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications((prev) => {
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

  // 3️⃣ Delete notification
  const markAsRead = async (sno: number) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('sno', sno);

    if (error) {
      console.error('Delete error:', error);
    } else {
      setNotifications((prev) => prev.filter((n) => n.sno !== sno));
    }
  };

  // 4️⃣ Load more (increase limit by 5)
  const loadMore = () => {
    setLimit((prev) => prev + 5);
  };

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
                <p className="message">{note.heading}</p>
                <p className="body-text">{note.body}</p>

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

                <button
                  className="action-button"
                  onClick={() => markAsRead(note.sno)}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="load-more" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
}