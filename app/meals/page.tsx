"use client";

import Categories from "@/components/Categories";
import MealItem from "@/components/MealItem";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

type TMeal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

const getCategories = async () => {
  const { data } = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return data.categories;
};

const getMealsByCategory = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryKey[1]}`
  );
  return data?.meals || [];
};

const getSearchedMeals = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${queryKey[1]}`
  );
  return data?.meals || [];
};

const MealsPage = () => {
  // state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
  } = useQuery(["categories"], getCategories);

  const {
    data: mealsByCategory,
    isLoading: mealsByCategoryIsLoading,
    isError: mealsByCategoryIsError,
  } = useQuery(["mealsByCategory", selectedCategory], getMealsByCategory, {
    enabled: searchQuery === "",
  });

  const {
    data: mealsBySearch,
    isLoading: mealsBySearchIsLoading,
    isError: mealsBySearchIsError,
  } = useQuery(["mealsBySearch", searchQuery], getSearchedMeals, {
    enabled: searchQuery !== "",
  });

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchText !== "") {
        setSearchQuery(searchText);
        setSelectedCategory("");
      } else {
        setSearchQuery(searchText);
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setSearchQuery("");
      clearTimeout(timeOut);
    };
  }, [searchText, categories]);

  return (
    <div>
      {/* searchbar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <li className="mt-2 text-meal-primary">
        <span className="text-white">
          search meals or select a category from below.
        </span>
      </li>

      {/* category list */}
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        categoriesIsLoading={categoriesIsLoading}
        categoriesIsError={categoriesIsError}
        setSearchQuery={setSearchQuery}
      />

      <div className="mt-8 grid gap-16 grid-cols-fluid">
        {/* search results loading */}
        {mealsBySearchIsLoading && (
          <div className="flex mt-8 justify-center items-center h-96">
            <BeatLoader color="#fff" />
          </div>
        )}

        {/* mealsbySearch */}
        {!mealsBySearchIsLoading &&
          !mealsBySearchIsError &&
          mealsBySearch &&
          mealsBySearch.map((meal: TMeal) => {
            return <MealItem key={meal.idMeal} meal={meal} />;
          })}

        {/* meals by category loading */}
        {categoriesIsLoading || mealsByCategoryIsLoading ? (
          <div className="flex mt-8 justify-center items-center h-96">
            <BeatLoader
              color="#fff"
              loading={categoriesIsLoading || mealsByCategoryIsLoading}
            />
          </div>
        ) : null}

        {/* mealsByCategory */}
        {!categoriesIsLoading &&
          !mealsByCategoryIsError &&
          mealsByCategory &&
          mealsByCategory.map((meal: TMeal) => {
            return <MealItem key={meal.idMeal} meal={meal} />;
          })}
      </div>
    </div>
  );
};

export default MealsPage;
