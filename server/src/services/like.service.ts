import { LikeRepository } from "../repositories/like.repository";

export class LikeService {
  private likeRepository: LikeRepository;

  constructor() {
    this.likeRepository = new LikeRepository();
  }

  // Create a new like
  async createLike(likeData: { imageId: string; username: string }) {
    return await this.likeRepository.createLike(likeData);
  }

  // Get likes for a specific image
  async getLikesByImageId(imageId: string) {
    return await this.likeRepository.getLikesByImageId(imageId);
  }

  // Get like count for a specific image
  async getLikeCountByImageId(imageId: string) {
    return await this.likeRepository.getLikeCountByImageId(imageId);
  }

  // Check if a user has liked a specific image
  async hasUserLikedImage(imageId: string, username: string) {
    return await this.likeRepository.hasUserLikedImage(imageId, username);
  }

  // Delete a like (unlike)
  async deleteLike(imageId: string, username: string) {
    return await this.likeRepository.deleteLike(imageId, username);
  }
}
