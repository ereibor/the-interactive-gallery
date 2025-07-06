import { Comment } from "../models/comment.model";

export class CommentRepository {
  // Create a new comment
  async createComment(commentData: { imageId: string; username?: string; content: string }) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  // Get all comments for a specific image
  async getCommentsByImageId(imageId: string) {
    return await Comment.find({ imageId }).sort({ createdAt: -1 });
  }

  
}