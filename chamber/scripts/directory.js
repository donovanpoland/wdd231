const girdButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const display = document.querySelector("#directory");


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