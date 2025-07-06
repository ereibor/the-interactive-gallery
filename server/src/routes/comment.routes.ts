import { CommentController } from "../controllers/comment.controller";
import { Router } from "express";

const router = Router();
const commentController = new CommentController();

router.post("/", commentController.createComment);
router.get("/:imageId", commentController.getCommentsByImageId);

export default router;
