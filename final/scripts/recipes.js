// Imports
import { displayRandomRecipe, displayCategories, createNewCard, displayFavorites } from "./display-recipe.mjs";
import { displayCategoryButtons, displayCategoryOptions } from "./display-categories-list.mjs";
import { fetchCategories } from "./fetch-recipes.mjs";

// document checks
const categoryList = document.querySelector("#categories-buttons");
const categorySelect = document.querySelector("#categories-select");
const categories = document.querySelector("#categories");
const favorites = document.querySelector("#favorites");
const moreButton = document.querySelector("#display-more");

document.addEventListener("DOMContentLoaded", () => {
    displayRandomRecipe();

    if (categoryList) {
        displayCategoryButtons();
    }

    if (categorySelect) {
        displayCategoryOptions();
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