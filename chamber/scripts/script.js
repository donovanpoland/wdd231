
// name url data from json file name
const url = `data/members.json`;
// Find directory insertion class in html
const cards = document.querySelector(".directory");

// Load file
async function getMemberData() {
    // Get data from json file
    const response = await fetch(url);
    const data = await response.json();
    // Log data(jason file) to console in table format to the console
    console.table(data.members);
    displayMembers(data.members);
}

getMemberData();

function displayMembers(members) {
    members.forEach(member => {
        // Create a new card
        const card = document.createElement("section");
        card.classList.add("card");

        // Image
        const img = document.createElement("img");
        img.setAttribute("src", `Logo of ${member.name}`)
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "200");
        img.setAttribute("height", "300");

        // Business Name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Create address tag for convention
        const addTag = document.createElement("address");

        // Address
        const address = document.createElement("p");
        address.classList.add("address")
        address.textContent = member.address;

        // Phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        // Website
        const website = document.createElement("a");
        website.setAttribute("href", member.url);
        website.setAttribute("target", "_blank");
        website.textContent = member.url;

        // Add elements to address
        addTag.appendChild(name);
        addTag.appendChild(img);
        addTag.appendChild(address);
        addTag.appendChild(phone);
        addTag.appendChild(website);

        // Add address tag to the card
        card.appendChild(addTag)

        // Add the card to the page
        cards.appendChild(card);
    });
}

