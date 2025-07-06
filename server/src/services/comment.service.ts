import { CommentRepository } from "../repositories/comment.respository";


export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  // Create a new comment
  async createComment(commentData: { imageId: string; username?: string; content: string }) {
    return await this.commentRepository.createComment(commentData);
  }

  // Get all comments for a specific image
  async getCommentsByImageId(imageId: string) {
    return await this.commentRepository.getCommentsByImageId(imageId);
  }
}