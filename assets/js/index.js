import { shuffle } from './utils.js';

let cars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let clickable = true;
let gameArea;
let openCard;
let numberOfTries = 0;
let tries = document.querySelector('.tries');

addEventListener('load', main);

function main() {
    removeEventListener('load', main);
    gameArea = document.querySelector('#game-area');
    createGameArea();
    gameArea.addEventListener('click', cardClick);
}

function cardClick(event) {
    const TARGET = event.target;
    if (TARGET.tagName.toLowerCase() != 'img' || !clickable) return;

    TARGET.classList.remove('hidden');

    if (openCard === undefined) {
        openCard = TARGET;
    } else if (openCard.src != TARGET.src) {
        clickable = false;
        increaseTries();
        TARGET.classList.add('red');
        openCard.classList.add('red');
        setTimeout(() => {
            openCard.classList.remove('red');
            TARGET.classList.remove('red');
        }, 200);
        setTimeout(function () {
            openCard.classList.add('hidden');
            TARGET.classList.add('hidden');
            openCard = undefined;
            clickable = true;
        }, 1000);
        checkWin();
    } else {
        increaseTries();
        TARGET.classList.add('green');
        openCard.classList.add('green');
        setTimeout(() => {
            openCard.classList.remove('green');
            TARGET.classList.remove('green');
            openCard = undefined;
        }, 200);
        
        checkWin();
    }
}

function increaseTries() {
    numberOfTries++;
    tries.innerHTML = numberOfTries;
    if (numberOfTries == 30) {
        displayGameOver();
    }
}

function createGameArea() {
    cars = cars.concat(cars);
    cars = shuffle(cars);

    for (let index = 0; index < cars.length; index++) {
        const CAR_NUMBER = cars[index];

        let card = document.createElement('div');
        card.classList.add('card');
        let img = document.createElement('img');
        img.classList.add('hidden');
        img.setAttribute('src', `assets/img/car-${CAR_NUMBER}.jpg`);
        img.setAttribute('draggable', false);

        gameArea.appendChild(card);
        card.appendChild(img);
    }
}

function isTurned(card) {
    return !card.classList.contains('hidden');
}

function checkWin() {
    let cards = document.querySelectorAll('img');
    let gameWon;
    for (let index = 0; index < cards.length; index++) {
        gameWon = isTurned(cards[index]);
        if (gameWon === false) break;
    }
    if (gameWon === true) {
        displayWin();
    }
}

function displayWin() {
    let winMessage = document.querySelector('h2');
    winMessage.innerHTML = 'YOU WIN!';
    winMessage.classList.add('green');
    setTimeout(() => {
        resetGame();
    }, 3000);
}

function displayGameOver() {
    let gameOverMessage = document.querySelector('h2');
    gameOverMessage.innerHTML = 'GAME OVER!';
    gameOverMessage.classList.add('red');
    setTimeout(() => {
        resetGame();
    }, 3000);
}

function resetGame() {
    let cards = document.querySelectorAll('.card');
    let gameArea = document.querySelector('#game-area');
    let h2 = document.querySelector('h2');
    h2.innerHTML = `Number of Tries: <span class="tries">0</span>`;
    h2.classList.remove('green', 'red');
    cards.forEach((element) => {
        gameArea.removeChild(element);
    });

    numberOfTries = 0;
    cars = cars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    createGameArea();
}
