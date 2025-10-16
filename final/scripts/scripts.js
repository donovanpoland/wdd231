

// Add class for showing navigation on hamburger button click
const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');
const dialogBox = document.querySelector("#dialog");
const closeButton = document.querySelector("#dialog button");
const addFavorite = document.querySelector(".add-fav");


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// Listen for window resize and remove show class
window.addEventListener("resize", () => {
    navButton.classList.remove('show');
    navBar.classList.remove('show');
});

// Close modal on button press
if (closeButton) {
    closeButton.addEventListener("click", () => {

        //close dialog box
        dialogBox.close();
        // re-update favorite button to default text
        addFavorite.textContent = "Add Favorite"
    });
}



