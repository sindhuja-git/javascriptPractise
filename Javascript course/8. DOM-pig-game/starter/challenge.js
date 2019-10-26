/*

1. How to create our fundamental game variables
2. How to generate a random number
3. How to manipulate the DOM
4. How to read from the DOM
5. How to change the styles.


GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, dice, gamePlaying, prevDice;
var diceSelection = document.querySelector(".dice");
var diceSelection1 = document.querySelector(".dice1");
var winningScore = document.getElementById("winningScore").value;
init();
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  prevDice = 0;
  gamePlaying = true;
  diceSelection.style.display = "none";
  diceSelection1.style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceSelection.style.display = "none";
  diceSelection1.style.display = "none";
}
function buttonRoll() {
  console.log("prevDice", prevDice);
  if (gamePlaying) {
    //random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //display result
    var dice = dice1 + dice2;

    diceSelection.style.display = "block";
    diceSelection.src = "dice-" + dice1 + ".png";
    diceSelection1.style.display = "block";
    diceSelection1.src = "dice-" + dice2 + ".png";
    console.log("dice", dice);
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
}
function holdValues() {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Display in UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    console.log("winningscore", winningScore);
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      diceSelection.style.display = "none";
      diceSelection1.style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }

  //Check who wins
}

document.querySelector(".btn-roll").addEventListener("click", buttonRoll);
document.querySelector(".btn-hold").addEventListener("click", holdValues);
document.querySelector(".btn-new").addEventListener("click", init);
console.log("challenge");

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)



2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
