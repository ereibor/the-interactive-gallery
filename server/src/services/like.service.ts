import { LikeRepository } from "../repositories/like.repository";

export class LikeService {
  private likeRepository: LikeRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
  }

  // Create a new like
  async createLike(likeData: { commentId: string; username: string }) {
    return await this.likeRepository.createLike(likeData);
  }

  // Get likes for a specific comment
  async getLikesByCommentId(commentId: string) {
    return await this.likeRepository.getLikesByCommentId(commentId);
  }

  // Get like count for a specific comment
  async getLikeCountByCommentId(commentId: string) {
    return await this.likeRepository.getLikeCountByCommentId(commentId);
  }

  // Check if a user has liked a specific comment
  async hasUserLikedComment(commentId: string, username: string) {
    return await this.likeRepository.hasUserLikedComment(commentId, username);
  }

  // Delete a like (unlike)
  async deleteLike(commentId: string, username: string) {
    return await this.likeRepository.deleteLike(commentId, username);
  }

  // Get all likes by a specific user
  async getLikesByUsername(username: string) {
    return await this.likeRepository.getLikesByUsername(username);
  }
}