'use client';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { createClient } from '@supabase/supabase-js';
import './dashboard.css'; // Import dashboard-specific CSS
import BlurText from './BlurText';


// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Dashboard: React.FC = () => {
  const [bloodData, setBloodData] = useState<any[]>([]);

  // Fetch and aggregate data from Supabase
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('blood_inventories')
      .select('blood_type, numofpints');

    if (error) {
      console.error('Error fetching blood inventories:', error);
    } else {
      // Aggregate by blood_type
      const aggregated: Record<string, number> = {};
      data.forEach((row: any) => {
        if (!aggregated[row.blood_type]) {
          aggregated[row.blood_type] = 0;
        }
        aggregated[row.blood_type] += row.numofpints;
      });

      // Convert to array for charts
      setBloodData(
        Object.entries(aggregated).map(([type, available]) => ({
          type,
          available,
        }))
      );
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <div className="dashboard">
      <div className="background-div" style={{ width: '100%', height: '600px' }}>
      </div>

      <div className="heading">
        <BlurText
          text="Welcome to the Nurse Dashboard!"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => console.log('Animation complete')}
        />
      </div>

      <div className="content">
        <div className="charts">
          {bloodData.map((data, index) => (
            <div
              key={index}
              className="chart-container spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <h3>{data.type}</h3>
              <PieChart width={150} height={150}>
                <Pie
                  data={[
                    { name: 'Available', value: data.available },
                    { name: 'Remaining Capacity', value: Math.max(0, 200 - data.available) },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="value"
                  animationDuration={3000}
                >
                  <Cell fill="#0ff080" /> {/* Available */}
                  <Cell fill="#f00f0f" /> {/* Remaining */}
                </Pie>
              </PieChart>
              <div className="amount-tooltip">{data.available} / 200 units</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;