'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { createClient } from '@supabase/supabase-js';
import './Dashboard.css';
import BlurText from './BlurText';

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type BloodData = {
  type: string;
  available: number;
};

const Dashboard: React.FC = () => {
  const [bloodData, setBloodData] = useState<BloodData[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch inventory data
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('blood_inventories')
      .select('blood_type, numofpints');

    if (error) {
      console.error('Error fetching blood inventories:', error);
      return;
    }

    // Aggregate by blood type
    const aggregated: Record<string, number> = {};
    data.forEach((row) => {
      aggregated[row.blood_type] =
        (aggregated[row.blood_type] || 0) + row.numofpints;
    });

    setBloodData(
      Object.entries(aggregated).map(([type, available]) => ({
        type,
        available,
      }))
    );

    setLoading(false);
  };

  // 🧠 useEffect = initial fetch + realtime updates
  useEffect(() => {
    // Initial load
    fetchData();

    // 🔴 Realtime listener
    const channel = supabase
      .channel('blood-inventory-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blood_inventories' },
        () => {
          console.log('🔄 Inventory changed → refreshing dashboard');
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <p style={{ color: 'white' }}>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <div className="heading">
        <BlurText
          text="Welcome to the Admin Dashboard!"
          delay={150}
          animateBy="words"
          direction="top"
        />
      </div>

      <div className="charts">
        {bloodData.map((data, index) => (
          <div key={index} className="chart-container spotlight-card">
            <h3>{data.type}</h3>

            <PieChart width={150} height={150}>
              <Pie
                data={[
                  { name: 'Available', value: data.available },
                  {
                    name: 'Remaining',
                    value: Math.max(0, 200 - data.available),
                  },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                dataKey="value"
              >
                <Cell fill="#0ff080" />
                <Cell fill="#f00f0f" />
              </Pie>
            </PieChart>

            <div className="amount-tooltip">
              {data.available} / 200 units
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
