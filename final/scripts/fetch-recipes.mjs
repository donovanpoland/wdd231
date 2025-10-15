import { searchByName, searchByCategory, searchById, randomMeal, mealCategories} from "./url.mjs";
import { getCurrentCategory } from "./display-categories-list.mjs";

// Fetch full recipe at random
export async function fetchRandomRecipe() { 
    try {
        // Fetch recipe data from the  MealDB API
        const apiResponse = await fetch(randomMeal);

        // Store the data
        const mealData = await apiResponse.json();
        // Log to console - Debugging
        // console.log("Random Recipe API Response:", mealData);
        return mealData;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

// Fetch list of categories
export async function fetchCategories() { 
    try {
        // Fetch recipe data from the MealDB API
        const apiResponse = await fetch(mealCategories);

        // Store the data
        const categories = await apiResponse.json();
        // Log to console - Debugging
        console.log("Category List API Response:", categories);
        return categories;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

// Fetch recipe names/images(only) by category
// Will need to use fetch recipe by name or by id to get full details about recipe
export async function fetchByCategory() { 
    try {
        const category = getCurrentCategory();
        // Log to console - Debugging
        // console.log(`Current: ${category}`);
        // Fetch recipe data from the  MealDB API
        const apiResponse = await fetch(searchByCategory(category));

        // Store the data
        const data = await apiResponse.json();
        // Log to console - Debugging
        // console.log("Search by Category API Response:", data);
        return data;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

// Fetch recipe by name
export async function fetchRecipeByName() { 
    try {
        // Fetch recipe data from the  MealDB API
        const apiResponse = await fetch(searchByName);

        // Store the data
        const mealName = await apiResponse.json();
        // Log to console - Debugging
        console.log("Recipe by Name API Response:", mealName);
        return mealName;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}

// Fetch recipe by id
export async function fetchById(id) { 
    try {
        if (!id) throw new Error("fetchById: Missing recipe ID.");

        // Fetch recipe data from the MealDB API
        const url = `${searchById}${id}`;
        // Log to console - Debugging
        // console.log(url);
        const apiResponse = await fetch(url);

        // Store the data
        const data = await apiResponse.json();

        if (!data.meals || data.meals.length === 0) {
            throw new Error(`No recipe found for ID: ${id}`);
        }
        // Log to console - Debugging
        // console.log("Recipe by ID API Response:", data.meals[0]);
        return data.meals[0];
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
    }
}