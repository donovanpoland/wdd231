import { searchByName, randomMeal, mealCategories, mealById } from "./url.mjs";

export async function fetchRandomRecipe() { 
    try {
        // Fetch recipe data from the meal db API
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

export async function fetchCategories() { 
    try {
        // Fetch recipe data from the meal db API
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

export async function fetchRecipeByName() { 
    try {
        // Fetch recipe data from the meal db API
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

export async function fetchById(id) { 
    try {
        // Fetch recipe data from the meal db API
        const apiResponse = await fetch(`${mealById}${id}`);

        // Store the data
        const data = await apiResponse.json();
        // Log to console - Debugging
        console.log("Recipe by ID API Response:", data.meals[0]);
        return data.meals[0];;
    } catch (error) {
        console.error("Error Fetching Data: ", error);
    }
}