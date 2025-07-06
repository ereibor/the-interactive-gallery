import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    imageId: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);


likeSchema.index({ imageId: 1, username: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);

