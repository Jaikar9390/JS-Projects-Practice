function addNumber(scoreBox) {
  document.getElementById("score").innerText += scoreBox;
}

let gameCount = 1;
let score = [];
let firstValue = null; // store first number

function enter() {
  let scoreText = document.getElementById("score").innerText;
  if (scoreText === "") return;

  let value = Number(scoreText);

  //  FIRST ENTRY
  if (firstValue === null) {
    firstValue = value;

    moveMin(value);
    moveMax(value);

    document.getElementById("score").innerText = "";
    return;
  }

  //  SECOND ENTRY
  let min = Math.min(firstValue, value);
  let max = Math.max(firstValue, value);

  moveMin(min);
  moveMax(max);

  let total = min + max;
  document.getElementById("total").innerText = total;
  score.push(total);

  let li = document.createElement("li");
  li.innerText = "Game " + gameCount + " - " + total;
  document.getElementById("list").appendChild(li);

  gameCount++;

  // RESET FOR NEXT GAME
  firstValue = null;
  document.getElementById("score").innerText = "";

  setTimeout(() => {
    document.getElementById("min").innerText = "-";
    document.getElementById("max").innerText = "-";
    document.getElementById("total").innerText = "-";
  }, 3000);
}

function moveMin(value) {
  document.getElementById("min").innerText = value;
}

function moveMax(value) {
  document.getElementById("max").innerText = value;
}

function updateUI() {
  let list = document.getElementById("list");
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
