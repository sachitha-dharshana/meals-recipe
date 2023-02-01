"use client";

import MealItem from "@/components/MealItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { BeatLoader } from "react-spinners";
import { getMealItemDetail } from "../meals/[meals]/page";

const SavedListPage = () => {
  // state
  const [savedMealsId, setSavedMealsId] = useState([]);
  const savedMeals = JSON.parse(localStorage.getItem("savedMeals") as string);

  useEffect(() => {
    if (savedMeals) {
      setSavedMealsId(savedMeals);
    }
  }, []);

  const queries = savedMealsId.map((id) => ({
    queryKey: ["singleMeal", id],
    queryFn: getMealItemDetail,
  }));

  const result = useQueries(queries);

  return (
    <div className="mt-8 grid gap-16 grid-cols-fluid">
      {result &&
        result.map(({ data, isLoading }, index) => {
          const meal = data && {
            strMeal: data.strMeal,
            strMealThumb: data.strMealThumb,
            idMeal: data.idMeal,
          };

          if (isLoading) {
            return <BeatLoader color="#fff" key={savedMealsId[index]} />;
          }
          return (
            <Link href={`/meals/${data.idMeal}`} key={data.idMeal}>
              <MealItem meal={meal} />
            </Link>
          );
        })}
    </div>
  );
};

export default SavedListPage;
