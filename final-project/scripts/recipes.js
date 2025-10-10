import { displayRandomRecipe } from "./display-recipe.mjs";
import { fetchRandomRecipe } from "./get-recipes.mjs";
const dialogBox = document.querySelector("#dialog");
const closeButton = document.querySelector("#dialog button");

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();
});

fetchRandomRecipe();

// Close modal on button press
closeButton.addEventListener("click", () => {
    dialogBox.close();
});

// Close modal on scroll press
window.addEventListener("scroll", () => {
    dialogBox.close();
});