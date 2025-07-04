'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const dummyImages = [
  {
    id: '1',
    url: '/image1.jpg',
    title: 'Sunset Over the Mountains',
    author: 'Jane Doe',
    description: 'A beautiful sunset over rocky mountains.',
    tags: ['sunset', 'mountains', 'nature'],
  },
  {
    id: '2',
    url: '/image2.jpg',
    title: 'Morning Forest Mist',
    author: 'John Smith',
    description: 'A peaceful forest covered in morning mist.',
    tags: ['forest', 'mist', 'green'],
  },
];

export default function ImageDetailPage({ params }: { params: { id: string } }) {
  const image = dummyImages.find((img) => img.id === params.id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  if (!image) return notFound();

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => history.back()}
        className="font-semibold"
      >
        ← Back
      </button>

      <div className="relative w-full h-[500px] rounded overflow-hidden">
        <Image
          src={image.url}
          alt={image.title}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{image.title}</h1>
        <p className="text-gray-600 mt-2">by {image.author}</p>
      </div>

      <p className="text-sm text-gray-700">{image.description}</p>

      {image.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {image.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              #{tag}
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
        <span className="text-gray-700 text-sm">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
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
