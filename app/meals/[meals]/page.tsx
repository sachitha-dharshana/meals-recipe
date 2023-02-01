"use client";

import MealDetail from "@/components/MealDetail";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export const getMealItemDetail = async ({ queryKey }: any) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${queryKey[1]}`
  );
  return data?.meals?.[0];
};

const MealItemDetail = () => {
  // state
  const [isSaved, setIsSaved] = useState(false);

  const path = usePathname();
  // path => '/meals/5467' we need only id
  const id = path && path.replace("/meals", "").replace("/", "");

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      const savedMeals = JSON.parse(
        localStorage.getItem("savedMeals") as string
      );
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [id]);

  // helper fn
  const handleSave = () => {
    const savedMeals = JSON.parse(localStorage.getItem("savedMeals") as string);

    if (localStorage.getItem("savedMeals") === null) {
      localStorage.setItem(
        "savedMeals",
        JSON.stringify([mealItemDetails.idMeal])
      );
      toast.success("Meal saved successfully!");
    } else {
      if (!isSaved) {
        savedMeals.push(mealItemDetails.idMeal);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        toast.success("Meal saved successfully!");
        setIsSaved(true);
      } else {
        savedMeals.splice(savedMeals.indexOf(mealItemDetails.idMeal), 1);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        toast.error("Meal removed successfully!");
        setIsSaved(false);
      }
    }
  };

  const {
    data: mealItemDetails,
    isLoading: mealItemDetailsIsLoading,
    isError: mealItemDetailsIsError,
  } = useQuery(["mealItemDetails", id], getMealItemDetail);

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.2rem",
          },
          position: "bottom-right",
        }}
      />
      {mealItemDetailsIsError && <p>Something went wrong!</p>}
      {mealItemDetailsIsLoading && (
        <div className="h-96 flex justify-center items-center">
          <BeatLoader color="#fff" />
        </div>
      )}
      {!mealItemDetailsIsLoading &&
        !mealItemDetailsIsError &&
        mealItemDetails && (
          <MealDetail meal={mealItemDetails} handleSave={handleSave} />
        )}
    </div>
  );
};

export default MealItemDetail;
