import { fetchMemberData, displayData, getMembers } from "./display-data.mjs";

// Layout buttons
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const layout = document.querySelector("#directory");

let membersData = [];

// Load js after Dom is loaded
window.addEventListener("DOMContentLoaded", async () => {

  membersData = await getMembers();

  displayData(membersData, document.querySelectorAll('.directory-grid .card'));

  // Event listeners
  gridButton.addEventListener("click", showGrid);
  listButton.addEventListener("click", showList);
  
});


// Add list class and remove grid class
function showList() {
  layout.classList.add("directory-list");
  layout.classList.remove("directory-grid");
  listCardsList();
}

// Add grid class and remove list class
function showGrid() {
  layout.classList.add("directory-grid");
  layout.classList.remove("directory-list");
  gridCardsList();
}

function gridCardsList() {
  // Find all classes with the name card and place them in an array
  const gridCards = document.querySelectorAll('.directory-grid .card');
  displayData(membersData, gridCards);
}

function listCardsList() {
  // Find all classes with the name card and place them in an array
  const listCards = document.querySelectorAll(".directory-list .card");
  displayData(membersData, listCards);
}