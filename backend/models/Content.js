// import mongoose from 'mongoose';

// const contentSchema = new mongoose.Schema({
//   topic: String,
//   niche: String,
//   reelIdea: String,
//   caption: String,
//   hashtags: [String],
//   hook: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Content = mongoose.model('Content', contentSchema);

// export default Content;





import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  niche: { type: String, required: true },
  reelIdea: { type: String, required: true },
  caption: { type: String, required: true },
  hashtags: { type: [String], default: [] },
  hook: { type: String, required: true },
  // Optional: associate content with a user for analytics
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Optional: track how many times this content was viewed or exported
  views: { type: Number, default: 0 },
  exports: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
