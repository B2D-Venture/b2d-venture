import React from "react";
import { Badge } from "@/components/ui/badge";

interface CategoryListProps {
  categories: { id: number | null; name: string | null }[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="flex flex-row gap-1 mt-3">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant="outline"
          className="text-white bg-gray-700 border-none"
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryList;
