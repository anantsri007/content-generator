










import React, { useEffect, useState } from 'react';
import FollowerChart from './FollowerChart';
import EngagementChart from './EngagementChart';
import BestTimeCard from './BestTimeCard';
import { fetchAnalytics } from '../api/analytics';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div>
      <FollowerChart followers={analytics.followers} />
      <EngagementChart engagement={analytics.engagement} />
      <BestTimeCard bestPostTime={analytics.bestPostTime} />
    </div>
  );
};

export default AnalyticsDashboard;
