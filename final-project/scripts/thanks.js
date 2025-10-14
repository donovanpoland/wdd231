// Get data from search bar after get method from form
// This data is visible to anyone when "get" is used (no Sensitive data)
const getFromData = new URLSearchParams(window.location.search);

// Place info in variables for shorter template literal
// Required

// Optional


function displayInfo() { 

}

// Make words Title Case
function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
