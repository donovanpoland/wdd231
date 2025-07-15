const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

updateAriaHidden();

//hide navigation
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');  

});

// Listen for window resize and remove show class
window.addEventListener("resize", () => {
    navButton.classList.remove('show');
    navBar.classList.remove('show');

    updateAriaHidden();
});

function updateAriaHidden() {
    // min width set in media.css file
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) * 47;
    const width = window.innerWidth;

    if (width > rem) {
        navButton.setAttribute("aria-hidden", "true");
    } else {
        navButton.setAttribute("aria-hidden", "false");
    }
}