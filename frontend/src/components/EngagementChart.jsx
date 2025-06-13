import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EngagementChart = ({ engagement }) => {
  // Calculate engagement rate for each post
  const data = engagement.map((post) => ({
    post: `Post ${post.post}`,
    likes: post.likes,
    comments: post.comments,
    engagement: post.likes + post.comments,
  }));

  return (
    <div>
      <h3>Engagement Rate (Recent Posts)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="post" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
          <Bar dataKey="likes" fill="#8884d8" name="Likes" />
          <Bar dataKey="comments" fill="#ffc658" name="Comments" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
