'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import BlurText from './BlurText';
const Dashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sample data for blood types
  const bloodData = [
    { type: 'A+', available: 45 },
    { type: 'A-', available: 30 },
    { type: 'B+', available: 50 },
    { type: 'B-', available: 25 },
    { type: 'AB+', available: 20 },
    { type: 'AB-', available: 15 },
    { type: 'O+', available: 60 },
    { type: 'O-', available: 35 },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  const handleAnimationComplete = () => {
    console.log('Animation complete');
  };

  return (
    <div className="dashboard">
      <BlurText
        text="Welcome to the Nurse Dashboard!"
        delay={150}
        animateBy="letters"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
      />
      <div className="content">
        <div className="charts">
          {bloodData.map((data, index) => (
            <div
              key={index}
              className="chart-container spotlight-card"
              onMouseMove={handleMouseMove}
            >
              <h3>{data.type}</h3>
              <div className="chart-3d-wrapper">
                <PieChart width={100} height={100}>
                  <Pie
                    data={[
                      { name: 'Available', value: data.available },
                      { name: 'Unavailable', value: 100 - data.available },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={40}
                    dataKey="value"
                  >
                    <Cell fill="#f00f0f" />
                    <Cell fill="#0ff080" />
                  </Pie>
                </PieChart>
              </div>
              <div className="amount-tooltip">{data.available} units</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;