import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroImage from "../public/meals-recipe-hero.jpg";

const Hero = () => {
  return (
    <div className="flex justify-between items-start gap-10 mt-8 flex-col md:items-center md:flex-row hero">
      <div>
        <h1 className="text-7xl font-bold">
          Find The Perfect{" "}
          <span className="text-meal-primary">Meal Recipe</span> For You
        </h1>
        <h2 className="mt-4 text-lg mb-8">
          A collection of scrumptious & mouth watering recipes
        </h2>
        <div>
          <Link className="p-2 bg-meal-primary rounded-sm mr-8" href="meals">
            Explore Meals
          </Link>
          <Link className="p-2 bg-slate-500 rounded-sm" href="/savedList">
            Saved List
          </Link>
        </div>
      </div>

      <Image
        src={heroImage}
        alt="hero"
        height={400}
        width={400}
        className="rounded-md"
      />
    </div>
  );
};

export default Hero;
