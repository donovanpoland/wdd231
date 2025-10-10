import { displayRandomRecipe } from "./display-recipe.mjs";
const dialogBox = document.querySelector("#dialog");

export function displayMealDetails(meal) {
    



    // Build details (you can expand this however you want)
    const instructions = document.createElement("p");
    instructions.textContent = meal.strInstructions;

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredient-list");

    // Collect non-empty ingredients
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = `${ingredient} — ${measure}`;
            ingredientsList.appendChild(li);
        }
    }
}