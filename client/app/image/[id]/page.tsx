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

// Simple function to get username with random number for anonymous users
const getUsername = () => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) return storedUsername;
  
  // Check if we already have an anonymous ID
  let anonymousId = localStorage.getItem("anonymousId");
  if (!anonymousId) {
    // Generate random number between 1000-9999
    anonymousId = Math.floor(Math.random() * 9000 + 1000).toString();
    localStorage.setItem("anonymousId", anonymousId);
  }
  
  return `Anonymous${anonymousId}`;
};

export default function ImageDetailPage() {
  const { id } = useParams();

  // Fetch single image query image data by ID from Unsplash API
  const { data: image, isLoading, error } = useGetImageByIdQuery(id as string);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  // Get username once at the top
  const username = getUsername();

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
        return;
      }

      await likeImage({ imageId: id as string, username }).unwrap();
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as { data?: { error?: string } })?.data?.error ===
          "You have already liked this image"
      ) {

      } else {
        console.error("Failed to like image:", error);
      }
    }
  };

  // Create comment mutation with validation
  const handleCommentSubmit = async () => {
    const trimmedComment = newComment.trim();
    
    // Clear previous error
    setCommentError("");
    
    // Validation checks
    if (trimmedComment.length === 0) {
      setCommentError("Comment cannot be empty");
      return;
    }
    
    if (trimmedComment.length < 3) {
      setCommentError("Comment must be at least 3 characters long");
      return;
    }
    
    if (trimmedComment.length > 500) {
      setCommentError("Comment cannot exceed 500 characters");
      return;
    }
    
    try {
      await postComment({
        imageId: id as string,
        content: trimmedComment,
        username: username,
      }).unwrap();
      setNewComment("");
      setCommentError("");
    } catch (error) {
      setCommentError("Failed to post comment. Please try again.");
      console.error("Comment post error:", error);
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
        className="font-semibold text-sm text-gray-600 hover:text-black cursor-pointer"
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

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                // Clear error when user starts typing
                if (commentError) setCommentError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                  handleCommentSubmit();
                }
              }}
              className={`flex-1 border rounded-md px-3 py-2 text-sm ${
                commentError 
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              }`}
              maxLength={500}
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800 transition"
            >
              Post
            </button>
          </div>
          
          {/* Error message */}
          {commentError && (
            <p className="text-red-500 text-xs mt-1">{commentError}</p>
          )}
          
          {/* Character count */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Minimum 3 characters</span>
            <span className={newComment.length > 450 ? "text-orange-500" : ""}>
              {newComment.length}/200
            </span>
          </div>
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