import { Like } from "../models/like.model";

export class LikeRepository {
  // Create a new like
  async createLike(likeData: { commentId: string; username: string }) {
    const like = new Like(likeData);
    return await like.save();
  }

  // Get likes for a specific comment
  async getLikesByCommentId(commentId: string) {
    return await Like.find({ commentId });
  }

  // Get like count for a specific comment
  async getLikeCountByCommentId(commentId: string) {
    return await Like.countDocuments({ commentId });
  }

  // Check if a user has liked a specific comment
  async hasUserLikedComment(commentId: string, username: string) {
    return await Like.exists({ commentId, username });
  }

  // Delete a like (unlike)
  async deleteLike(commentId: string, username: string) {
    return await Like.findOneAndDelete({ commentId, username });
  }

  // Get all likes by a specific user
  async getLikesByUsername(username: string) {
    return await Like.find({ username }).populate('commentId');
  }
}