var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let playersInGame = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber = Math.floor(Math.random() * 6) + 1;
let goBack = 0;
const maxAmountOfPlayers = 4;
const moveSpeed = 400;
const directions = {
    up: "up",
    left: "left",
    right: "right",
};
const ladderMap = {
    "10-0": { left: "0%", bottom: "40%" },
    "40-10": { left: "60%", bottom: "80%" },
    "90-20": { left: "80%", bottom: "60%" },
    "30-30": { left: "40%", bottom: "50%" },
    "10-50": { left: "20%", bottom: "80%" },
    "50-70": { left: "40%", bottom: "90%" },
    "60-40": { left: "60%", bottom: "60%" },
};
const snakeMap = {
    "30-10": { left: "20%", bottom: "0%" },
    "70-50": { left: "70%", bottom: "10%" },
    "40-70": { left: "20%", bottom: "20%" },
    "20-90": { left: "20%", bottom: "40%" },
    "80-90": { left: "90%", bottom: "50%" },
    "0-50": { left: "20%", bottom: "30%" },
};
const getPlayingPlayer = () => document.getElementById(playersInGame[0]);
const togglePlayerVisibility = (playerId, showPlayer) => {
    const player = document.getElementById(playerId);
    const playerAvatar = document.getElementById(playerId + "-avatar");
    player.classList.toggle("d-none", !showPlayer);
    playerAvatar.classList.toggle("d-none", !showPlayer);
};
const setAmountOfPlayers = (amount) => {
    playersInGame = [];
    for (let i = 1; i <= maxAmountOfPlayers; i++) {
        const playerId = `player-${i}`;
        if (i <= amount) {
            playersInGame.push(playerId);
            togglePlayerVisibility(playerId, true);
        }
        else {
            togglePlayerVisibility(playerId, false);
        }
    }
};
const setPlayerAvatar = (playerId, color) => {
    document.getElementById(playerId).style.backgroundImage = `url('images/avatars/${color}.png')`;
};
const startGame = () => {
    document.getElementById("starting-page").classList.add("d-none");
};
const changePlayer = () => {
    if (diceNumber != 6) {
        playersInGame.push(playersInGame.shift());
        goBack = 0;
    }
};
const getMovingDirection = (playerLeft, playerBottom) => {
    if (goBack === 1 || (playerBottom === 90 && playerLeft === 0)) {
        goBack = 1;
        return directions.right;
    }
    else if (playerLeft === 90 && playerBottom % 20 === 0) {
        return directions.up;
    }
    else if (playerLeft === 0 && playerBottom % 20 !== 0) {
        return directions.up;
    }
    else if (playerBottom % 20 !== 0) {
        return directions.left;
    }
    return directions.right;
};
const run = (diceElement) => __awaiter(this, void 0, void 0, function* () {
    const playingPlayer = getPlayingPlayer();
    for (let i = 0; i < diceNumber; i++) {
        const currentLeft = parseInt(playingPlayer.style.left);
        const currentBottom = parseInt(playingPlayer.style.bottom);
        switch (getMovingDirection(currentLeft, currentBottom)) {
            case directions.right: {
                playingPlayer.style.left = `${currentLeft + 10}%`;
                break;
            }
            case directions.up: {
                playingPlayer.style.bottom = `${currentBottom + 10}%`;
                break;
            }
            case directions.left: {
                playingPlayer.style.left = `${currentLeft - 10}%`;
                break;
            }
        }
        yield new Promise((resolve) => setTimeout(resolve, moveSpeed));
    }
    diceElement.disabled = false;
    checkPosition(playingPlayer);
});
const checkPosition = (playingPlayer) => {
    const playerLeft = parseInt(playingPlayer.style.left);
    const playerBottom = parseInt(playingPlayer.style.bottom);
    const positionKey = `${playerLeft}-${playerBottom}`;
    if (playerLeft === 0 && playerBottom === 90) {
        alert("You won!");
    }
    checkLaddersSnakes(ladderMap, positionKey, playingPlayer);
    checkLaddersSnakes(snakeMap, positionKey, playingPlayer);
    changePlayer();
};
const toggleDice = () => {
    const numbers = document.querySelectorAll(".dice-number");
    numbers.forEach((number) => {
        number.classList.add("d-none");
    });
    diceNumber = Math.floor(Math.random() * 6) + 1;
    const diceIClass = `.dice-${diceNumber}`;
    const diceElement = document.querySelector(diceIClass);
    diceElement.disabled = true;
    diceElement.classList.remove("d-none");
    diceElement.classList.add("d-block");
    run(diceElement);
};
const checkLaddersSnakes = (map, positionKey, playingPlayer) => {
    const newPosition = map[positionKey];
    if (newPosition) {
        playingPlayer.style.left = newPosition.left;
        playingPlayer.style.bottom = newPosition.bottom;
    }
};
