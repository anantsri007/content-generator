
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiRoutes from './routes/openaiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route for AI content generation
app.use('/api/generate-content', openaiRoutes);

// Route for analytics (including export)
app.use('/api/analytics', analyticsRoutes);

// Optional: Health check or root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;





