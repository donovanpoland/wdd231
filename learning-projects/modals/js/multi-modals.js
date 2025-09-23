const openButton1 = document.querySelector("#open-button1");
const openButton2 = document.querySelector("#open-button2");
const openButton3 = document.querySelector("#open-button3");
const dialogBox= document.querySelector("#dialog-box");
const dialogBoxText= document.querySelector("#dialog-box-text");
const closeButton = document.querySelector("#close-button");

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Apples contains 95 calories`;
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Oranges contains 45 calories`;
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One Bananas contains 105 calories`;
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});