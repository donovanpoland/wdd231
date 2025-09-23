

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

//
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //log data(jason file) to console in table format to the console
    console.table(data.prophets)
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

        //order
        const order = document.createElement("p");
        order.classList.add("order");
        order.innerHTML = `<strong>${prophet.order}</strong>`;

        //separator
        const prophetData = document.createElement("div");
        prophetData.classList.add("prophet-data");

        //DOB
        const dateOfBirth = document.createElement("p");
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;

        //POB
        const placeOfBirth = document.createElement("p");
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;

        //children
        const children = document.createElement("p");
        children.textContent = `Number of Children: ${prophet.numofchildren}`;

        //image
        const portrait = document.createElement("img");
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "300");

        //death
        const death = document.createElement("p");
        if (prophet.death === null) {
            death.textContent = `Date of Death: (Living Prophet)`;
        }
        else {
            death.textContent = `Date of Death: ${prophet.death}`;
        }
        

        //years of service
        const service = document.createElement("p");
        service.textContent = `Years of Service: ${prophet.length}`;

        //add to card element
        card.appendChild(fullName);
        card.appendChild(prophetData);
        card.appendChild(order);

        //separate from name
        prophetData.appendChild(dateOfBirth);
        prophetData.appendChild(placeOfBirth);
        prophetData.appendChild(children);
        prophetData.appendChild(portrait);
        prophetData.appendChild(death);
        prophetData.appendChild(service);

        //add each card to cards div
        cards.appendChild(card);
  });
}
