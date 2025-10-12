import { fetchCategories } from "./fetch-recipes.mjs";
import { displayCategories } from "./display-recipe.mjs";

const categoryList = document.querySelector("#categories-list");

export async function displayCategoryButtons() {
    try {
        const data = await fetchCategories();
        const categories = data.categories;
        
        // create a button for each category
        categories.forEach((cat) => {
            createButton(cat.strCategory);
        });
    } catch (error) {
        console.error("Error displaying categories:", error);
    }
}

function createButton(category) {
    // Create list item
    const listItem = document.createElement("li");
    // Create button
    const button = document.createElement("button");
    // Update button text
    button.textContent = category;
    // Add button to list item
    listItem.appendChild(button);
    // Add listener to button
    button.addEventListener("click", () => {
        // Filter and display recipes
        setCurrentCategory(category);
        displayCategories();
    });
    // Add list item to list
    categoryList.appendChild(listItem);
}

function setCurrentCategory(category) {
    sessionStorage.setItem("Current Category", category);
    console.log(`Set new category: ${category}`)
}

export function getCurrentCategory() {
    let category = sessionStorage.getItem("Current Category");;
    // If null or empty string, use default
    if (!category || category.trim() === "") {
        category = "Miscellaneous";
    }
    return category;
}