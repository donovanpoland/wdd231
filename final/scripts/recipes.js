// Imports
import { displayRandomRecipe, displayCategories, createNewCard, displayFavorites } from "./display-recipe.mjs";
import { displayCategoryButtons } from "./display-categories-list.mjs";


// document checks
const categoryList = document.querySelector("#categories-list");
const categories = document.querySelector("#categories");
const favorites = document.querySelector("#fav-container");
const moreButton = document.querySelector("#display-more");

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();
    if (categoryList) {
        displayCategoryButtons();
    }
    if (categories) {
        displayCategories();
    }
    if (favorites) {
        displayFavorites();
    }
});

if (moreButton) {
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
}


