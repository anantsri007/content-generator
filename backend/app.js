
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import openaiRoutes from './routes/openaiRoutes.js';
// import analyticsRoutes from './routes/analyticsRoutes.js';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Route for AI content generation
// app.use('/api/generate-content', openaiRoutes);

// // Route for analytics (including export)
// app.use('/api/analytics', analyticsRoutes);

// // Optional: Health check or root endpoint
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// export default app;














import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiRoutes from './routes/openaiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();

// CORS options: sirf frontend origin allow ho
const corsOptions = {
  origin: 'https://content-generator-411.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // agar cookies/auth use ho rahi hai
};

app.use(cors(corsOptions));
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




