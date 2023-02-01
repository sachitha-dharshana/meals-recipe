import React from "react";
import { Montserrat } from "@next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ weight: "900", subsets: ["latin"] });

const Header = () => {
  return (
    <div className="flex justify-between items-center px-8 pt-8">
      <Link href="/" className={`$${montserrat.className} font-bold text-4xl`}>
        <div className="p-5 bg-meal-primary rounded-sm hover:scale-105 transition-all">
          <h2>Meals-Recipe</h2>
        </div>
      </Link>
      <div className="flex gap-5 font-semibold text-lg">
        <Link href="/meals" className="hover:text-meal-primary transition">
          Meals
        </Link>
        <Link href="/savedList" className="hover:text-meal-primary transition">
          Saved List
        </Link>
      </div>
    </div>
  );
};

export default Header;
