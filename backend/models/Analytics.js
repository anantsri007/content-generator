import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  followers: [Number],
  engagement: [
    {
      post: Number,
      likes: Number,
      comments: Number
    }
  ],
  bestPostTime: String
});

export default mongoose.model('Analytics', analyticsSchema);





