const moles = [
  "mole.png"
];
let gameStarted = false;
let gameEnded = false;
let score = 0;
let timerInterval;
let timeLeft = 60;

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  gameEnded = false;
  score = 0;
  timeLeft = 60;
  updateScore();
  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      gameEnded = true;
      announceResult();
    }
  }, 1000);

  moveMole();
}

function moveMole() {
  if (!gameEnded) {
    const randomRow = Math.floor(Math.random() * 3);
    const randomCol = Math.floor(Math.random() * 3);
    const mole = document.createElement("img");
    mole.src = moles[Math.floor(Math.random() * moles.length)];
    mole.classList.add("mole");
    mole.addEventListener("click", () => catchMole(randomRow, randomCol));
    const cell = document.getElementsByClassName("cell")[randomRow * 3 + randomCol];
    cell.innerHTML = "";
    cell.appendChild(mole);

    setTimeout(() => {
      cell.innerHTML = "";
      if (!gameEnded) {
        moveMole();
      }
    }, 500);
  }
}

function catchMole(row, col) {
  if (gameStarted && !gameEnded) {
    const cell = document.getElementsByClassName("cell")[row * 3 + col];
    if (cell.innerHTML !== "") {
      cell.innerHTML = "";
      score++;
      updateScore();
    }
  }
}

function updateScore() {
  document.getElementById("result").innerHTML = `Поймано кротов: ${score}`;
}

function updateTimer() {
  const timerSpan = document.getElementById("timer");
  timerSpan.innerHTML = timeLeft;
}

function announceResult() {
  document.getElementById("result").innerHTML = `Время вышло! Поймано кротов: ${score}`;
  gameStarted = true;
}



function resetGame() {
  clearInterval(timerInterval);
  gameStarted = false;
  gameEnded = true;
  score = 0;
  timeLeft = 60;
  updateScore();
  updateTimer();

  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}






function toggleMusic() {
  const audio = document.getElementsByTagName("audio")[0];
  const musicButton = document.getElementById("music-button");
  if (audio.paused) {
    audio.play();
    musicButton.innerHTML = "Музыка: включена";
    musicButton.classList.add("on");
  } else {
    audio.pause();
    musicButton.innerHTML = "Музыка: выключена";
    musicButton.classList.remove("on");
  }
}
