

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

//
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //log data(jason file) to console in table format to the console
    // console.table(data.prophets)
    displayProphets(data.prophets);
}

getProphetData();

function displayProphets(prophets) {
    prophets.forEach((prophet) => {
        //create new card
        const card = document.createElement("section");
        card.classList.add("card");

        //name
        const fullName = document.createElement("h2");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`

        //separator
        const div = document.createElement("div");
        div.classList.add("prophet-data");

        //DOB
        const dateOfBirth = document.createElement("p");
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;

        //POB
        const placeOfBirth = document.createElement("p");
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;

        //image
        const portrait = document.createElement("img");
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "300");

        //add to card element
        card.appendChild(fullName);
        card.appendChild(div);
        div.appendChild(dateOfBirth);
        div.appendChild(placeOfBirth);
        div.appendChild(portrait);

        //add each card to cards div
        cards.appendChild(card);
  });
}
