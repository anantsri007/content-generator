import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FollowerChart = ({ followers }) => {
  // Prepare data for the chart
  const data = followers.map((count, idx) => ({
    day: `Day ${idx + 1}`,
    followers: count,
  }));

  return (
    <div>
      <h3>Follower Growth (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="followers" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FollowerChart;
