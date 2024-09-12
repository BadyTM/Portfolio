let playersInGame: string[] = ["player-1", "player-2", "player-3", "player-4"];
let diceNumber: number = Math.floor(Math.random() * 6) + 1;
let goBack = 0;
const maxAmountOfPlayers = 4;
const moveSpeed = 400;
const availableColours = ["blue", "green", "yellow", "pink"];
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

const getPlayingPlayer = (): HTMLElement => document.querySelector(`.${playersInGame[0]}`) as HTMLElement;

const togglePlayerVisibility = (playerClass: string, showPlayer: boolean): void => {
  const player: HTMLElement = document.querySelector(`.${playerClass}`) as HTMLElement;
  const playerAvatar: HTMLElement = document.querySelector(`.${playerClass}-avatar`) as HTMLElement;
  player.classList.toggle("d-none", !showPlayer);
  playerAvatar.classList.toggle("d-none", !showPlayer);
};

const setAmountOfPlayers = (amount: number): void => {
  playersInGame = [];
  for (let i = 1; i <= maxAmountOfPlayers; i++) {
    const playerClass = `player-${i}`;
    if (i <= amount) {
      playersInGame.push(playerClass);
      togglePlayerVisibility(playerClass, true);
    } else {
      togglePlayerVisibility(playerClass, false);
    }
  }
  const avatarBtns = document.querySelectorAll(".avatar-btn");
  avatarBtns.forEach((button: HTMLButtonElement) => {
    button.disabled = false;
    button.classList.remove("selected-avatar");
  });
};

const setPlayerAvatar = (event: Event, playerClass: string, colour: string): void => {
  const clickedAvatarBtn = event.target as HTMLButtonElement;
  const parentRowElement: HTMLDivElement = clickedAvatarBtn.closest(".avatar-row");
  const buttonsWithSameColour = document.querySelectorAll<HTMLButtonElement>(`[colour="${colour}"]`);

  const previouslySelectedBtn = parentRowElement.querySelector<HTMLButtonElement>(".selected-avatar");
  const previouslySelectedColour = previouslySelectedBtn?.getAttribute("colour");
  const buttonsWithPreviouslySameColour = document.querySelectorAll<HTMLButtonElement>(`[colour="${previouslySelectedColour}"]`);

  if (!clickedAvatarBtn.classList.contains("selected-avatar") && !previouslySelectedBtn) {
    clickedAvatarBtn.classList.add("selected-avatar");
    toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, true);
  } else if (!clickedAvatarBtn.classList.contains("selected-avatar") && previouslySelectedBtn) {
    clickedAvatarBtn.classList.add("selected-avatar");
    toggleAvatarButtons(buttonsWithPreviouslySameColour, clickedAvatarBtn, false);
    toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, true);
  } else {
    clickedAvatarBtn.classList.remove("selected-avatar");
    toggleAvatarButtons(buttonsWithSameColour, clickedAvatarBtn, false);
  }

  (document.querySelector(playerClass) as HTMLElement).style.backgroundImage = `url('images/avatars/${colour}.png')`;
};

const toggleAvatarButtons = (buttons: NodeListOf<HTMLButtonElement>, clickedAvatarBtn: HTMLButtonElement, disable: boolean): void => {
  buttons.forEach((button: HTMLButtonElement) => {
    if (button !== clickedAvatarBtn) {
      button.disabled = disable;
      button.classList.remove("selected-avatar");
    }
  });
};

const startGame = (): void => {
    const avatarRows = document.querySelectorAll<HTMLElement>(".avatar-row");
    const avatarRowsWithoutSelected = [...avatarRows].filter(row => !row.querySelector(".selected-avatar"));

    avatarRowsWithoutSelected.forEach(row => {
      const buttons = row.querySelectorAll<HTMLButtonElement>('.avatar-btn:not([disabled])');
      buttons.forEach(button => button.click());
    });
    console.log(avatarRowsWithoutSelected);

    (document.querySelector(".starting-page") as HTMLElement).classList.add("d-none");
  (document.querySelector(".dice-1") as HTMLButtonElement).disabled = false;
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

const toggleDice = async (): Promise<void> => {
  const numbers = document.querySelectorAll<HTMLElement>(".dice-number");
  numbers.forEach((number) => {
    number.classList.add("d-none");
  });
  diceNumber = Math.floor(Math.random() * 6) + 1;
  const diceIClass = `.dice-${diceNumber}`;
  const diceElement = document.querySelector(diceIClass) as HTMLButtonElement;

  diceElement.disabled = true;
  diceElement.classList.remove("d-none");
  diceElement.classList.add("d-block");
  await run();
  diceElement.disabled = false;
};

const checkLaddersSnakes = (map: Record<string, { left: string; bottom: string }>, positionKey: string, playingPlayer: HTMLElement): void => {
  const newPosition = map[positionKey];
  if (newPosition) {
    playingPlayer.style.left = newPosition.left;
    playingPlayer.style.bottom = newPosition.bottom;
  }
};