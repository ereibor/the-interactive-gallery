'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function Home() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("space"); // Default search query

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSearch = (term: string) => {
    // If search term is empty/whitespace, reset to default
    const searchTerm = term.trim() || "space";
    setQuery(searchTerm);
    setPage(1); // Reset to first page when a new search is made
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        currentPage={page}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onSearch={handleSearch}
      />

      <main className="flex items-start justify-center p-6 pt-35 sm:pt-24">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl p-6">
          <Gallery query={query} page={page} />
        </div>
      </main>
    </div>
  );
}
