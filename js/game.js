const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const movesDisplay = document.getElementById("moves");
const winnerDisplay = document.getElementById("winner");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const matchedDisplay = document.getElementById("matched");

let score = 0;

let matchedPairs = 0;

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let moves = 0;

let timer = 0;

let timerInterval = null;

let gameStarted = false;

let matchedCards = 0;
function restartGame() {
  clearInterval(timerInterval);

  gameBoard.innerHTML = "";

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  moves = 0;
  matchedCards = 0;

  timer = 0;
  gameStarted = false;

  score = 0;
  matchedPairs = 0;

  scoreDisplay.innerText = "0";
  matchedDisplay.innerText = "0 / 8";
  movesDisplay.innerText = "0";
  timerDisplay.innerText = "0s";
  winnerDisplay.innerHTML = "";

  createCards();
}

function createCards() {
  const shuffledCards = [...emojis];

  shuffle(shuffledCards);

  shuffledCards.forEach(function (emoji) {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `

            <div class="card-inner">


                <div class="card-front">
                    ❓
                </div>


                <div class="card-back">
                    ${emoji}
                </div>


            </div>

        `;

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

function startTimer() {
  if (gameStarted) return;

  gameStarted = true;

  timerInterval = setInterval(() => {
    timer++;

    timerDisplay.innerText = timer + "s";
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function flipCard() {
  startTimer();
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;

    return;
  }

  secondCard = this;

  moves++;

  movesDisplay.innerText = moves;

  checkMatch();
}

function checkMatch() {
  let isMatch =
    firstCard.querySelector(".card-back").innerText ===
    secondCard.querySelector(".card-back").innerText;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedCards += 2;
  matchedPairs++;

  score += 10;

  scoreDisplay.innerText = score;
  matchedDisplay.innerText = `${matchedPairs} / 8`;

  checkWin();

  resetBoard();
}

function checkWin() {
  if (matchedCards === emojis.length) {
    stopTimer();

    winnerDisplay.innerHTML = `

        <h2>🎉 Congratulations!</h2>

        <p>You matched all cards!</p>

        <p>🏆 Score: ${score}</p>

        <p>🎯 Moves: ${moves}</p>

        <p>⏱ Time: ${timer}s</p>

        `;
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");

    secondCard.classList.remove("flip");

    score = Math.max(0, score - 2);

    scoreDisplay.innerText = score;

    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;

  secondCard = null;

  lockBoard = false;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

restartBtn.addEventListener("click", restartGame);

createCards();
