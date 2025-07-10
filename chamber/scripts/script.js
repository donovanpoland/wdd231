
//get data from json file name
const url = `data/members.json`;
//find directory insertion class in html
const cards = document.querySelector(".directory");

//load file
async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    //log data(jason file) to console in table format to the console
    console.table(data.members);
    displayMembers(data.members);
}

getMemberData();

function displayMembers(members) {
    members.forEach(member => {
        //create a new card
        const card = document.createElement("section");
        card.classList.add("card");

        //image
        const img = document.createElement("img");
        img.setAttribute("src", `Logo of ${member.name}`)
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "200");
        img.setAttribute("height", "300");

        // Business Name
        const name = document.createElement("h3");
        name.textContent = member.name;

        //create address tag for convention
        const addTag = document.createElement("address");

        // Address
        const address = document.createElement("p");
        address.classList.add("address")
        address.textContent = member.address;

        // Phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;

        //website
        const website = document.createElement("a");
        website.setAttribute("href", member.url);
        website.setAttribute("target", "_blank");
        website.textContent = member.url;

        //add elements to address
        addTag.appendChild(name);
        addTag.appendChild(img);
        addTag.appendChild(address);
        addTag.appendChild(phone);
        addTag.appendChild(website);

        //add address tag to the card
        card.appendChild(addTag)

        //add the card to the page
        cards.appendChild(card);
    });
}

