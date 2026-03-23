let current = "";
let scores = [];

const scoreBox = document.getElementById("score");
const totalBox = document.getElementById("total");
const minBox = document.getElementById("min");
const maxBox = document.getElementById("max");
const list = document.getElementById("list");

// 👉 Add number to score box
function addNumber(num) {
  current += num;
  scoreBox.innerText = current;
}

// 👉 ENTER button
function moveToTotal() {
  if (current === "") return;

  let value = Number(current);
  scores.push(value);

  current = "";
  scoreBox.innerText = "";

  updateUI();
}

// 👉 Update TOTAL, MIN, MAX and LIST
function updateUI() {
  if (scores.length === 0) {
    totalBox.innerText = "-";
    minBox.innerText = "-";
    maxBox.innerText = "-";
    list.innerHTML = "";
    return;
  }

  // TOTAL
  let total = scores.reduce((a, b) => a + b, 0);
  totalBox.innerText = total;

  // MIN & MAX
  minBox.innerText = Math.min(...scores);
  maxBox.innerText = Math.max(...scores);

  // LIST (Game 1, Game 2...)
  list.innerHTML = "";
  scores.forEach((score, index) => {
    let li = document.createElement("li");
    li.innerText = `Game ${index + 1} - ${score}`;
    list.appendChild(li);
  });
}

// 👉 REMOVE ALL
function removeAll() {
  scores = [];
  updateUI();
}

// 👉 REMOVE LAST
function backspace() {
  scores.pop();
  updateUI();
}

// 👉 REMOVE ODD (Game 1,3,5...)
document.getElementById("removeOdd").onclick = function () {
  scores = scores.filter((_, index) => (index + 1) % 2 === 0);
  updateUI();
};

// 👉 REMOVE EVEN (Game 2,4,6...)
document.getElementById("removeEven").onclick = function () {
  scores = scores.filter((_, index) => (index + 1) % 2 !== 0);
  updateUI();
};
