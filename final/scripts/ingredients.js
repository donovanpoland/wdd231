const addIngredientBtn = document.getElementById("add-ingredient");
const ingredientList = document.getElementById("ingredient-list");
const recipeForm = document.querySelector("form");

// We'll store ingredients in an array
let ingredients = [];

// Add ingredient button logic
addIngredientBtn.addEventListener("click", () => {
    const ingredient = document.getElementById("ingredient").value.trim();
    const measurement = document.getElementById("measurement").value.trim();
    const unit = document.getElementById("unit").value;

    if (!ingredient || !measurement || !unit) {
        alert("Please fill in all ingredient fields before adding.");
        return;
    }

    const fullIngredient = `${ingredient} — ${measurement} ${unit}`;
    ingredients.push(fullIngredient);

    // Update list visually
    const li = document.createElement("li");
    li.textContent = fullIngredient;
    ingredientList.appendChild(li);

    // Clear inputs
    document.getElementById("ingredient").value = "";
    document.getElementById("measurement").value = "";
    document.getElementById("unit").selectedIndex = 0;

    // Update hidden field for form submission
    updateHiddenIngredients();
});


recipeForm.addEventListener("submit", (event) => {
// Ensure at least one ingredient is added
if (ingredients.length === 0) {
    event.preventDefault(); // Stop submission
    alert("Please add at least one ingredient before submitting your recipe.");
    return false;
}
});

// Create a hidden input to submit all ingredients
const hiddenField = document.createElement("input");
hiddenField.type = "hidden";
hiddenField.name = "ingredients";
document.querySelector("form").appendChild(hiddenField);

function updateHiddenIngredients() {
  hiddenField.value = ingredients.join(", ");
}
