import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
  username: { type: String, required: true }
});

likeSchema.index({ commentId: 1, username: 1 }, { unique: true });

export const Like = mongoose.model('Like', likeSchema);
