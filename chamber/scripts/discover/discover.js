import { places, url } from "../../data/places.mjs";



// console.log(places);

displayPlaces(places);



function displayPlaces(places) {
    // Find all classes with the name card and place them in an array
    const cards = document.querySelectorAll(".card");

    // For each card assign member data to each card according to index number
    places.forEach((place, index) => {
        const card = cards[index];
        if (!card) return;

        // Set heading
        const heading = card.querySelector(".card h2");
        heading.textContent = place.name;

        // Set image
        const picture = card.querySelector(".card img");
        picture.setAttribute("src", `${url}${place.image}`);
        picture.setAttribute("alt", `Depiction of ${place.name}`);
        
        // Set description
        const description = card.querySelector(".card p");
        description.textContent = place.description;

        // Set address
        const businessAddress = card.querySelector(".card address");
        businessAddress.textContent = place.address;

        // Add link to button
        const link = card.querySelector(".card a");
        link.textContent = `${place.descriptor} ${place.name}`
        link.setAttribute("href", place.website);

     });
}
