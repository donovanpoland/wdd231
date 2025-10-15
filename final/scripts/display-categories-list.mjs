import { fetchCategories } from "./fetch-recipes.mjs";
import { createNewCard, displayCategories, resetLoadedCount } from "./display-recipe.mjs";




export async function displayCategoryButtons() {
    const categoryButtons = document.querySelector("#categories-buttons");
    try {
        const data = await fetchCategories();
        const categories = data.categories;

        // create a button for each category
        if (categoryButtons) {
            categories.forEach((cat) => {
                createButton(cat.strCategory);
        }); // end foreach loop
        }// end if

       
    } catch (error) {
        console.error("Error displaying categories:", error);
    }
}

export async function displayCategoryOptions() {
    const categorySelect = document.querySelector("#categories-select");
    try {
        const data = await fetchCategories();
        const categories = data.categories;

        // create an option for each category
        if (categorySelect && categories) {
            categories.forEach((cat) => {
                createOptions(cat.strCategory);
        }); // end foreach loop
        }// end if
       
    } catch (error) {
        console.error("Error displaying categories:", error);
    }
}

function createButton(category) {
    const categoryButtons = document.querySelector("#categories-buttons");
    // Create list item
    const listItem = document.createElement("li");
    // Create button
    const button = document.createElement("button");
    // Update button text
    button.textContent = category;
    // Add button to list item
    listItem.appendChild(button);
    // Add listener to button
    button.addEventListener("click", async  () => {
        // Filter and display recipes
        // Avoid double clicks
        button.disabled = true;
        try {
            setCurrentCategory(category);
            resetLoadedCount();
            await createNewCard();
        } catch (err) {
            console.error("Category click error:", err);
        }
        button.disabled = false;
    });
    // Add list item to list
    categoryButtons.appendChild(listItem);
}

function setCurrentCategory(category) {
    sessionStorage.setItem("Current Category", category);
    // console.log(`Set new category: ${category}`)
}

export function getCurrentCategory() {
    let category = sessionStorage.getItem("Current Category");;
    // If null or empty string, use default
    if (!category || category.trim() === "") {
        category = "Miscellaneous";
    }
    return category;
}

function createOptions(category) {
    const categorySelect = document.querySelector("#categories-select");
    if (!categorySelect) return;
    // Create option
    const option = document.createElement("option");
    // Add category
    option.value = category;
    option.textContent = category;
    // Add option to select
    categorySelect.appendChild(option);
}