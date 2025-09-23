import { temples, url } from "../data/temples.mjs";


// console.log(url);


const showHere = document.querySelector("#show-here");
const dialog = document.querySelector("#dialog");
const title = document.querySelector("#dialog h2");
const info = document.querySelector("#dialog p");
const close = document.querySelector("#dialog button");
close.addEventListener("click", () => dialog.close())


function displayItems(data) {
    console.log(data);
    data.forEach(element => {
        // console.log(element);
        const photo = document.createElement('img');
        photo.setAttribute("src", `${url}${element.path}`);
        photo.setAttribute("alt", element.name);
        // Add event listener to each image on the page
        photo.addEventListener("click", () => showStuff(element));
        showHere.appendChild(photo);
    });
}

displayItems(temples);

function showStuff(x) {
    title.innerHTML = x.name;
    info.innerHTML = `Dedicated ${x.dedicated} by ${x.name} as temple number ${x.number}`;
    dialog.showModal();
}