"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import SortCompany from "@/components/SortCompany";

interface SearchBarProps {
  initialSearch: string;
  classSearch: string;
  showSort?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialSearch,
  classSearch,
  showSort = false,
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const router = useRouter();

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/company?search=${searchInput}`);
      if (!showSort) {
        setSearchInput("");
      }
    }
  };

  return (
    <div
      className={`${classSearch} group focus-within:border-[#9394a5] dark:focus-within:border-yellow-500 focus-within:border-4`}
    >
      <FaSearch className="mr-3 text-black" />
      <input
        type="text"
        className="flex-1 focus:outline-none focus:ring-0 bg-white text-black"
        placeholder="Search for companies"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleSearch}
      />
      {showSort && <SortCompany />}
    </div>
  );
};

export default SearchBar;
