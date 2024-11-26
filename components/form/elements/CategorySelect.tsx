import React, { useState, useEffect } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { getAllCategories } from "@/lib/db";

interface CategorySelectProps {
  onCategoryChange: (selectedCategories: string[]) => void;
  initialSelectedCategories?: string[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  onCategoryChange,
  initialSelectedCategories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSelectedCategories,
  );
  const [categoriesList, setCategoriesList] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const categories = await getAllCategories();
        setCategoriesList(
          categories.map((category: { id: number; name: string }) => ({
            value: category.id.toString(),
            label: category.name,
          })),
        );

        if (initialSelectedCategories[0] === "0") {
          return;
        }

        if (
          initialSelectedCategories.length > 0 &&
          initialSelectedCategories[0] !== "0"
        ) {
          setSelectedCategories(initialSelectedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [initialSelectedCategories]);

  const handleCategoryChange = (selected: string[]) => {
    setSelectedCategories(selected);
    onCategoryChange(selected);
  };

  return (
    <div className="col-span-3 p-4 max-w-xl text-black">
      <h1 className="text-3xl text-gray-700 mb-4">Categories</h1>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <MultiSelect
          defaultValue={
            initialSelectedCategories[0] === "0" &&
            initialSelectedCategories.length == 1
              ? []
              : initialSelectedCategories
          }
          options={categoriesList}
          onValueChange={handleCategoryChange}
          value={selectedCategories}
          placeholder="Select Categories"
          className="text-black"
        />
      )}
    </div>
  );
};

export default CategorySelect;
