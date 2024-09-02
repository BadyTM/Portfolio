/*Changing player every round*/
let playersInGame: string[] = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber: number = Math.floor(Math.random() * 6) + 1;
let m: number = 0;
let playerPlaying: string = playersInGame[m];
const maxAmountOfPlayers: number = 4;

const togglePlayerVisibility = (playerId: string, showPlayer: boolean): void => {
     const player: HTMLElement = document.getElementById(playerId);
     const playerAvatar: HTMLElement = document.getElementById(playerId + "-avatar");
     showPlayer ? player.classList.remove("d-none") : player.classList.add("d-none");
     showPlayer ? playerAvatar.classList.remove("d-none") : playerAvatar.classList.add("d-none");
}

const setAmountOfPlayers = (amount: number): void => {
  playersInGame = [];
  for (let i: number = 1; i <= maxAmountOfPlayers; i++) {
    const playerId: string = `player-${i}`;
    if (i <= amount) {
      playersInGame.push(playerId);
      togglePlayerVisibility(playerId, true);
    } else {
      togglePlayerVisibility(playerId, false);
    }
  }
};

/*player avatars*/
const setPlayerAvatar = (playerId: string, color: string): void => {
     document.getElementById(playerId).style.backgroundImage =
          "url('images/avatars/" + color + ".png')";
}

//start game
const startGame = (): void => {
     document.getElementById("starting-page").classList.add("d-none");
     playerPlaying = playersInGame[m];
}

const changePlayer = (): void => {
     setTimeout(function () {
          if ((diceNumber != 6) && (m < playersInGame.length - 1)) {
               m++;
               playerPlaying = playersInGame[m];
               goBack = 0;
          } else if ((diceNumber != 6) && (m >= playersInGame.length - 1)) {
               m = 0;
               playerPlaying = playersInGame[m];
               goBack = 0;
          } else {
               goBack = 0;
          }
     }, 400 * diceNumber);
}

/*moving*/
let goBack = 0;
const getDirection = (): void => {
     let direction;
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     if (goBack === 1) {
          direction = "right";
     } else if ((playerBottom === "90%") && (playerLeft === "0%")) {
          direction = "right";
          goBack = 1;
     } else if ((playerLeft === "90%") && (parseInt(playerBottom) % 20 === 0)) {
          direction = "up";
     } else if ((playerLeft === "0%") && (parseInt(playerBottom) % 20 != 0)) {
          direction = "up";
     } else if (parseInt(playerBottom) % 20 != 0) {
          direction = "left";
     } else if (parseInt(playerBottom) % 20 === 0) {
          direction = "right";
     } else {
          direction = "right";
     }
     return direction;
}

const move = (direction): void => {
     if (direction == "right") {
          document.getElementById(playerPlaying).style.left =
               parseInt(document.getElementById(playerPlaying).style.left) +
               10 +
               "%";
     } else if (direction == "up") {
          document.getElementById(playerPlaying).style.bottom =
               parseInt(document.getElementById(playerPlaying).style.bottom) +
               10 +
               "%";
     } else if (direction == "left") {
          document.getElementById(playerPlaying).style.left =
               parseInt(document.getElementById(playerPlaying).style.left) -
               10 +
               "%";
     }
}

const run = (): void => {
     for (let i = 0; i < diceNumber; i++) {
          runInterval(i);
     }
     setTimeout(function () {
          checkWin();
     }, 400 * diceNumber);
}

const runInterval = (i): void => {
     setTimeout(function () {
          let direction = getDirection();
          move(direction);
     }, 400 * i);
}
/*Dice with random number*/
const hideNumbers = (): void => {
     const numbers: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(".dice-number");
     for (let i = 0; i < numbers.length; i++) {
          numbers[i].classList.add("d-none");
     }
}
const checkWin = (): void => {
     let playerLeft = document.getElementById(playerPlaying).style.left;
     let playerBottom = document.getElementById(playerPlaying).style.bottom;
     console.log(playerLeft);
     console.log(playerBottom);
     if ((playerLeft === "0%") && (playerBottom === "90%")) {
          alert("you won");
     }
}
const showNumber = (): void => {
     hideNumbers();
     diceNumber = Math.floor(Math.random() * 6) + 1;
     let diceString = diceNumber.toString();
     let diceID = `dice-${diceString}`;
     document.getElementById(diceID).classList.remove("d-none");
     document.getElementById(diceID).classList.add("d-block");

     run();
     ladders();
     snakes();

     changePlayer();
}

/* Ladders */
const ladders = (): void => {
     setTimeout(function() {
          let playerLeft = document.getElementById(playerPlaying).style.left;
          let playerBottom = document.getElementById(playerPlaying).style
               .bottom;

          if ((playerLeft === "10%") && (playerBottom === "0%")) {
               let playerLeftNew = "0%";
               let playerBottomNew = "40%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "40%") && (playerBottom === "10%")) {
               let playerLeftNew = "60%";
               let playerBottomNew = "80%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "90%") && (playerBottom === "20%")) {
               let playerLeftNew = "80%";
               let playerBottomNew = "60%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "30%") && (playerBottom === "30%")) {
               let playerLeftNew = "40%";
               let playerBottomNew = "50%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "10%") && (playerBottom === "50%")) {
               let playerLeftNew = "20%";
               let playerBottomNew = "80%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "50%") && (playerBottom === "70%")) {
               let playerLeftNew = "40%";
               let playerBottomNew = "90%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "60%") && (playerBottom === "40%")) {
               let playerLeftNew = "60%";
               let playerBottomNew = "60%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          }
     }, 400 * diceNumber);
}
/*snakes*/
const snakes = (): void => {
     setTimeout(function(): void {
          let playerLeft = document.getElementById(playerPlaying).style.left;
          let playerBottom = document.getElementById(playerPlaying).style.bottom;

          if ((playerLeft === "30%") && (playerBottom === "10%")) {
               let playerLeftNew = "20%";
               let playerBottomNew = "0%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "70%") && (playerBottom === "50%")) {
               let playerLeftNew = "70%";
               let playerBottomNew = "10%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "40%") && (playerBottom === "70%")) {
               let playerLeftNew = "20%";
               let playerBottomNew = "20%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "20%") && (playerBottom === "90%")) {
               let playerLeftNew = "20%";
               let playerBottomNew = "40%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "80%") && (playerBottom === "90%")) {
               let playerLeftNew = "90%";
               let playerBottomNew = "50%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          } else if ((playerLeft === "0%") && (playerBottom === "50%")) {
               let playerLeftNew = "20%";
               let playerBottomNew = "30%";
               document.getElementById(
                    playerPlaying
               ).style.left = playerLeftNew;
               document.getElementById(
                    playerPlaying
               ).style.bottom = playerBottomNew;
          }
     }, 400 * diceNumber);
}
