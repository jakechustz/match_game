var gameCards = document.querySelector("#gameCards");
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var modalEl = document.querySelector("#modal");
var attempts = 0;
var gamesPlayed = 0;
var accuracyText = document.querySelector("#accuracyNum");
var attemptsText = document.querySelector("#attemptsNum");
var gamesPlayedText = document.querySelector("#gamesNum");
var modalButton = document.getElementById("modal-button");
var logoClasses = ["jan-pic", "vanjie-pic", "valentina-pic", "shangela-pic", "alyssa-pic", "aja-pic", "aiden-pic", "farrah-pic", "trixie-pic", "jan-pic", "vanjie-pic", "valentina-pic", "shangela-pic", "alyssa-pic", "aja-pic", "aiden-pic", "farrah-pic", "trixie-pic"];
var cardFrontEl = document.getElementsByClassName("card-front");
var cardBack = document.getElementsByClassName("card-back");


gameCards.addEventListener("click", handleClick);


function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.className += " hidden";
  if (!firstCardClicked) {
    firstCardClicked = event.target
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = event.target
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    gameCards.removeEventListener("click", handleClick);
    if (firstCardClasses === secondCardClasses) {
      firstCardClicked = null;
      secondCardClicked = null;
      gameCards.addEventListener("click", handleClick)
      matches++;
      attempts++;
      if (matches === maxMatches) {
        modalEl.classList.remove("hidden");
      }
      displayStats();
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        gameCards.addEventListener("click", handleClick);
      }, 1000)
      attempts++;
      displayStats();
    }
  }
}


function displayStats() {
  document.querySelector("#gamesNum").textContent = gamesPlayed;
  document.querySelector("#attemptsNum").textContent = attempts;
  document.querySelector("#accuracyNum").textContent = (calculateAccuracy(attempts, matches));
}

function calculateAccuracy(attempts, matches) {
  return Math.trunc((matches / attempts) * 100) + "%";
}



function resetGame() {
  attempts = 0;
  attemptsText.textContent = 0;
  matches = 0;
  accuracyText.textContent = 0;
  gamesPlayedText.textContent = gamesPlayed;
  gamesPlayed++;
  displayStats();
  resetCards();
  shuffleCards();
  modalEl.classList.add("hidden");
}

function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");
  for (var index = 0; index < hiddenCards.length; index++) {
    hiddenCards[index].classList.remove("hidden");
  }
}
modalButton.addEventListener("click", resetGame);


function shuffleCards() {
  for (let s = 0; s < logoClasses.length; s++) {
    var randomSpot = Math.floor(Math.random() * logoClasses.length);
    var finalSpot = logoClasses[s];
    logoClasses[s] = logoClasses[randomSpot];
    logoClasses[randomSpot] = finalSpot;
  }
  displayCards();
}

function displayCards() {
  for (let d = 0; d < cardFrontEl.length; d++) {
    cardFrontEl[d].className = "card-front " + logoClasses[d];
  }
}

function createCards() {
  for (var i = 0; i < logoClasses.length; i++) {
    var div = document.createElement("div");
    div.classList.add("card", "col-2");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front", logoClasses[i]);

    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    div.append(cardFront, cardBack);
    gameCards.append(div);
  }
}

window.addEventListener("load", load);
function load() {
  shuffleCards();
  createCards();
}
