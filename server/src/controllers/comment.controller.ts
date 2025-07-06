import { CommentService } from "../services/comment.service";
import { Request, Response } from "express";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  // Create a new comment
  public createComment = async (req: Request, res: Response): Promise<void> => {
    console.log("Creating comment with data:", req.body);
    
    try {
      const { imageId, username, content } = req.body;
      const commentData = { imageId, username, content };
      const newComment = await this.commentService.createComment(commentData);
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  };

  // Get all comments for a specific image
  public getCommentsByImageId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { imageId } = req.params;
      const comments = await this.commentService.getCommentsByImageId(imageId);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  };
}