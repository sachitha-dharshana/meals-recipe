import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-gray-700 p-4 mt-10">
      <h2 className="text-4xl text-meal-primary">Meal Recipe</h2>
      <p>Find the perfect meal recipe for you</p>
      <p>© "Meals-Recipe" {new Date().getFullYear()} All rights reserved</p>
    </div>
  );
};

export default Footer;
