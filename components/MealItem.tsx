import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
  meal: { strMeal: string; strMealThumb: string; idMeal: string };
};

const MealItem = ({ meal }: TProps) => {
  return (
    <Link href={`/meals/${meal.idMeal}/`}>
      <div className="p-4 rounded-md bg-[#6E6F70] flex flex-col items-center justify-between max-w-sm">
        <Image
          className="mb-4"
          src={meal.strMealThumb}
          alt={meal.strMeal}
          height={180}
          width={400}
        />
        <h3 className="font-semibold text-center">{meal.strMeal}</h3>
      </div>
    </Link>
  );
};

export default MealItem;
