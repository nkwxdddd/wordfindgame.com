// Selecting elements from the page (Variables)
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const KeyboardDIV = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".woodlander-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing variables 

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to reset game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "./assets/hangman-0.svg";
    guessesText.innerText = "${wrongGuessCount} / ${maxGuesses}";
    

    // Create the empty letter slots

    wordDisplay.innerHTML =  currentWord.split("").map(() => '<li class="letter"></li>').join("");

    // Enable keyboard buttons

    KeyboardDIV.querySelectorAll("button").forEach(btn => btn.disabled = false );

    // Hide the game modal

    gameModal.classList.remove("show");
}


   // function to get a random word and set up the game

const getRandomWord = () => {

  // Picking a random word and hint word form form you wordList array 

  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];

  // Set the current word and update the hint

  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;

  // Call reset game

  resetGame();
}

   // Function to handle the end of game win or loss 
const gameOver = (isVistory) => {

    // show the game over modal with details

    const modalText = isVistory ? 'You found the word:' : 'The correct word was: ';
    gameModal.querySelector("img").src = 'assets/${isVistory ? Victory: lost}.gif';
    gameModal.querySelector("h4").innerText = isVistory ? 'Congrats': 'Game Over!';
    gameModal.querySelector("p").innerText = '${modalText} <b>${currentWord}</b>';
    gameModal.classList.add("show");
}

   // Creating a for loop to display our keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    KeyboardDIV.appendChild(button);
    // adding a click event listener for each button
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

   // Function to handle the game logic when a letter is clicked

const initGame = (button, clickedLetter) => {

  // Checking if the clicked letter is in the currentWord

  if (currentWord.includes(clickedLetter)) {
    // Update the display letters if clicked is correct
    [...currentWord].forEach((letter, index) =>{
        if (letter === clickedLetter) {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guesses");
        }
    });
  } else {
    // Update wrong guess count and hangman is incorrect
    wrongGuessCount++;
    hangmanImage.src = 'assets/hangman-${wrongGuessCount}.svg';
  }
  // disabled the clicked button so it  can not be clicked again
  button.disabled = true;
  // Update the display guess count
  guessesText.innerText = '${wrongGuessCount} / ${maxGuesses}';
  // Check if the game should end based on win or lose conditions
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

  // Starting the game with Random word
getRandomWord();

 // Add event listener for the play again button 
playAgainBtn.addEventListener("click", getRandomWord);










  






    






function newFunction() {
  guessesText.innerText = '${wrongGuessCount} / ${maxGuesses}';
}

