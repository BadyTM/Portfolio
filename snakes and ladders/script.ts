let playersInGame: string[] = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber: number = Math.floor(Math.random() * 6) + 1;
let m: number = 0;
const maxAmountOfPlayers: number = 4;
const moveSpeed: number = 400;
const directions = {
  up: "up",
  left: "left",
  right: "right",
};
//ok
const getPlayingPlayer = (): HTMLElement => document.getElementById(playersInGame[0]);
//ok
const togglePlayerVisibility = (playerId: string, showPlayer: boolean): void => {
  const player: HTMLElement = document.getElementById(playerId);
  const playerAvatar: HTMLElement = document.getElementById(playerId + "-avatar");
  showPlayer ? player.classList.remove("d-none") : player.classList.add("d-none");
  showPlayer ? playerAvatar.classList.remove("d-none") : playerAvatar.classList.add("d-none");
};
//ok
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
//ok
const setPlayerAvatar = (playerId: string, color: string): void => {
  document.getElementById(playerId).style.backgroundImage = `url('images/avatars/${color}.png')`;
};
//ok
const startGame = (): void => {
  document.getElementById("starting-page").classList.add("d-none");
};
//ok
const changePlayer = (): void => {
  if (diceNumber != 6) {
    playersInGame.push(playersInGame.shift());
    goBack = 0;
  }
};
//ok
let goBack: number = 0;
const getMovingDirection = (): string => {
  const player: HTMLElement = getPlayingPlayer();
  const playerLeft: number = parseInt(player.style.left);
  const playerBottom: number = parseInt(player.style.bottom);
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
//ok
const move = (direction: string): void => {
  const player = getPlayingPlayer();
  const currentLeft = parseInt(player.style.left);
  const currentBottom = parseInt(player.style.bottom);

  switch (direction) {
    case directions.right: {
      player.style.left = `${currentLeft + 10}%`;
      break;
    }
    case directions.up: {
      player.style.bottom = `${currentBottom + 10}%`;
      break;
    }
    case directions.left: {
      player.style.left = `${currentLeft - 10}%`;
      break;
    }
  }
};

const run = (): void => {
  const player = getPlayingPlayer();

  for (let i: number = 0; i < diceNumber; i++) {
    setTimeout(() => {
      move(getMovingDirection());
    }, moveSpeed * i);
  }
  setTimeout(() => {
    checkWin(player);
    checkLadders(player);
    checkSnakes(player);
    changePlayer();
  }, moveSpeed * diceNumber);
};
//ok
const checkWin = (playingPlayer: HTMLElement): void => {
  const playerLeft: number = parseInt(playingPlayer.style.left);
  const playerBottom: number = parseInt(playingPlayer.style.bottom);

  if (playerLeft === 0 && playerBottom === 90) {
    alert("You won!");
  }
};
//check this
const toggleDice = (): void => {
  const numbers = document.querySelectorAll<HTMLElement>(".dice-number");
  numbers.forEach((number) => number.classList.add("d-none"));
  
  diceNumber = Math.floor(Math.random() * 6) + 1;
  const diceString: string = diceNumber.toString();
  const diceID: string = `dice-${diceString}`;
  document.getElementById(diceID).classList.remove("d-none");
  document.getElementById(diceID).classList.add("d-block");
  run();
};
//ok
const checkLadders = (playingPlayer: HTMLElement): void => {
  setTimeout(() => {
    const playerLeft: string = playingPlayer.style.left;
    const playerBottom: string = playingPlayer.style.bottom;

    const ladderMap: Record<string, { left: string; bottom: string }> = {
      "10%-0%": { left: "0%", bottom: "40%" },
      "40%-10%": { left: "60%", bottom: "80%" },
      "90%-20%": { left: "80%", bottom: "60%" },
      "30%-30%": { left: "40%", bottom: "50%" },
      "10%-50%": { left: "20%", bottom: "80%" },
      "50%-70%": { left: "40%", bottom: "90%" },
      "60%-40%": { left: "60%", bottom: "60%" },
    };
    const key: string = `${playerLeft}-${playerBottom}`;
    const newPosition: { left: string; bottom: string } = ladderMap[key];

    if (newPosition) {
      playingPlayer.style.left = newPosition.left;
      playingPlayer.style.bottom = newPosition.bottom;
    }
  }, moveSpeed * diceNumber);
};
//ok
const checkSnakes = (playingPlayer: HTMLElement): void => {
  setTimeout(() => {
    const playerLeft: string = playingPlayer.style.left;
    const playerBottom: string = playingPlayer.style.bottom;

    const snakeMap: Record<string, { left: string; bottom: string }> = {
      "30%_10%": { left: "20%", bottom: "0%" },
      "70%_50%": { left: "70%", bottom: "10%" },
      "40%_70%": { left: "20%", bottom: "20%" },
      "20%_90%": { left: "20%", bottom: "40%" },
      "80%_90%": { left: "90%", bottom: "50%" },
      "0%_50%": { left: "20%", bottom: "30%" },
    };
    const key: string = `${playerLeft}_${playerBottom}`;
    const newPosition: { left: string; bottom: string } = snakeMap[key];

    if (newPosition) {
      playingPlayer.style.left = newPosition.left;
      playingPlayer.style.bottom = newPosition.bottom;
    }
  }, moveSpeed * diceNumber);
};
