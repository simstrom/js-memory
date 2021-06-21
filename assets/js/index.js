import { shuffle } from "./utils.js";

let cars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let gameArea;

addEventListener("load", main);

function main() {
  removeEventListener("load", main);
  gameArea = document.querySelector("#game-area");
  createGameArea();
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

    gameArea.appendChild(card);
    card.appendChild(img);
  }
}