// Get data from search bar after get method from form
// This data is visible to anyone when "get" is used (no Sensitive data)
const getFormData = new URLSearchParams(window.location.search);

// Place info in variables for shorter template literal
// Required
const recipeName = getFormData.get("recipe-name");
const category = getFormData.get("categories-select");
const ingredientItem = getFormData.get("ingredient");
const measurement = getFormData.get("measurement");
const unit = getFormData.get("unit");
const steps = getFormData.get("steps");
const firstName = getFormData.get("fname");
const email = getFormData.get("email");

const fullIngredient = `${ingredientItem} -- ${measurement} ${unit}`

// Optional
const tags = getFormData.get("tags") || "None";
const imageName = getFormData.get("upload-image") || "No image uploaded";

// Debugging
// Display form data in console
// console.log("📋 Submitted Form Data:");
// for (const [key, value] of getFormData.entries()) {
//   console.log(`${key}: ${value}`);
// }
// Confirm params function gets all data
// logParamsListener();
function logParamsListener() {
  console.log(recipeName);
  console.log(category);
  console.log(fullIngredient);
  console.log(steps);
  console.log(firstName);
  console.log(email);
  console.log(tags);
  console.log(imageName);

}

displayInfo();


function displayInfo() { 
  const thanksParagraph = document.querySelector("#thanks");
  thanksParagraph.innerHTML = `
    <h2>Thank You, ${firstName}!</h2>
    <p>Your recipe has been successfully submitted.</p>

    <h3>Recipe Details</h3>
    <ul>
      <li><strong>Recipe Name:</strong> ${recipeName}</li>
      <li><strong>Category:</strong> ${category}</li>
      <li><strong>Tags:</strong> ${tags}</li>
      <li><strong>Ingredient:</strong> ${fullIngredient}</li>
      <li><strong>Instructions:</strong> ${steps}</li>
      <li><strong>Image File:</strong> ${imageName}</li>
    </ul>

    <p>We'll send a confirmation to <strong>${email}</strong> once your recipe is reviewed.</p>
    <a href="recipes.html">Continue Browsing</a>
  `;
}


// Make words Title Case
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
