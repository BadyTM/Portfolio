/*Changing player every round*/
let playersInGame = ["player1", "player2", "player3", "player4"];
let diceNumber;
function onePlayer() {
    playersInGame = ["player1"];
    document.getElementById("player1").style.display = "block";
    document.getElementById("player2").style.display = "none";
    document.getElementById("player3").style.display = "none";
    document.getElementById("player4").style.display = "none";
    document.getElementById("player_2_avatar").style.display = "none";
    document.getElementById("player_3_avatar").style.display = "none";
    document.getElementById("player_4_avatar").style.display = "none";
}
function twoPlayers() {
    playersInGame = ["player1", "player2"];
    document.getElementById("player1").style.display = "block";
    document.getElementById("player2").style.display = "block";
    document.getElementById("player3").style.display = "none";
    document.getElementById("player4").style.display = "none";
    document.getElementById("player_2_avatar").style.display = "flex";
    document.getElementById("player_3_avatar").style.display = "none";
    document.getElementById("player_4_avatar").style.display = "none";
}
function threePlayers() {
    playersInGame = ["player1", "player2", "player3"];
    document.getElementById("player1").style.display = "block";
    document.getElementById("player2").style.display = "block";
    document.getElementById("player3").style.display = "block";
    document.getElementById("player4").style.display = "none";
    document.getElementById("player_2_avatar").style.display = "flex";
    document.getElementById("player_3_avatar").style.display = "flex";
    document.getElementById("player_4_avatar").style.display = "none";
}
function fourPlayers() {
    playersInGame = ["player1", "player2", "player3", "player4"];
    document.getElementById("player1").style.display = "block";
    document.getElementById("player2").style.display = "block";
    document.getElementById("player3").style.display = "block";
    document.getElementById("player4").style.display = "block";
    document.getElementById("player_2_avatar").style.display = "flex";
    document.getElementById("player_3_avatar").style.display = "flex";
    document.getElementById("player_4_avatar").style.display = "flex";
}
/*player avatars*/
function player1Avatar(color) {
    document.getElementById("player1").style.backgroundImage =
        "url('images/avatars/" + color + ".png')";
}
function player2Avatar(color) {
    document.getElementById("player2").style.backgroundImage =
        "url('images/avatars/" + color + ".png')";
}
function player3Avatar(color) {
    document.getElementById("player3").style.backgroundImage =
        "url('images/avatars/" + color + ".png')";
}
function player4Avatar(color) {
    document.getElementById("player4").style.backgroundImage =
        "url('images/avatars/" + color + ".png')";
}
//start game
function startGame() {
    document.getElementById("startingPage").style.display = "none";
    playerPlaying = playersInGame[m];
}
let m = 0;
let playerPlaying = playersInGame[m];
function changePlayer() {
    setTimeout(function () {
        if ((diceNumber != 6) && (m < playersInGame.length - 1)) {
            m++;
            playerPlaying = playersInGame[m];
            goBack = 0;
        }
        else if ((diceNumber != 6) && (m >= playersInGame.length - 1)) {
            m = 0;
            playerPlaying = playersInGame[m];
            goBack = 0;
        }
        else {
            goBack = 0;
        }
    }, 400 * diceNumber);
}
/*moving*/
let goBack = 0;
function getDirection() {
    let direction;
    let playerLeft = document.getElementById(playerPlaying).style.left;
    let playerBottom = document.getElementById(playerPlaying).style.bottom;
    if (goBack === 1) {
        direction = "right";
    }
    else if ((playerBottom === "90%") && (playerLeft === "0%")) {
        direction = "right";
        goBack = 1;
    }
    else if ((playerLeft === "90%") && (parseInt(playerBottom) % 20 === 0)) {
        direction = "up";
    }
    else if ((playerLeft === "0%") && (parseInt(playerBottom) % 20 != 0)) {
        direction = "up";
    }
    else if (parseInt(playerBottom) % 20 != 0) {
        direction = "left";
    }
    else if (parseInt(playerBottom) % 20 === 0) {
        direction = "right";
    }
    else {
        direction = "right";
    }
    return direction;
}
function move(direction) {
    if (direction == "right") {
        document.getElementById(playerPlaying).style.left =
            parseInt(document.getElementById(playerPlaying).style.left) +
                10 +
                "%";
    }
    else if (direction == "up") {
        document.getElementById(playerPlaying).style.bottom =
            parseInt(document.getElementById(playerPlaying).style.bottom) +
                10 +
                "%";
    }
    else if (direction == "left") {
        document.getElementById(playerPlaying).style.left =
            parseInt(document.getElementById(playerPlaying).style.left) -
                10 +
                "%";
    }
}
function run() {
    for (let i = 0; i < diceNumber; i++) {
        runInterval(i);
    }
    setTimeout(function () {
        checkWin();
    }, 400 * diceNumber);
}
function runInterval(i) {
    setTimeout(function () {
        let direction = getDirection();
        move(direction);
    }, 400 * i);
}
/*Dice with random number*/
function hideNumbers() {
    const numbers = document.querySelectorAll(".diceNumber");
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].style.display = "none";
    }
}
function checkWin() {
    let playerLeft = document.getElementById(playerPlaying).style.left;
    let playerBottom = document.getElementById(playerPlaying).style.bottom;
    console.log(playerLeft);
    console.log(playerBottom);
    if ((playerLeft === "0%") && (playerBottom === "90%")) {
        alert("you won");
    }
}
function showNumber() {
    hideNumbers();
    diceNumber = Math.floor(Math.random() * 6) + 1;
    let diceString = diceNumber.toString();
    let diceID = `dice${diceString}`;
    document.getElementById(diceID).style.display = "block";
    run();
    ladders();
    snakes();
    changePlayer();
}
/* Ladders */
function ladders() {
    setTimeout(function () {
        let playerLeft = document.getElementById(playerPlaying).style.left;
        let playerBottom = document.getElementById(playerPlaying).style
            .bottom;
        if ((playerLeft === "10%") && (playerBottom === "0%")) {
            let playerLeftNew = "0%";
            let playerBottomNew = "40%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "40%") && (playerBottom === "10%")) {
            let playerLeftNew = "60%";
            let playerBottomNew = "80%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "90%") && (playerBottom === "20%")) {
            let playerLeftNew = "80%";
            let playerBottomNew = "60%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "30%") && (playerBottom === "30%")) {
            let playerLeftNew = "40%";
            let playerBottomNew = "50%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "10%") && (playerBottom === "50%")) {
            let playerLeftNew = "20%";
            let playerBottomNew = "80%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "50%") && (playerBottom === "70%")) {
            let playerLeftNew = "40%";
            let playerBottomNew = "90%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "60%") && (playerBottom === "40%")) {
            let playerLeftNew = "60%";
            let playerBottomNew = "60%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
    }, 400 * diceNumber);
}
/*snakes*/
function snakes() {
    setTimeout(function () {
        let playerLeft = document.getElementById(playerPlaying).style.left;
        let playerBottom = document.getElementById(playerPlaying).style
            .bottom;
        if ((playerLeft === "30%") && (playerBottom === "10%")) {
            let playerLeftNew = "20%";
            let playerBottomNew = "0%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "70%") && (playerBottom === "50%")) {
            let playerLeftNew = "70%";
            let playerBottomNew = "10%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "40%") && (playerBottom === "70%")) {
            let playerLeftNew = "20%";
            let playerBottomNew = "20%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "20%") && (playerBottom === "90%")) {
            let playerLeftNew = "20%";
            let playerBottomNew = "40%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "80%") && (playerBottom === "90%")) {
            let playerLeftNew = "90%";
            let playerBottomNew = "50%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
        else if ((playerLeft === "0%") && (playerBottom === "50%")) {
            let playerLeftNew = "20%";
            let playerBottomNew = "30%";
            document.getElementById(playerPlaying).style.left = playerLeftNew;
            document.getElementById(playerPlaying).style.bottom = playerBottomNew;
        }
    }, 400 * diceNumber);
}
