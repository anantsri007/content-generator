










// import React, { useEffect, useState } from 'react';
// import FollowerChart from './FollowerChart';
// import EngagementChart from './EngagementChart';
// import BestTimeCard from './BestTimeCard';
// import { fetchAnalytics } from '../api/analytics';

// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {
//     fetchAnalytics().then(setAnalytics);
//   }, []);

//   if (!analytics) return <div>Loading...</div>;

//   return (
//     <div>
//       <FollowerChart followers={analytics.followers} />
//       <EngagementChart engagement={analytics.engagement} />
//       <BestTimeCard bestPostTime={analytics.bestPostTime} />
//     </div>
//   );
// };

// export default AnalyticsDashboard;













import React from 'react';
import FollowerChart from './FollowerChart';
import EngagementChart from './EngagementChart';
import BestTimeCard from './BestTimeCard';

const analytics = {
  followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  engagement: [
    { post: 1, likes: 320, comments: 25 },
    { post: 2, likes: 400, comments: 40 },
    { post: 3, likes: 290, comments: 10 }
  ],
  bestPostTime: "Wednesday 7 PM"
};

const AnalyticsDashboard = () => (
  <div>
    <FollowerChart followers={analytics.followers} />
    <EngagementChart engagement={analytics.engagement} />
    <BestTimeCard bestPostTime={analytics.bestPostTime} />
  </div>
);

export default AnalyticsDashboard;

