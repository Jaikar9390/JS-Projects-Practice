let gameCount = 1;
let score = [];
let firstValue = null;

const scoreBox = document.getElementById("score");
const totalBox = document.getElementById("total");
const minBox = document.getElementById("min");
const maxBox = document.getElementById("max");
const list = document.getElementById("list");
const buttons = document.querySelectorAll(".keypad button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    scoreBox.innerText += btn.innerText;
  });
});

document.getElementById("enter").addEventListener("click", enter);

document.getElementById("removeAll").addEventListener("click", removeAll);
document.getElementById("removeOdd").addEventListener("click", removeOdd);
document.getElementById("removeEven").addEventListener("click", removeEven);
document.getElementById("removeLast").addEventListener("click", removeLast);

function enter() {
  let scoreText = scoreBox.innerText;
  if (scoreText === "") return;

  let value = Number(scoreText);

  if (firstValue === null) {
    firstValue = value;
    moveMin(value);
    moveMax(value);
    scoreBox.innerText = "";
    return;
  }

  let min = Math.min(firstValue, value);
  let max = Math.max(firstValue, value);

  moveMin(min);
  moveMax(max);

  let total = min + max;
  totalBox.innerText = total;
  score.push(total);

  let li = document.createElement("li");
  li.innerText = "Game " + gameCount + " - " + total;
  list.appendChild(li);

  gameCount++;

  firstValue = null;
  scoreBox.innerText = "";

  setTimeout(() => {
    minBox.innerText = "-";
    maxBox.innerText = "-";
    totalBox.innerText = "-";
  }, 3000);
}

function moveMin(value) {
  minBox.innerText = value;
}

function moveMax(value) {
  maxBox.innerText = value;
}

function updateUI() {
  list.innerHTML = "";

  for (let i = 0; i < score.length; i++) {
    let li = document.createElement("li");
    li.innerText = "Game " + (i + 1) + " - " + score[i];
    list.appendChild(li);
  }

  gameCount = score.length + 1;
}

function removeAll() {
  score = [];
  updateUI();
}

function removeLast() {
  score.pop();
  updateUI();
}

function removeOdd() {
  score = score.filter((_, index) => index % 2 !== 0);
  updateUI();
}

function removeEven() {
  score = score.filter((_, index) => index % 2 === 0);
  updateUI();
}
