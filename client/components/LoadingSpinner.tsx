'use client';

export default function LoadingSpinner() {
  return (
    <div className="p-6 flex justify-center items-center">
      <div
        className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}
