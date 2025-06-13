





// import express from 'express';
// import { Parser } from 'json2csv';
// import Content from '../models/Content.js';

// const router = express.Router();

// // Export analytics as CSV
// router.get('/export', async (req, res) => {
//   try {
//     const ideas = await Content.find({});
//     const parser = new Parser();
//     const csv = parser.parse(ideas.map(i => ({
//       topic: i.topic,
//       niche: i.niche,
//       reelIdea: i.reelIdea,
//       caption: i.caption,
//       hook: i.hook,
//       hashtags: i.hashtags.join(', '),
//       createdAt: i.createdAt
//     })));
//     res.header('Content-Type', 'text/csv');
//     res.attachment('content-bank.csv');
//     res.send(csv);
//   } catch (err) {
//     res.status(500).send('Error exporting analytics');
//   }
// });

// export default router;






import express from 'express';
import { Parser } from 'json2csv';
import Content from '../models/Content.js';

const router = express.Router();

// Simulated analytics data route
router.get('/', (req, res) => {
  const analyticsData = {
    followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
    engagement: [
      { post: 1, likes: 320, comments: 25 },
      { post: 2, likes: 400, comments: 40 },
      { post: 3, likes: 290, comments: 10 }
    ],
    bestPostTime: "Wednesday 7 PM"
  };
  res.json(analyticsData);
});

// Export analytics as CSV
router.get('/export', async (req, res) => {
  try {
    const ideas = await Content.find({});
    const parser = new Parser();
    const csv = parser.parse(ideas.map(i => ({
      topic: i.topic,
      niche: i.niche,
      reelIdea: i.reelIdea,
      caption: i.caption,
      hook: i.hook,
      hashtags: i.hashtags.join(', '),
      createdAt: i.createdAt
    })));
    res.header('Content-Type', 'text/csv');
    res.attachment('content-bank.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).send('Error exporting analytics');
  }
});

export default router;

