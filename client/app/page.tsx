'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [page, setPage] = useState(1);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        currentPage={page}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />

      {/* <main className="flex items-start justify-center p-6 pt-35 sm:pt-24">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl p-6">
         
        </div>
      </main> */}
    </div>
  );
}
