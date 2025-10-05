import {places, url} from "../../data/places.mjs"
import { displayVisitMessage } from "./last-visit.mjs";

const visitCard = document.querySelector(".visit");
const closeButton = document.querySelector(".visit-btn")
closeButton.addEventListener('click', () => {
    visitCard.classList.add("hidden");  
});

// Debug - display places in console
// console.log(places);
displayVisitMessage();
displayPlaces(places);



function displayPlaces(places) {
    // Find all classes with the name card and place them in an array
    const cards = document.querySelectorAll(".discover .card");

    // For each card assign member data to each card according to index number
    places.forEach((place, index) => {
        const card = cards[index];
        if (!card) return;

        // Set heading
        const heading = card.querySelector("h2");
        heading.textContent = place.name;

        // Set image
        const picture = card.querySelector("img");
        picture.setAttribute("src", `${url}${place.image}`);
        picture.setAttribute("alt", `Depiction of ${place.name}`);
        
        // Set description
        const description = card.querySelector("p");
        description.textContent = place.description;

        // Set address
        const businessAddress = card.querySelector("address");
        businessAddress.textContent = place.address;

        // Add link to button
        const link = card.querySelector("a");
        link.textContent = `${place.descriptor} ${place.name}`
        link.setAttribute("href", place.website);
     });
}
