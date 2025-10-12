// Imports
import { displayRandomRecipe, displayCategories,createNewCard } from "./display-recipe.mjs";
import { displayCategoryButtons } from "./display-categories-list.mjs";


// document checks
const categoryList = document.querySelector("#categories-list");
const categories = document.querySelector("#categories");
const moreButton = document.querySelector("#display-more");

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();
    if (categoryList) {
        displayCategoryButtons();
    }
    if (categories) {
        displayCategories();
    }
});


// Close modal on button press
moreButton.addEventListener("click", async () => {
    moreButton.disabled = true;
    try {
        await createNewCard();
    }
    catch (err) {
         console.error("Button click error:", err);
    }
    moreButton.disabled = false;
});