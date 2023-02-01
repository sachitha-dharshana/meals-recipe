import Image from "next/image";

type TProps = {
  meal: Record<string, string>;
  handleSave: () => void;
};

const MealDetail = ({ meal, handleSave }: TProps) => {
  const savedMeals = JSON.parse(localStorage.getItem("savedMeals") as string);

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient"))
    .filter((key) => meal[key] !== "" && meal[key] !== null);

  const ingredientsWithMeasures = ingredients.map((key, index) => {
    return {
      index: index + 1,
      ingredient: meal[key],
      measure: meal[`strMeasure${index + 1}`],
    };
  });

  const instructions = meal.strInstructions
    .split(".")
    .filter((ins) => ins !== "");

  return (
    <div>
      <div className="flex gap-12 items-center mt-16 mb-32">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          height={300}
          width={300}
        />
        <div>
          <h2 className="text-3xl">{meal?.strMeal}</h2>

          {meal?.strArea && (
            <li className="mt-2 text-meal-primary">
              <span className="text-white">Area: {meal.strArea}</span>
            </li>
          )}

          {meal?.strCategory && (
            <li className="mt-2 text-meal-primary">
              <span className="text-white">Category: {meal.strCategory}</span>
            </li>
          )}

          {meal?.strTags && (
            <li className="mt-2 text-meal-primary">
              <span className="text-white">
                Tags: {meal.strTags.replace(",", ", ")}
              </span>
            </li>
          )}

          {savedMeals?.includes(meal.idMeal) && (
            <p className="text-md text-green-400 mt-8">
              You have already saved this meal 😋
            </p>
          )}

          <button
            onClick={handleSave}
            className="bg-meal-primary px-4 py-2 rounded-sm mt-4"
          >
            {savedMeals?.includes(meal.idMeal) ? "✖ Unsave" : "❤ Save"}
          </button>
        </div>
      </div>

      <div className="mb-32">
        <h2 className="text-3xl mb-6">Ingredients 📃</h2>
        <div className="flex flex-col [&>*:nth-child(odd)]:bg-[#2A2B2E] [&>*:nth-child(even)]:bg-[#303134] w-96">
          {ingredientsWithMeasures.map((ing) => {
            return (
              <div className="p-2" key={ing.index}>
                <div className="flex justify-between gap-10 " key={ing.index}>
                  <div>{ing.ingredient}</div>
                  <div>{ing.measure}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-32">
        <h2 className="text-3xl mb-6">Instructions 🍜</h2>
        {instructions.map((ins) => {
          return (
            <li key={ins} className="mt-2 text-meal-primary">
              <span className="text-white">{ins}</span>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default MealDetail;
