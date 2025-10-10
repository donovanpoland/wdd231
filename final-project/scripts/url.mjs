import { apikey } from "./api-key.mjs"

const recipeName = "Arrabiata";

const website = "https://www.themealdb.com"


export const searchByName = `${website}/api/json/v1/${apikey}/search.php?s=${recipeName}`;
export const randomMeal = `${website}/api/json/v1/${apikey}/random.php`;
export const mealCategories = `${website}/api/json/v1/${apikey}/categories.php`;
export const mealById = `${website}/api/json/v1/${apikey}/lookup.php?i=`;