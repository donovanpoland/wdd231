import { apikey } from "./api-key.mjs"

const website = "https://www.themealdb.com"


export const searchById = `${website}/api/json/v1/${apikey}/lookup.php?i=`;
export const randomMeal = `${website}/api/json/v1/${apikey}/random.php`;
export const mealCategories = `${website}/api/json/v1/${apikey}/categories.php`;

export function searchByName(recipeName) {
    return `${website}/api/json/v1/${apikey}/search.php?s=${recipeName}`;
}

export function searchByCategory(category) {
    return `${website}/api/json/v1/${apikey}/filter.php?c=${category}`;
}


