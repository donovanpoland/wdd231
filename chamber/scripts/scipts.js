// Add class for showing navigation on hamburger button click
const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');
const girdButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const display = document.querySelector("#directory");

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// Listen for window resize and remove show class
window.addEventListener("resize", () => {
  navButton.classList.remove('show');
  navBar.classList.remove('show');
});

girdButton.addEventListener("click", showGrid);
listButton.addEventListener("click", showList);

function showList() {
	display.classList.add("directory-list");
	display.classList.remove("directory-grid");
}

function showGrid() {
  display.classList.add("directory-grid");
  display.classList.remove("directory-list");
}