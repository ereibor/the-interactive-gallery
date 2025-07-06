import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';

const router = Router();
const likeController = new LikeController();

// Create a like
router.post('/', likeController.createLike);

// Get likes for a comment
router.get('/comment/:commentId', likeController.getLikesByCommentId);

// Get like count for a comment
router.get('/count/:commentId', likeController.getLikeCountByCommentId);

// Check if user liked a comment
router.get('/check/:commentId/:username', likeController.hasUserLikedComment);

// Delete a like (unlike)
router.delete('/:commentId/:username', likeController.deleteLike);

// Get all likes by a user
router.get('/user/:username', likeController.getLikesByUsername);

export default router;