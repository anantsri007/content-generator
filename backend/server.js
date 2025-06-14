// import app from './app.js';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });




import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// IMPORTANT: Listen on '0.0.0.0' for public access
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

