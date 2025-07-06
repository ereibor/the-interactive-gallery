import { Router } from "express";
import { LikeController } from "../controllers/like.controller";

const router = Router();
const likeController = new LikeController();

// Create a like
router.post("/", likeController.createLike);

// Get likes for a image
router.get("/image/:imageId", likeController.getLikesByImageId);

// Get like count for a image
router.get("/count/:imageId", likeController.getLikeCountByImageId);

// Check if user liked a comment
router.get("/check/:imageId/:username", likeController.hasUserLikedImage);

// Delete a like (unlike)
router.delete("/:imageId/:username", likeController.deleteLike);

export default router;
