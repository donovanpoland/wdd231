import { fetchMemberData } from "./display-data.mjs";

// Layout buttons
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const layout = document.querySelector("#directory");

// Event listeners
gridButton.addEventListener("click", showGrid);
listButton.addEventListener("click", showList);

// Add list class and remove grid class
function showList() {
  layout.classList.add("directory-list");
  layout.classList.remove("directory-grid");
}

// Add grid class and remove list class
function showGrid() {
  layout.classList.add("directory-grid");
  layout.classList.remove("directory-list");
}

fetchMemberData();