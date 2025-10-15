import { getCurrentCategory } from "./display-categories-list.mjs";
import { fetchByCategory, fetchRandomRecipe, fetchById } from "./fetch-recipes.mjs"

// track how many recipes have been shown
let loadedCount = document.querySelectorAll("#categories .card").length;

export async function displayRandomRecipe() {
    try {
        // Select all cards to display the recipe
        const recipeCards = document.querySelectorAll("#featured .card, #popular .card");

        // Loop through each card, fetch a different random meal for each // not always unique
        for (const card of recipeCards) {
            const randomData = await fetchRandomRecipe();
            const meal = randomData.meals[0];
            
            addName(meal, card);
            addImage(meal, card);
            addInfo(meal, card);
            addModal(meal, card);
        }// End loop
    } catch (error) {
        console.error("Error displaying recipe:", error);
    }// End Try/Catch
}

export async function displayFavorites(){
try {
    // Select all favorite placeholder cards
    const recipeCards = document.querySelectorAll("#favorites .card");
    // Load saved favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // If there are no favorites, hide unused cards and show message
    if (favorites.length === 0) {
      recipeCards.forEach(card => card.classList.add("extra"));
      console.warn("No favorites found in localStorage.");
      return;
    }

    // Loop through placeholder cards and fill them with favorites
    for (let i = 0; i < recipeCards.length; i++) {
      const card = recipeCards[i];
      const fav = favorites[i];

      // If we’ve run out of favorites, hide remaining cards
      if (!fav) {
        card.classList.add("extra");
        continue;
      }

      // Fetch full recipe data for this favorite
      const data = await fetchById(fav.idMeal);
      const meal = data?.meals?.[0];

      if (!meal) {
        console.warn(`Failed to fetch details for ID: ${fav.idMeal}`);
        card.classList.add("extra");
        continue;
      }

      // Fill in card content
      addName(meal, card);
      addImage(meal, card);
      addInfo(meal, card);
      addModal(meal, card);

      // Make sure the card is visible
      card.classList.remove("extra");
    }

    // Hide any remaining placeholder cards after favorites are displayed
    for (let j = favorites.length; j < recipeCards.length; j++) {
      recipeCards[j].classList.add("extra");
    }

    console.log(`Displayed ${favorites.length} favorite(s).`);

  } catch (error) {
    console.error("Error displaying favorites:", error);
  }
}

export async function displayCategories() { 
    try {
        // Select all cards to display the recipe
        const recipeCards = document.querySelectorAll("#categories .card");
        const category = getCurrentCategory();

        // Fetch all recipes in this category
        const categoryData = await fetchByCategory();

        // Set meals array
        const meals = categoryData.meals;

        const displayMore = document.getElementById("display-more");
        displayMore.style.display = "block";

        // Limit loop to number of placeholder cards
        const totalCards = recipeCards.length;
        const totalMeals = Math.min(totalCards, meals.length);

        // Log to console - Debugging
        console.log(`Displaying ${totalMeals} meals out of ${meals.length} for category: ${category}`);

        // Loop through available cards
        for (let i = 0; i < totalMeals; i++) {
            const card = recipeCards[i];
            const mealId = meals[i].idMeal;

            // Show card if it was hidden
            card.classList.remove("extra");

            // Fetch full recipe details by ID
            const fullMealData = await fetchById(mealId);

            // Reuse your helper functions for clean updates
            addName(fullMealData, card);
            addImage(fullMealData, card);
            addInfo(fullMealData, card);
            addModal(fullMealData, card);
        }

        // If there are more placeholder cards than recipes, reset unused ones
        for (let i = totalMeals; i < totalCards; i++) {
            const card = recipeCards[i];
            resetPlaceholderCard(card);
            card.classList.add("extra");
        }

    } catch (error) {
        console.error("Error displaying recipes by category:", error);
    }
}

function addName(meal, card) {
    // Get header element
    const recipeName = card.querySelector("h3");
    recipeName.textContent = meal.strMeal;
}

function addImage(meal, card) {
    //Get image element 
    const recipeImg = card.querySelector("img");
    // Not all recipes have an image, create a fallback
    const fallback = "images/logos/recipe-placeholder284.webp";
    // Get image Url 
    const originalUrl = meal.strMealThumb; 

    //Optimize image with wsrv.nl at https://images.weserv.nl/ 
    let optimizedUrl;
      if (originalUrl && originalUrl.startsWith("https")) {
        optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}&w=284&output=webp`;
    } else {
        optimizedUrl = fallback;
    }

    // Update image element
    recipeImg.src = optimizedUrl;
    recipeImg.alt = meal.strMeal;
}

function addModalImage(meal, card) {
    // Get image element
    const modalImg = card.querySelector(".modal-image");
    // Get image Url
    const originalUrl = meal.strMealThumb;

    // Create the media query (matches if screen ≥ 38em)
    const mediaQuery = window.matchMedia("(min-width: 38em)");
    
    // Optimize image with wsrv.nl at https://images.weserv.nl/
    // Pick image size based on current screen width
    if (mediaQuery.matches) {
        // Large screen (≥ 38em)
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=588&output=webp`;
    } else {
        // Small screen (< 38em)
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=284&output=webp`;
    }
    
    // Update alt
    modalImg.alt = meal.strMeal;

    // Update when screen size changes
    mediaQuery.addEventListener("change", (element) => {
        if (element.matches) {
        // Switched to large screen
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=588&output=webp`;
        } else {
        // Switched to small screen
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=284&output=webp`;
        }
    });
}

function addInfo(meal, card) {
    // Get list element
    const list = card.querySelector(".info");
    // Get number of ingredients
    const ingredientCount = Object.keys(meal).filter(key => key.startsWith("strIngredient") && meal[key]).length;
    
    // Get list children elements
    const category = list.querySelector("li:first-child");
    const ingredients = list.querySelector("li:nth-child(2)");
    const tags = list.querySelector("li:last-child");
    
    // Split tags up to be more spacious
    let tagsList;
    if (meal.strTags) {
        // Split by commas, trim spaces, and rejoin with ", "
        const splitTags = meal.strTags.split(",");
        const spacedTags = splitTags.map(tag => `#${tag.trim()}`);
        tagsList = spacedTags.join(", ");
    } else {
        // Fallback text if no tags are provided
        tagsList = "#Standard Dish";
    }

    category.textContent = `Category: ${meal.strCategory}`;
    ingredients.textContent = `${ingredientCount} Ingredients`;
    tags.textContent = tagsList;
}

