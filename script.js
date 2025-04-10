const computerImg = document.querySelector(".computer img");
const playerImg = document.querySelector(".player img");
const computerPoints = document.querySelector(".computerPoints");
const playerPoints = document.querySelector(".playerPoints");
const message = document.querySelector(".message");
const buttons = document.querySelectorAll("button");

const options = ["stone", "paper", "scissors"];
let cScore = 0;
let pScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.textContent.toLowerCase();

    // Disable buttons during sequence
    buttons.forEach(btn => btn.disabled = true);

    // Start shaking hands immediately with countdown
    playerImg.classList.add("shake");
    computerImg.classList.add("shake");

    // Countdown display
    let countdown = ["3", "2", "1", "SHOOT!"];
    let i = 0;
    message.textContent = countdown[i];

    let interval = setInterval(() => {
      i++;
      if (i < countdown.length) {
        message.textContent = countdown[i];
      } else {
        clearInterval(interval);

        // Stop shaking
        playerImg.classList.remove("shake");
        computerImg.classList.remove("shake");

        // Generate choices
        const computerChoice = options[Math.floor(Math.random() * 3)];
        playerImg.src = `player img/${playerChoice}.png`;
        computerImg.src = `computer img/${computerChoice}.png`;

        // Determine winner
        const winner = getWinner(playerChoice, computerChoice);
        if (winner === "player") {
          pScore++;
          message.textContent = "YOU WIN!";
        } else if (winner === "computer") {
          cScore++;
          message.textContent = "COMPUTER WINS!";
        } else {
          message.textContent = "IT'S A TIE!";
        }

        playerPoints.textContent = pScore;
        computerPoints.textContent = cScore;

        // Re-enable buttons
        buttons.forEach(btn => btn.disabled = false);
      }
    }, 500); // 0.5s between each count
  });
});

function getWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "stone" && computer === "scissors") ||
    (player === "paper" && computer === "stone") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}
