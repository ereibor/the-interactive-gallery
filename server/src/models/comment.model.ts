import mongoose from "mongoose";

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  imageId: { type: String, required: true },
  username: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model('Comment', commentSchema);
