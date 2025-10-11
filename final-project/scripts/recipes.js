// Imports
import { displayRandomRecipe } from "./display-recipe.mjs";
import { displayCategories } from "./display-categories.mjs";
import { fetchRandomRecipe } from "./get-recipes.mjs";

// document checks
const dialogBox = document.querySelector("#dialog");
const closeButton = document.querySelector("#dialog button");
const categoryList = document.querySelector("#categories")

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();
    if (categoryList) {
        displayCategories();
    }
    
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