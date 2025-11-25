'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css'; // Import dashboard-specific CSS
// Ensure type declarations for CSS modules are available
import BlurText from './BlurText';
import Beams from '../../beams';
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
      <div className="background-div" style={{ width: '100%', height: '600px' }}>
        

      </div>
      <div className="heading">
      <BlurText
        text="   Welcome to the Admin Dashboard!"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
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
                    { name: 'Unavailable', value: 100 - data.available },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="value"
                  animationDuration={3000}
                >
                  <Cell fill="#0ff080" />
                  <Cell fill="#f00f0f" />
                </Pie>
              </PieChart>
              <div className="amount-tooltip">{data.available} units</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;