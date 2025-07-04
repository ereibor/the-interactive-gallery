'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useGetImageByIdQuery } from '@/redux/unsplashApi';
import { useState } from 'react';

export default function ImageDetailPage() {
  const { id } = useParams();
  const { data: image, isLoading, error } = useGetImageByIdQuery(id as string);
  console.log('Image data:', image);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim().length > 2) {
      setComments((prev) => [...prev, newComment.trim()]);
      setNewComment('');
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (error || !image) return <p className="text-red-500 p-6 text-center">Image not found.</p>;

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
          alt={image.alt_description || 'Photo'}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{image.alt_description || 'Untitled'}</h1>
        <p className="text-gray-600 mt-2">by {image.user.name}</p>
      </div>

      {image.description && (
        <p className="text-sm text-gray-700">{image.description}</p>
      )}

      {image.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {image.tags.map((tag: any) => (
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
          onClick={toggleLike}
          className={`px-4 py-2 rounded-md text-white transition ${
            liked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {liked ? '♥ Liked' : '♡ Like'}
        </button>
        <span className="text-gray-700 text-sm">
          {likeCount} {likeCount === 1 ? 'like' : 'likes'}
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
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Post
          </button>
        </div>

        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, idx) => (
              <li key={idx} className="text-sm text-gray-800 bg-gray-100 p-2 rounded">
                {comment}
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
