const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const timeDisplay = document.getElementById("time");
const charCountDisplay = document.getElementById("char-count");
const accuracyDisplay = document.getElementById("accuracy");
const keys = document.querySelectorAll(".key");
const results = document.getElementById("results");

const wordPool = [
  "computer",
  "internet",
  "giraffe",
  "universe",
  "coffee",
  "mountain",
  "ocean",
  "friendship",
  "chocolate",
  "adventure",
  "satisfaction",
  "elephant",
  "imagination",
  "happiness",
  "inspiration",
  "determination",
  "creativity",
  "exercise",
  "family",
  "music",
  "sunshine",
  "bookstore",
  "photography",
  "garden",
  "courage",
  "whisper",
  "journey",
  "connection",
  "wonder",
  "gratitude",
];

let generatedText = "";
let totalTime = 60;
let interval;
let typedText = "";
function highlightKey(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (key) {
    key.classList.add("active");
  }
}

function removeHighlight(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (key) {
    key.classList.remove("active");
  }
}
document.addEventListener("keydown", (e) => {
  highlightKey(e.keyCode);
});

document.addEventListener("keyup", (e) => {
  removeHighlight(e.keyCode);
});
keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    const keyCode = e.target.getAttribute("data-key");
    const keyPressed = String.fromCharCode(keyCode).toLowerCase();
    textInput.value += keyPressed;
    highlightKey(keyCode);
    setTimeout(() => removeHighlight(keyCode), 100);
  });
});

function startTest() {
  generateRandomText();
  textInput.value = "";
  textInput.disabled = false;
  textInput.focus();
  startButton.style.display = "none";

  timeDisplay.textContent = totalTime;
  charCountDisplay.textContent = 0;
  timeDisplay.parentElement.style.display = "block";
  results.style.display = "none";
  interval = setInterval(updateTime, 1000);
  textInput.addEventListener("input", hideTextOnType);
}
function endTest() {
  clearInterval(interval);
  textInput.disabled = true;
  textInput.removeEventListener("input", hideTextOnType);

  const typedChars = countCharacters(textInput.value);
  const accuracy = calculateAccuracy(textInput.value);

  charCountDisplay.textContent = typedChars;
  accuracyDisplay.textContent = accuracy;
  timeDisplay.parentElement.style.display = "none";
  results.style.display = "block";
}
function generateRandomText() {
  generatedText = "";
  for (let i = 0; i < 20; i++) {
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    generatedText += randomWord + " ";
  }
  textDisplay.value = generatedText.trim();
}

function hideTextOnType() {
  if (textInput.value.length > 0) {
    textDisplay.value = generatedText.slice(textInput.value.length);
  }
}

function updateTime() {
  totalTime--;
  timeDisplay.textContent = totalTime;

  if (totalTime <= 0) {
    endTest();
  }
}

function countCharacters(inputText) {
  return inputText.replace(/\s/g, "").length;
}

function calculateAccuracy(inputText) {
  const totalChars = generatedText.length;
  let correctChars = 0;

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === generatedText[i]) {
      correctChars++;
    }
  }

  return Math.round((correctChars / totalChars) * 100);
}

startButton.addEventListener("click", startTest);
resetButton.addEventListener("click", () => window.location.reload());
