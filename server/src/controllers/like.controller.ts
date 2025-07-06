import { LikeService } from "../services/like.service";
import { Request, Response } from "express";

export class LikeController {
  private likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  // Create a new like
  public createLike = async (req: Request, res: Response): Promise<void> => {
    console.log("Creating like with data:", req.body);
    
    try {
      const { commentId, username } = req.body;
      
      if (!commentId || !username) {
        res.status(400).json({ error: "commentId and username are required" });
        return;
      }

      const newLike = await this.likeService.createLike({ commentId, username });
      res.status(201).json(newLike);
    } catch (error: any) {
      // Handle duplicate like error (unique constraint violation)
      
      if (error.code === 11000) {
        res.status(409).json({ error: "You have already liked this comment" });
      } else {
        console.error("Error creating like:", error);
        res.status(500).json({ error: "Failed to create like" });
      }
    }
  };

  // Get likes for a specific comment
  public getLikesByCommentId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { commentId } = req.params;
      const likes = await this.likeService.getLikesByCommentId(commentId);
      res.status(200).json(likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  };

  // Get like count for a specific comment
  public getLikeCountByCommentId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { commentId } = req.params;
      const count = await this.likeService.getLikeCountByCommentId(commentId);
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching like count:", error);
      res.status(500).json({ error: "Failed to fetch like count" });
    }
  };

  // Check if a user has liked a specific comment
  public hasUserLikedComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { commentId, username } = req.params;
      const hasLiked = await this.likeService.hasUserLikedComment(commentId, username);
      res.status(200).json({ exists: !!hasLiked });
    } catch (error) {
      console.error("Error checking user like:", error);
      res.status(500).json({ error: "Failed to check like status" });
    }
  };

  // Delete a like (unlike)
  public deleteLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const { commentId, username } = req.params;
      const deletedLike = await this.likeService.deleteLike(commentId, username);
      
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

  // Get all likes by a specific user
  public getLikesByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const likes = await this.likeService.getLikesByUsername(username);
      res.status(200).json(likes);
    } catch (error) {
      console.error("Error fetching user likes:", error);
      res.status(500).json({ error: "Failed to fetch user likes" });
    }
  };
}