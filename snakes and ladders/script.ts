let playersInGame: string[] = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber: number = Math.floor(Math.random() * 6) + 1;
let goBack = 0;
const maxAmountOfPlayers = 4;
const moveSpeed = 400;
const directions = {
  up: "up",
  left: "left",
  right: "right",
};
const ladderMap: Record<string, { left: string; bottom: string }> = {
  "10-0": { left: "0%", bottom: "40%" },
  "40-10": { left: "60%", bottom: "80%" },
  "90-20": { left: "80%", bottom: "60%" },
  "30-30": { left: "40%", bottom: "50%" },
  "10-50": { left: "20%", bottom: "80%" },
  "50-70": { left: "40%", bottom: "90%" },
  "60-40": { left: "60%", bottom: "60%" },
};
const snakeMap: Record<string, { left: string; bottom: string }> = {
  "30-10": { left: "20%", bottom: "0%" },
  "70-50": { left: "70%", bottom: "10%" },
  "40-70": { left: "20%", bottom: "20%" },
  "20-90": { left: "20%", bottom: "40%" },
  "80-90": { left: "90%", bottom: "50%" },
  "0-50": { left: "20%", bottom: "30%" },
};

const getPlayingPlayer = (): HTMLElement => document.getElementById(playersInGame[0]) as HTMLElement;

const togglePlayerVisibility = (playerId: string, showPlayer: boolean): void => {
  const player: HTMLElement = document.getElementById(playerId) as HTMLElement;
  const playerAvatar: HTMLElement = document.getElementById(playerId + "-avatar") as HTMLElement;
  player.classList.toggle("d-none", !showPlayer);
  playerAvatar.classList.toggle("d-none", !showPlayer);
};

const setAmountOfPlayers = (amount: number): void => {
  playersInGame = [];
  for (let i = 1; i <= maxAmountOfPlayers; i++) {
    const playerId = `player-${i}`;
    if (i <= amount) {
      playersInGame.push(playerId);
      togglePlayerVisibility(playerId, true);
    } else {
      togglePlayerVisibility(playerId, false);
    }
  }
};

const setPlayerAvatar = (playerId: string, color: string): void => {
  (document.getElementById(playerId) as HTMLElement).style.backgroundImage = `url('images/avatars/${color}.png')`;
};

const startGame = (): void => {
  (document.getElementById("starting-page") as HTMLElement).classList.add("d-none");
};

const changePlayer = (): void => {
  if (diceNumber != 6) {
    playersInGame.push(playersInGame.shift() as string);
    goBack = 0;
  }
};

const getMovingDirection = (playerLeft: number, playerBottom: number): string => {
  if (goBack === 1 || (playerBottom === 90 && playerLeft === 0)) {
    goBack = 1;
    return directions.right;
  } else if (playerLeft === 90 && playerBottom % 20 === 0) {
    return directions.up;
  } else if (playerLeft === 0 && playerBottom % 20 !== 0) {
    return directions.up;
  } else if (playerBottom % 20 !== 0) {
    return directions.left;
  }
  return directions.right;
};

const run = async (): Promise<void> => {
  const playingPlayer = getPlayingPlayer();

  for (let i = 0; i < diceNumber; i++) {
    const currentLeft: number = parseInt(playingPlayer.style.left);
    const currentBottom: number = parseInt(playingPlayer.style.bottom);
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
    await new Promise((resolve) => setTimeout(resolve, moveSpeed));
  }
  checkPosition(playingPlayer);
};

const checkPosition = (playingPlayer: HTMLElement): void => {
  const playerLeft: number = parseInt(playingPlayer.style.left);
  const playerBottom: number = parseInt(playingPlayer.style.bottom);
  const positionKey = `${playerLeft}-${playerBottom}`;
  if (playerLeft === 0 && playerBottom === 90) {
    alert("You won!");
  }
  checkLaddersSnakes(ladderMap, positionKey, playingPlayer);
  checkLaddersSnakes(snakeMap, positionKey, playingPlayer);
  changePlayer();
};

const toggleDice = (): void => {
  const numbers = document.querySelectorAll<HTMLElement>(".dice-number");
  numbers.forEach((number) => {
    number.classList.add("d-none");
  });
  diceNumber = Math.floor(Math.random() * 6) + 1;
  const diceID = `dice-${diceNumber}`;
  const diceElement = document.getElementById(diceID) as HTMLElement;

  diceElement.classList.remove("d-none");
  diceElement.classList.add("d-block");
  run();
};

const checkLaddersSnakes = (map: Record<string, { left: string; bottom: string }>, positionKey: string, playingPlayer: HTMLElement): void => {
  const newPosition = map[positionKey];
  if (newPosition) {
    playingPlayer.style.left = newPosition.left;
    playingPlayer.style.bottom = newPosition.bottom;
  }
};