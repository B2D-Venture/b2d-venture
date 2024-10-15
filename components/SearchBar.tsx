"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

interface SearchBarProps {
  initialSearch: string;
  classSearch: string;
  showFilter?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialSearch,
  classSearch,
  showFilter = false,
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const router = useRouter();

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/company-list?search=${encodeURIComponent(searchInput)}`);
      if (!showFilter) {
        setSearchInput("");
      }
    }
  };

  return (
    <div
      className={`${classSearch} group focus-within:border-yellow-500 focus-within:border-4`}
    >
      <FaSearch className="mr-3" />
      <input
        type="text"
        className="flex-1 focus:outline-none focus:ring-0"
        placeholder="Search for companies"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleSearch}
      />
      {showFilter && <IoFilter className="ml-3" />}
    </div>
  );
};

export default SearchBar;
