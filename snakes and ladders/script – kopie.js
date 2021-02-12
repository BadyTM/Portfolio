/*Changing player every round*/
let playersInGame = ["player1", "player2", "player3", "player4"];
let m = 0;
let playerPlaying = playersInGame[m];

function changePlayer() {
     if ((diceNumber != 6) & (m < playersInGame.length - 1)) {
          m++;
          playerPlaying = playersInGame[m];
     } else if ((diceNumber != 6) & (m >= playersInGame.length - 1)) {
          m = 0;
          playerPlaying = playersInGame[m];
     }
}

/*Moving figurine mechanism*/
function moveRight() {
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerLeftNew = parseInt(playerLeft) + 10 + "%";
     document.getElementById(playerPlaying).style.left = playerLeftNew;
}

function moveLeft() {
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerLeftNew = parseInt(playerLeft) - 10 + "%";
     document.getElementById(playerPlaying).style.left = playerLeftNew;
}

function moveUp() {
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     let playerBottomNew = parseInt(playerBottom) + 10 + "%";
     document.getElementById(playerPlaying).style.bottom = playerBottomNew;
}

function moveDown() {
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     let playerBottomNew = parseInt(playerBottom) - 10 + "%";
     document.getElementById(playerPlaying).style.bottom = playerBottomNew;
}

/*Connecting dice to moving*/

function moveFigurine() {
     var i = 0;

     for (i = 0; i < diceNumber; i++) {
          let playerLeft = document.getElementById(playerPlaying).style.left;
          let playerBottom = document.getElementById(playerPlaying).style
               .bottom;
          if ((playerLeft === "0%") & (playerBottom === "90%")) {
               alert("You Won!");
               break;
          } else if (
               (playerLeft === "90%") &
               (parseInt(playerBottom) % 20 === 0)
          ) {
               moveUp();
          } else if (
               (playerLeft === "0%") &
               (parseInt(playerBottom) % 20 != 0)
          ) {
               moveUp();
          } else if (parseInt(playerBottom) % 20 != 0) {
               moveLeft();
          } else if (parseInt(playerBottom) % 20 === 0) {
               moveRight();
          } else {
               moveRight();
          }
     }
}

/*Dice with random number*/
function hideNumbers() {
     const numbers = document.getElementsByClassName("diceNumber");
     for (var i = 0; i < numbers.length; i++) {
          numbers[i].style.display = "none";
     }
}

function showNumber() {
     hideNumbers();
     diceNumber = Math.floor(Math.random() * 6) + 1;
     let diceString = diceNumber.toString();
     let diceID = `dice${diceString}`;
     document.getElementById(diceID).style.display = "block";
     console.log(playerPlaying);
     moveFigurine();
     ladders();
     snakes();
     changePlayer();
}

/* Ladders */
function ladders() {
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     console.log(playerLeft);
     console.log(playerBottom);
     if ((playerLeft === "10%") & (playerBottom === "0%")) {
          let playerLeftNew = "0%";
          let playerBottomNew = "40%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "40%") & (playerBottom === "10%")) {
          let playerLeftNew = "60%";
          let playerBottomNew = "80%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "90%") & (playerBottom === "20%")) {
          let playerLeftNew = "80%";
          let playerBottomNew = "60%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "30%") & (playerBottom === "30%")) {
          let playerLeftNew = "40%";
          let playerBottomNew = "50%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "10%") & (playerBottom === "50%")) {
          let playerLeftNew = "20%";
          let playerBottomNew = "80%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     }
}
function snakes() {
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     console.log(playerLeft);
     console.log(playerBottom);
     if ((playerLeft === "30%") & (playerBottom === "10%")) {
          let playerLeftNew = "20%";
          let playerBottomNew = "0%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "70%") & (playerBottom === "50%")) {
          let playerLeftNew = "70%";
          let playerBottomNew = "10%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "40%") & (playerBottom === "70%")) {
          let playerLeftNew = "20%";
          let playerBottomNew = "20%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     } else if ((playerLeft === "20%") & (playerBottom === "90%")) {
          let playerLeftNew = "20%";
          let playerBottomNew = "40%";
          document.getElementById(playerPlaying).style.left = playerLeftNew;
          document.getElementById(playerPlaying).style.bottom = playerBottomNew;
     }
}
