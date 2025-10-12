// Imports
import { displayRandomRecipe, displayCategories } from "./display-recipe.mjs";
import { displayCategoryButtons } from "./display-categories-list.mjs";
import { fetchRandomRecipe, fetchCategories } from "./fetch-recipes.mjs";

// document checks
const dialogBox = document.querySelector("#dialog");
const closeButton = document.querySelector("#dialog button");
const categoryList = document.querySelector("#categories-list");
const categories = document.querySelector("#categories");

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();
    if (categoryList) {
        displayCategoryButtons();
    }
    if (categories) {
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