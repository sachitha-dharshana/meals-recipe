import React from "react";

type TProps = {
  selectedCategory: string;
  cat: TCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

type TCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const CategoryItem = ({
  cat,
  selectedCategory,
  setSelectedCategory,
  setSearchQuery,
}: TProps) => {
  return (
    <button
      onClick={() => {
        setSelectedCategory(cat.strCategory);
        setSearchQuery("");
      }}
      className={`${
        selectedCategory === cat.strCategory
          ? "border-2 border-meal-primary"
          : "border-2 border-meal-primary border-opacity-0"
      } px-4 py-2 mt-2 bg-[#6E6F70] rounded-md mr-4`}
    >
      {cat.strCategory}
    </button>
  );
};

export default CategoryItem;
