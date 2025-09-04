const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

const daughter = document.querySelector('#daughter')
const son = document.querySelector('#son')

// Months are 0 based
const daughterBirthday = new Date(2024, 4, 26); // May 26, 2024
const sonBirthday = new Date(2025, 7, 12); // August 12, 2025

function getAgeText(birthday) {
    const now = new Date();
    
    let years = now.getFullYear() - birthday.getFullYear();
    let months = now.getMonth() - birthday.getMonth();

    if (now.getDate() < birthday.getDate()) {
        months -= 1;
    }

    let totalMonths = years * 12 + months;

    // If under 1 month show weeks, if more than 24 months, display years
    if (totalMonths < 1) {
        const diffMs = now - birthday;
        const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        return `${weeks} week${weeks === 1 ? '' : 's'} old`;
    } else if (totalMonths > 24) {
        return `${years} years old`;
    } else {
        return `${totalMonths} month${totalMonths === 1 ? '' : 's'} old`;
    }
        
}

daughter.textContent = getAgeText(daughterBirthday);
son.textContent = getAgeText(sonBirthday);