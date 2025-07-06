"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useGetImageByIdQuery } from "@/redux/api/unsplashApi";
import {
  usePostCommentMutation,
  useLikeImageMutation,
  useGetCommentsByImageIdQuery,
  useGetLikesByImageIdQuery,
  useCheckUserLikeStatusQuery,
  useDeleteLikeMutation,
} from "@/redux/api/backendApi";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ImageDetailPage() {
  const { id } = useParams();
  
  // Fetch single image query image data by ID from Unsplash API
  const { data: image, isLoading, error } = useGetImageByIdQuery(id as string);
  const [newComment, setNewComment] = useState("");

  // Get username once at the top
  const username = localStorage.getItem("username") || "Anonymous";

  // backend API mutations and queries
  const [postComment] = usePostCommentMutation();
  const [likeImage] = useLikeImageMutation();
  const { data: commentsData = [] } = useGetCommentsByImageIdQuery(
    id as string
  );
  const { data: likesData } = useGetLikesByImageIdQuery(id as string);

  // Check if user has already liked this image hasLiked mutation
  const {
    data: likeStatus,
    isLoading: likeStatusLoading,
    refetch: refetchLikeStatus,
  } = useCheckUserLikeStatusQuery({
    imageId: id as string,
    username,
  });
 
  // Mutation to delete like
  const [deleteLike] = useDeleteLikeMutation();


  const likedCount = likesData?.count || 0; // Default to 0 if no likes data
  const isLiked = likeStatus?.exists || false;
  


  // Create like mutation
  const handleLike = async () => {
    if (likeStatusLoading) return;

    
    try {
      // Double-check from server again to avoid race condition
      const likeCheck = await refetchLikeStatus().unwrap();
      if (likeCheck.exists) {
        await deleteLike({ imageId: id as string, username }).unwrap();
       
        console.log("Image already liked, like removed");
        return;
      }

      await likeImage({ imageId: id as string, username }).unwrap();
      console.log("Image liked successfully");

    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as { data?: { error?: string } })?.data?.error ===
          "You have already liked this image"
      ) {
        console.log("Image already liked on server (duplicate request)");
      } else {
        console.error("Failed to like image:", error);
      }
    }
  };

  // Create comment mutation

  const handleCommentSubmit = async () => {
    if (newComment.trim().length > 2) {
      await postComment({
        imageId: id as string,
        content: newComment.trim(),
        username: localStorage.getItem("username") || "Anonymous",
      }).unwrap();
      setNewComment("");
    }
  };

  const comments = commentsData.map((comment) => comment);

  if (isLoading) return <LoadingSpinner />;
  if (error || !image)
    return <p className="text-red-500 p-6 text-center">Image not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => history.back()}
        className="font-semibold text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <div className="relative w-full h-[400px] rounded overflow-hidden">
        <Image
          src={image.urls.regular}
          alt={image.alt_description || "Photo"}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          {image.alt_description || "Untitled"}
        </h1>
        <p className="text-gray-600 mt-2">by {image.user.name}</p>
      </div>

      {image.description && (
        <p className="text-sm text-gray-700">{image.description}</p>
      )}

      {image.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {image.tags.map((tag: { title: string }) => (
            <span
              key={tag.title}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              #{tag.title}
            </span>
          ))}
        </div>
      )}

      {/* Like Button and Count */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-md text-white transition cursor-pointer ${
            isLiked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {isLiked ? "♥ Liked" : "♡ Like"}
        </button>
        <span className="text-gray-700 text-sm">
          {likedCount} {likedCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Comment Section */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Comments</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer"
          >
            Post
          </button>
        </div>

        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-800 bg-gray-100 p-2 rounded"
              >
                {comment.content}{" "}
                <span className="text-gray-500">- {comment.username}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