function addModal(meal, card) {
    // Get the button from the card
    const viewButton = card.querySelector("button.view");
    if (viewButton) {
        // Get dialog box
        const dialogBox = document.querySelector("#dialog");
        // Get dialog box card
        const dialogBoxCard = document.querySelector("#dialog .card");
        // Add listener to button for modal display
        viewButton.addEventListener("click", async () => {
            dialogBox.showModal();
            // add data to dialog box card from same meal data
            addName(meal, dialogBoxCard);
            addModalImage(meal, dialogBoxCard);
            // Take any old event listeners off
            addFavorite.removeEventListener("click", addToFavorite(meal, dialogBoxCard));

            addInfo(meal, dialogBoxCard);
            addInstructions(meal, dialogBoxCard);
            addIngredientsMeasurements(meal, dialogBoxCard);
        });// End event listener function
    }// End if
}

function addInstructions(meal, card) {
    // Build details (you can expand this however you want)
    const instructions = card.querySelector(".instructions");
    instructions.textContent = meal.strInstructions;
}

function addIngredientsMeasurements(meal, card) {
    const ingredientsList = card.querySelector(".ingredients");

    // Collect non-empty ingredients and combine them with measurements
    for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = `${ingredient} - ${measure},`;
            listItem.style.marginRight = "0.4rem";
            ingredientsList.appendChild(listItem);
        }
    }
}

function resetPlaceholderCard(card) {
    const placeholderImg = "images/logos/recipe-placeholder284.webp";
    const recipeName = card.querySelector("h3");
    const recipeImg = card.querySelector("img");
    const infoItems = card.querySelectorAll(".info li");

    recipeName.textContent = "Recipe Name";
    recipeImg.src = placeholderImg;
    recipeImg.alt = "Recipe placeholder Image";
    infoItems[0].textContent = "Category";
    infoItems[1].textContent = "Number of Ingredients";
    infoItems[2].textContent = "Tags";
}

export async function createNewCard() {
    const recipeCards = document.querySelector("#categories");
    const categoryData = await fetchByCategory();

    const meals = categoryData.meals;
    const totalMeals = meals.length;

    const minimum = 12;
    const remaining = totalMeals - loadedCount;
    const loadAmount = Math.min(minimum, remaining);

    for (let i = 0; i < loadAmount; i++) {
        const meal = meals[loadedCount + i];
        // Create article
        const article = document.createElement("article");
        article.classList.add("card", "center");

        // Create image
        const image = document.createElement("img");
        image.classList.add("card-image");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;

        // Create h3
        const heading = document.createElement("h3");

        // Create list
        const list = document.createElement("ul");
        list.classList.add("info");
        // Create list items
        const category = document.createElement("li");
        const ingredients = document.createElement("li");
        const tags = document.createElement("li");
        // Add list items to list
        list.appendChild(category);
        list.appendChild(ingredients);
        list.appendChild(tags);

        // Create button
        const button = document.createElement("button");
        button.classList.add("view");
        button.textContent = "View Recipe"

        // Add elements to article
        article.append(image, heading, list, button);
        // Add article to recipe section
        recipeCards.appendChild(article);
    }
    // Update how many have been shown
    loadedCount += loadAmount;

    // Display the recipe info for new cards
    await displayCategories();

    // Hide the button if everything is loaded
    const displayMore = document.getElementById("display-more");
    if (loadedCount >= totalMeals) {
        // console.log("Hiding button...");
        displayMore.style.display = "none";
    }
}

export function resetLoadedCount(preload = false) {
    loadedCount = 0;
    const recipeCards = document.querySelector("#categories");
    if (recipeCards) recipeCards.innerHTML = "";

    const displayMore = document.querySelector("#display-more");
    if (displayMore) displayMore.style.display = "block";

    // console.log("Loaded count reset and cards cleared.");

    // Optionally load first batch
    if (preload) createNewCard();
}

function addToFavorite(meal, card) {
    const addFavorite = card.querySelector(".add-fav");


    addFavorite.addEventListener("click", () => {
        // Get existing favorites convert to JSON or to an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Check if meal already exists
        const exists = favorites.some(fav => fav.idMeal === meal.idMeal);
        if (exists) {
            alert(`${meal.strMeal} already in favorites`);
        return;
        }

        // Add new favorite
        favorites.push({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        });

        // Save back to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        console.log("Favorites updated:", favorites);
    });
}

function removeFromFavorite(idMeal, card) {
    const removeFavorite = card.querySelector(".remove-fav");

    removeFavorite.addEventListener("click", () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updated = favorites.filter(fav => fav.idMeal !== idMeal);
        localStorage.setItem("favorites", JSON.stringify(updated));
        });
}