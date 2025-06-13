import fs from 'fs';
import path from 'path';

export const getAnalytics = async (req, res) => {
  try {
    const filePath = path.resolve('seed', 'analyticsSeed.json');
    const data = fs.readFileSync(filePath);
    const analytics = JSON.parse(data);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load analytics data' });
  }
};
