import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const SortRequestButton: React.FC<SortButtonProps> = ({ sortOrder, onSortChange }) => {
  return (
    <Button
      data-id="sort-button"
      onClick={onSortChange}
      className="px-6 py-3 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-md transform transition duration-300 
             hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 
             focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 flex items-center"
    >
      Sort by Request Date
      <span className="ml-2">
        {sortOrder === "asc" ? (
          <FaSortAmountUp className="text-lg" />
        ) : (
          <FaSortAmountDown className="text-lg" />
        )}
      </span>
    </Button>
  )
}

export default SortRequestButton