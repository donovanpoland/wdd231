import { fetchRandomRecipe } from "./get-recipes.mjs"


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

function addImage(meal, card) {
    //Get image element 
    const recipeImg = card.querySelector("img");
    // Get image Url 
    const originalUrl = meal.strMealThumb; 

    //Optimize image with wsrv.nl at https://images.weserv.nl/ 
    const optimizedUrl = `https://images.weserv.nl/?url=${originalUrl}&w=284&h=284&output=webp`;

    // Update source and alt
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
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=588&h=588&output=webp`;
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
        modalImg.src = `https://images.weserv.nl/?url=${originalUrl}&w=588&h=588&output=webp`;
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
        tagsList = "Standard Dish";
    }

    category.textContent = `Category: ${meal.strCategory}`;
    ingredients.textContent = `${ingredientCount} Ingredients`;
    tags.textContent = tagsList;
}

function addName(meal, card) {
    // Get header element
    const recipeName = card.querySelector("h3");
    recipeName.textContent = meal.strMeal;
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