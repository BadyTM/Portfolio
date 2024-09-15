"use strict";
const gameSettings = {
    maxAmountOfPlayers: 4,
    moveSpeed: 400,
    availableColours: ["blue", "green", "yellow", "pink"],
    directions: {
        up: "up",
        left: "left",
        right: "right",
    },
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
let playersInGame = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber = Math.floor(Math.random() * 6) + 1;
let goBack = false;
const togglePlayerVisibility = (playerClass, showPlayer) => {
    const player = document.querySelector(`.${playerClass}`);
    const playerAvatar = document.querySelector(`.${playerClass}-avatar`);
    player.classList.toggle("d-none", !showPlayer);
    playerAvatar.classList.toggle("d-none", !showPlayer);
};
const setAmountOfPlayers = (amount) => {
    playersInGame = [];
    for (let i = 1; i <= gameSettings.maxAmountOfPlayers; i++) {
        const playerClass = `player-${i}`;
        if (i <= amount) {
            playersInGame.push(playerClass);
            togglePlayerVisibility(playerClass, true);
        }
        else {
            togglePlayerVisibility(playerClass, false);
        }
    }
    const avatarBtns = [...document.querySelectorAll(".avatar-btn")];
    avatarBtns.forEach((button) => {
        button.disabled = false;
        button.classList.remove("selected-avatar");
    });
};
const toggleAvatarButtons = (buttons, clickedAvatarBtn, disable) => {
    buttons.forEach((button) => {
        if (button !== clickedAvatarBtn) {
            button.disabled = disable;
            button.classList.remove("selected-avatar");
        }
    });
};
const setPlayerAvatar = (event, playerClass, colour) => {
    const clickedAvatarBtn = event.target;
    const parentRowElement = clickedAvatarBtn.closest(".avatar-row");
    const buttonsWithSameColour = document.querySelectorAll(`[colour="${colour}"]`);
    const previouslySelectedBtn = parentRowElement?.querySelector(".selected-avatar");
    const previouslySelectedColour = previouslySelectedBtn?.getAttribute("colour");
    const buttonsWithPreviouslySameColour = document.querySelectorAll(`[colour="${previouslySelectedColour}"]`);
    if (!clickedAvatarBtn.classList.contains("selected-avatar") && !previouslySelectedBtn) {
        clickedAvatarBtn.classList.add("selected-avatar");
        toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, true);
    }
    else if (!clickedAvatarBtn.classList.contains("selected-avatar") && previouslySelectedBtn) {
        clickedAvatarBtn.classList.add("selected-avatar");
        toggleAvatarButtons(buttonsWithPreviouslySameColour, clickedAvatarBtn, false);
        toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, true);
    }
    else {
        clickedAvatarBtn.classList.remove("selected-avatar");
        toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, false);
    }
    document.querySelector(playerClass).style.backgroundImage = `url("images/avatars/${colour}.png")`;
};
const toggleDiceDisabling = (disable, handleClasses) => {
    const diceIClass = `.dice-${diceNumber}`;
    const diceElement = document.querySelector(diceIClass);
    if (handleClasses) {
        diceElement.classList.remove("d-none");
        diceElement.classList.add("d-block");
    }
    disable ? (diceElement.disabled = true) : (diceElement.disabled = false);
};
const toggleDice = async () => {
    const numbers = document.querySelectorAll(".dice-number");
    numbers.forEach((number) => {
        number.classList.add("d-none");
    });
    diceNumber = Math.floor(Math.random() * 6) + 1;
    toggleDiceDisabling(true, true);
    await run();
    if (document.querySelector(".winning-page").classList.contains("d-none")) {
        toggleDiceDisabling(false, false);
    }
};
const startGame = () => {
    toggleDiceDisabling(false, false);
    const avatarRows = document.querySelectorAll(".avatar-row");
    const avatarRowsWithoutSelected = [...avatarRows].filter((row) => !row.querySelector(".selected-avatar"));
    avatarRowsWithoutSelected.forEach((row) => {
        const buttons = row.querySelectorAll(".avatar-btn:not([disabled])");
        buttons.forEach((button) => button.click());
    });
    document.querySelector(".starting-page").classList.add("d-none");
    document.querySelector(".dice-1").disabled = false;
};
const changePlayer = () => {
    if (diceNumber != 6) {
        playersInGame.push(playersInGame.shift());
        goBack = false;
    }
};
const getMovingDirection = (playerLeft, playerBottom) => {
    if (goBack === true || (playerBottom === 90 && playerLeft === 0)) {
        goBack = true;
        return gameSettings.directions.right;
    }
    else if (playerLeft === 90 && playerBottom % 20 === 0) {
        return gameSettings.directions.up;
    }
    else if (playerLeft === 0 && playerBottom % 20 !== 0) {
        return gameSettings.directions.up;
    }
    else if (playerBottom % 20 !== 0) {
        return gameSettings.directions.left;
    }
    return gameSettings.directions.right;
};
const showWinner = () => {
    toggleDiceDisabling(true, false);
    document.querySelector(".winner-text").innerText = playersInGame[0].replace("-", " ");
    document.querySelector(".winning-page").classList.remove("d-none");
};
const checkLaddersSnakes = (map, positionKey, playingPlayer) => {
    const newPosition = map[positionKey];
    if (newPosition) {
        playingPlayer.style.left = newPosition.left;
        playingPlayer.style.bottom = newPosition.bottom;
    }
};
const checkPosition = (playingPlayer) => {
    const playerLeft = parseInt(playingPlayer.style.left);
    const playerBottom = parseInt(playingPlayer.style.bottom);
    const positionKey = `${playerLeft}-${playerBottom}`;
    if (playerLeft === 0 && playerBottom === 90) {
        showWinner();
    }
    checkLaddersSnakes(ladderMap, positionKey, playingPlayer);
    checkLaddersSnakes(snakeMap, positionKey, playingPlayer);
    changePlayer();
};
const run = async () => {
    const playingPlayer = document.querySelector(`.${playersInGame[0]}`);
    for (let i = 0; i < diceNumber; i++) {
        const currentLeft = parseInt(playingPlayer.style.left);
        const currentBottom = parseInt(playingPlayer.style.bottom);
        switch (getMovingDirection(currentLeft, currentBottom)) {
            case gameSettings.directions.right: {
                playingPlayer.style.left = `${currentLeft + 10}%`;
                break;
            }
            case gameSettings.directions.up: {
                playingPlayer.style.bottom = `${currentBottom + 10}%`;
                break;
            }
            case gameSettings.directions.left: {
                playingPlayer.style.left = `${currentLeft - 10}%`;
                break;
            }
        }
        await new Promise((resolve) => setTimeout(resolve, gameSettings.moveSpeed));
    }
    goBack = false;
    checkPosition(playingPlayer);
};
const sortPlayers = () => {
    playersInGame.sort((a, b) => {
        const numA = parseInt(a.split("-")[1]);
        const numB = parseInt(b.split("-")[1]);
        return numA - numB;
    });
};
const restartGame = () => {
    playersInGame.forEach((player) => {
        const playerElement = document.querySelector(`.${player}`);
        playerElement.style.bottom = "0%";
        playerElement.style.left = "0%";
    });
    document.querySelector(".starting-page").classList.remove("d-none");
    document.querySelector(".winning-page").classList.add("d-none");
    sortPlayers();
};
