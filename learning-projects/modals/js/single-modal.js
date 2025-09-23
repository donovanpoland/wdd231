const openButton = document.querySelector("#open-button");
const dialogBox= document.querySelector("#dialog-box");
const closeButton = document.querySelector("#close-button");

openButton.addEventListener("click", () => {
    dialogBox.showModal();

});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});