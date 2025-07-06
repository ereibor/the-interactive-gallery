import { Like } from "../models/like.model";

export class LikeRepository {
  // Create a new like
  async createLike(likeData: { imageId: string; username: string }) {
    const like = new Like(likeData);
    return await like.save();
  }

  // Get likes for a specific image
  async getLikesByImageId(imageId: string) {
    return await Like.find({ imageId });
  }

  // Get like count for a specific image
  async getLikeCountByImageId(imageId: string) {
    return await Like.countDocuments({ imageId });
  }

  // Check if a user has liked a specific image
  async hasUserLikedImage(imageId: string, username: string) {
    return await Like.exists({ imageId, username });
  }

  // Delete a like (unlike)
  async deleteLike(imageId: string, username: string) {
    return await Like.findOneAndDelete({ imageId, username });
  }

 
}