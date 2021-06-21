import { shuffle } from "./utils.js";

let cars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let clickable = true;
let gameArea;
let openCard;
let numberOfTries = 0;
let tries = document.querySelector(".tries");

addEventListener("load", main);

function main() {
    removeEventListener("load", main);
    gameArea = document.querySelector("#game-area");
    createGameArea();
    gameArea.addEventListener("click", cardClick);
}

function cardClick(event) {
    const TARGET = event.target;
    if (TARGET.tagName.toLowerCase() != "img" || !clickable) return;

    TARGET.classList.remove("hidden");

    if (openCard === undefined) {
        openCard = TARGET;
    } else if (openCard.src != TARGET.src) {
        clickable = false;
        increaseTries();
        setTimeout(function () {
            openCard.classList.add("hidden");
            TARGET.classList.add("hidden");
            openCard = undefined;
            clickable = true;
        }, 1000);
    } else {
        openCard = undefined;
        increaseTries();
    }
}

function increaseTries() {
    numberOfTries++;
    tries.innerHTML = numberOfTries;
    if (numberOfTries == 20) {
        tries.classList.add('failed');
        setTimeout(function () {
            numberOfTries = 0;
            tries.innerHTML = numberOfTries;
            tries.classList.remove('failed')
            resetGame();
        }, 1000);
    }
}

function createGameArea() {
    cars = cars.concat(cars);
    cars = shuffle(cars);

    for (let index = 0; index < cars.length; index++) {
        const CAR_NUMBER = cars[index];

        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.classList.add("hidden");
        img.setAttribute("src", `assets/img/car-${CAR_NUMBER}.jpg`);
        img.setAttribute("draggable", false);

        gameArea.appendChild(card);
        card.appendChild(img);
    }
}

function resetGame() {
    let cards = document.querySelectorAll(".card");
    let gameArea = document.querySelector("#game-area");
    cards.forEach((element) => {
        gameArea.removeChild(element);
    });

    cars = cars.slice(0, 10);
    console.log(cars);
    createGameArea();
}
