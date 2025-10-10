import { fetchRandomRecipe, fetchById } from "./get-recipes.mjs"
import { displayMealDetails } from "./recipe-modal.mjs";



export async function displayRandomRecipe() {
    try {
        // Select all cards to display the recipe
        const recipeCards = document.querySelectorAll("#featured .card, #popular .card");

        // Loop through each card, fetch a different random meal for each // not always unique
        for (const card of recipeCards) {
            const randomData = await fetchRandomRecipe();
            const meal = randomData.meals[0];

            // Get header element
            const recipeName = card.querySelector("h3");

            // Get image element
            const recipeImg = card.querySelector("img");
            // Get image Url
            const originalUrl = meal.strMealThumb;
            // Optimize image with wsrv.nl at https://images.weserv.nl/
            const optimizedUrl = `https://images.weserv.nl/?url=${originalUrl}&w=300&h=300&output=webp`;

            // Get list element
            const list = card.querySelector("ul");
            // Get number of ingredients
            const ingredientCount = Object.keys(meal)
                .filter(key => key.startsWith("strIngredient") && meal[key])
                .length;

            // Get list children elements
            const category = list.querySelector("li:first-child");
            const ingredients = list.querySelector("li:nth-child(2)");
            const tags = list.querySelector("li:last-child");

            // Split tags up to be more spacious
            let tagsList;

            if (meal.strTags) {
                // Split by commas, trim spaces, and rejoin with ", "
                const splitTags = meal.strTags.split(",");
                const spacedTags = splitTags.map(tag => tag.trim());
                tagsList = spacedTags.join(", ");
            } else {
                // Fallback text if no tags are provided
                tagsList = "Standard Dish";
            }

            // Get the button from the card
            const viewButton = card.querySelector("button.view");
            if (viewButton) {
                const dialogBox = document.querySelector("#dialog");
                // Add listener to button for modal display
                viewButton.addEventListener("click", async () => {
                    dialogBox.showModal();
                });
            }
            // Dynamically place randomData on page
            recipeName.textContent = meal.strMeal;
            recipeImg.src = optimizedUrl;
            recipeImg.alt = meal.strMeal;
            category.textContent = meal.strCategory;
            ingredients.textContent = `${ingredientCount} Ingredients`;
            tags.textContent = tagsList;
        }

    } catch (error) {
        console.error("Error displaying recipe:", error);
    }
}