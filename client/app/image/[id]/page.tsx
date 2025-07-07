"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetImageByIdQuery } from "@/redux/api/unsplashApi";
import {
  usePostCommentMutation,
  useLikeImageMutation,
  useGetCommentsByImageIdQuery,
  useGetLikesByImageIdQuery,
  useCheckUserLikeStatusQuery,
  useDeleteLikeMutation,
} from "@/redux/api/backendApi";
import LoadingSpinner from "@/components/LoadingSpinner";

// Simple function to get a username
const getUsername = () => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) return storedUsername;

  let anonymousId = localStorage.getItem("anonymousId");
  if (!anonymousId) {
    anonymousId = Math.floor(Math.random() * 9000 + 1000).toString();
    localStorage.setItem("anonymousId", anonymousId);
  }

  return `Anonymous${anonymousId}`;
};

export default function ImageDetailPage() {
  const { id } = useParams();
  const username = getUsername();

  const { data: image, isLoading, error } = useGetImageByIdQuery(id as string);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const [postComment] = usePostCommentMutation();
  const [likeImage] = useLikeImageMutation();
  const [deleteLike] = useDeleteLikeMutation();

  const { data: commentsData = [] } = useGetCommentsByImageIdQuery(id as string);
  const { data: likesData } = useGetLikesByImageIdQuery(id as string);

  const {
    data: likeStatus,
    isLoading: likeStatusLoading,
    refetch: refetchLikeStatus,
  } = useCheckUserLikeStatusQuery({
    imageId: id as string,
    username,
  });

  // Optimistic local state
  const [localLiked, setLocalLiked] = useState<boolean | null>(null);
  const [localLikeCount, setLocalLikeCount] = useState<number | null>(null);

  // Initialize local like state once
  useEffect(() => {
    if (likeStatus && localLiked === null) {
      setLocalLiked(likeStatus.exists);
    }
  }, [likeStatus]);

  useEffect(() => {
    if (likesData && localLikeCount === null) {
      setLocalLikeCount(likesData.count);
    }
  }, [likesData]);

  const isLiked = localLiked ?? false;
  const likeCount = localLikeCount ?? 0;

  const handleLike = async () => {
    if (likeStatusLoading || !id) return;

    try {
      const current = await refetchLikeStatus().unwrap();

      if (current.exists) {
        // Optimistic unlike
        setLocalLiked(false);
        setLocalLikeCount((prev) => (prev !== null ? prev - 1 : 0));
        await deleteLike({ imageId: id as string, username }).unwrap();
      } else {
        // Optimistic like
        setLocalLiked(true);
        setLocalLikeCount((prev) => (prev !== null ? prev + 1 : 1));
        await likeImage({ imageId: id as string, username }).unwrap();
      }
    } catch (err) {
      console.error("Like/unlike error:", err);
    }
  };

  const handleCommentSubmit = async () => {
    const trimmed = newComment.trim();
    setCommentError("");

    if (trimmed.length < 3) {
      setCommentError("Comment must be at least 3 characters long");
      return;
    }

    if (trimmed.length > 500) {
      setCommentError("Comment cannot exceed 500 characters");
      return;
    }

    try {
      await postComment({
        imageId: id as string,
        content: trimmed,
        username,
      }).unwrap();
      setNewComment("");
    } catch (error) {
      setCommentError("Failed to post comment. Please try again.");
      console.error("Comment error:", error);
    }
  };

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

      {/* Like section */}
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
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Comment section */}
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
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Post
            </button>
          </div>

          {commentError && (
            <p className="text-red-500 text-xs mt-1">{commentError}</p>
          )}

          <div className="flex justify-between text-xs text-gray-500">
            <span>Minimum 3 characters</span>
            <span
              className={newComment.length > 450 ? "text-orange-500" : ""}
            >
              {newComment.length}/500
            </span>
          </div>
        </div>

        {commentsData.length > 0 ? (
          <ul className="space-y-2">
            {commentsData.map((comment, idx) => (
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
