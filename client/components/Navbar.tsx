'use client';

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

type NavbarProps = {
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSearch: (term: string) => void;
};

export default function Navbar({
  currentPage,
  onNextPage,
  onPrevPage,
  onSearch,
}: NavbarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm py-4 px-6 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onNextPage}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800">The Interactive Gallery</h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-md ml-auto"
        >
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full text-sm focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
}
