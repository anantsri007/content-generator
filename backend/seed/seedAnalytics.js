import mongoose from 'mongoose';
import Analytics from '../models/Analytics.js';
import data from './analyticsSeed.json' assert { type: 'json' };

mongoose.connect(process.env.MONGODB_URI);

async function seed() {
  await Analytics.deleteMany({});
  await Analytics.create(data);
  console.log('Analytics data seeded!');
  mongoose.disconnect();
}

seed();
