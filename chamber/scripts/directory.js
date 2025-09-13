// Membership data
const jsonData = 'data/members.json' // File path
// Layout buttons
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const layout = document.querySelector("#directory");
// Card selectors
const card = document.querySelector('.card');
const businessName = document.querySelector('.name');
const membership = document.querySelector('.membership');
const logo = document.querySelector('.logo');
const description = document.querySelector('.desc');
const street = document.querySelector('.street');
const businessLocation = document.querySelector('.location');
const email = document.querySelector('.email');
const phone = document.querySelector('.phone');
const website = document.querySelector('.url');



gridButton.addEventListener("click", showGrid);
listButton.addEventListener("click", showList);

function showList() {
	layout.classList.add("directory-list");
	layout.classList.remove("directory-grid");
}

function showGrid() {
  layout.classList.add("directory-grid");
  layout.classList.remove("directory-list");
}

// async function
async function fetchMemberData() {
  // Load/fetch data json file using json url path
  const response = await fetch(jsonData);
  
  // Store the data
  const data = await response.json();

  // Log data(jason file) to console in table format to the console
  console.table(data.members);
}

fetchMemberData();
