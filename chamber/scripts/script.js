
//
const url = `data/members.json`;
const cards = document.querySelector(".directory");

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

        //
    });
}

