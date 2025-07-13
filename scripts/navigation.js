const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
let width = window.innerWidth;


navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

// Listen for window resize and remove show class
window.addEventListener("resize", () => {
  navButton.classList.remove('show');
  navBar.classList.remove('show');
});