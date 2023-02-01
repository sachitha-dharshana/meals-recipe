import React from "react";
import { BeatLoader } from "react-spinners";
import CategoryItem from "./CategoryItem";

type TProps = {
  categories: TCategory[];
  selectedCategory: string;
  categoriesIsLoading: boolean;
  categoriesIsError: boolean;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

type TCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const Categories = ({
  categories,
  selectedCategory,
  categoriesIsLoading,
  categoriesIsError,
  setSelectedCategory,
  setSearchQuery,
}: TProps) => {
  if (categoriesIsLoading) {
    return (
      <div className="flex items-center mt-8">
        <BeatLoader color="#fff" />
      </div>
    );
  }
  if (categoriesIsError) {
    return <div className="text-2xl">Something went wrong!</div>;
  }
  return (
    <div className="flex mt-8 flex-wrap">
      {categories.map((cat) => (
        <CategoryItem
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          key={cat.idCategory}
          cat={cat}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
};

export default Categories;
