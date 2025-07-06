import { LikeService } from "../services/like.service";
import { Request, Response } from "express";

export class LikeController {
  private likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  // Create a new like
  public createLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageId, username } = req.body;

      if (!imageId || !username) {
        res.status(400).json({ error: "imageId and username are required" });
        return;
      }

      const newLike = await this.likeService.createLike({ imageId, username });
      res.status(201).json(newLike);
    } catch (error: any) {
      // Handle duplicate like error (unique constraint violation)

      if (error.code === 11000) {
        res
          .status(409)
          .json({ error: "You have already liked this image backend" });
      } else {
        console.error("Error creating like:", error);
        res.status(500).json({ error: "Failed to create like" });
      }
    }
  };

  // Get likes for a specific image
  public getLikesByImageId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { imageId } = req.params;
      const likes = await this.likeService.getLikesByImageId(imageId);
      res.status(200).json(likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  };

  // Get like count for a specific image
  public getLikeCountByImageId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { imageId } = req.params;
      const count = await this.likeService.getLikeCountByImageId(imageId);
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching like count:", error);
      res.status(500).json({ error: "Failed to fetch like count" });
    }
  };

  // Check if a user has liked a specific image
  public hasUserLikedImage = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { imageId, username } = req.params;
      const hasLiked = await this.likeService.hasUserLikedImage(
        imageId,
        username
      );
      res.status(200).json({ exists: !!hasLiked });
    } catch (error) {
      console.error("Error checking user like:", error);
      res.status(500).json({ error: "Failed to check like status" });
    }
  };

  // Delete a like (unlike)
  public deleteLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageId, username } = req.params;
      const deletedLike = await this.likeService.deleteLike(imageId, username);

      if (!deletedLike) {
        res.status(404).json({ error: "Like not found" });
        return;
      }

      res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
      console.error("Error deleting like:", error);
      res.status(500).json({ error: "Failed to delete like" });
    }
  };

}
