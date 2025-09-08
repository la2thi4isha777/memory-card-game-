const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");
const movesCounter = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");

const icons = ["🍎", "🍌", "🍇", "🍒", "🥝", "🍉", "🍋", "🍑"];
let cards = [...icons, ...icons]; // duplicate to make pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = "";
  cards = shuffle(cards);
  cards.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${icon}</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesCounter.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.icon === card2.dataset.icon) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      clearInterval(timerInterval);
      setTimeout(() => alert(`🎉 You Win! Moves: ${moves}, Time: ${timer}s`), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);
}

function restartGame() {
  flippedCards = [];
  matchedCards = [];
  moves = 0;
  timer = 0;
  gameStarted = false;
  movesCounter.textContent = "Moves: 0";
  timerDisplay.textContent = "Time: 0s";
  clearInterval(timerInterval);
  createBoard();
}

restartBtn.addEventListener("click", restartGame);

// Initialize game
createBoard();
