/*
Game set up.

TOC:
- Set up some variables
- Start game
- Play sequence
- Add answer to user sequence and check
- Game over
- Output level
*/

// Set up some variables
var gameColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern, userPattern = [];
var userLevel = 0;
var inProgress = false;

// Start game, with the option to start at a specific level
function startGame() {
  // Hide intro and other divs, then begin game, if it's not in progress
  if (inProgress === false) {
    // Reset our variables
    userLevel = 0;
    inProgress = true;
    gamePattern = [];

    removeOverlays();
    document.querySelector('.container__quick-stats').classList.remove('container__quick-stats--hidden');
    // console.log('Simon says... game starting');
    playSequence();
  } else {
    // console.log('Game in progress, user level ' + userLevel)
  }
}

// Play sequence
function playSequence() {
  userPattern = [];

  // Random number between and including 0, 1, 2, 3
  let randomNumber = Math.floor(Math.random() * 4);
  // Get the colour from the array
  let randomColour = gameColours[randomNumber];

  // Add the colour to the pattern
  gamePattern.push(randomColour);

  // Output our pattern in console (for testing, not cheating!)
  // console.log(gamePattern);

  // Flash the square
  document.querySelectorAll('.simon-squares__item')[randomNumber].classList.add('simon-squares__item--highlight');

  // Increase the level
  userLevel += 1;
  updateGameLevelOutput();
  // console.log('Simon says... level ' + userLevel);

  // Remove the class
  setTimeout(function() {
    document.querySelectorAll('.simon-squares__item')[randomNumber].classList.remove('simon-squares__item--highlight');
  }, 500, randomNumber);
}

// Add answer to user sequence and check
function addAnswer(colour) {
  // If in progress, proceed, otherwise don't do anything
  if (inProgress === true) {
    userPattern.push(colour);
    checkAnswers(userPattern.length - 1);

    // In the event of the square being a repeat, remove and re-add
    if(document.querySelector('.simon-squares__item--' + colour).classList.contains('simon-squares__item--interacted')) {
      document.querySelector('.simon-squares__item--' + colour).classList.remove('simon-squares__item--interacted');
    }

    // Flash the square
    document.querySelector('.simon-squares__item--' + colour).classList.add('simon-squares__item--interacted');

    // Remove the class
    setTimeout(function () {
      document.querySelector('.simon-squares__item--' + colour).classList.remove('simon-squares__item--interacted');
    }, 250, colour);
  } else {
    console.log('Game not in progress');
  }
}

function checkAnswers(currentLevel) {
  let arrayIndex = currentLevel;

  // If the two colours for the current level match, proceed, else it's wrong
  if (userPattern[arrayIndex] == gamePattern[arrayIndex]) {
    // The user has complete current level, flash another square
    if(userPattern.length == gamePattern.length) {
      setTimeout(function() {
        playSequence();
      }, 1000)
    }
  } else {
    console.log('User clicked ' + userPattern[arrayIndex]);
    console.log('Game required ' + gamePattern[arrayIndex]);
    gameOver();
  }
}

// Game over
function gameOver() {
  document.querySelector('.container__overlay--game-over').classList.remove('container__overlay--hidden');
  document.querySelector('.container__quick-stats').classList.add('container__quick-stats--hidden');
  // Allow the game to be restarted
  inProgress = false;
}

function updateGameLevelOutput() {
  var divs = document.querySelectorAll('.container__game-level'), i;

  for (i = 0; i < divs.length; ++i) {
    divs[i].textContent = userLevel;
  }
}

function removeOverlays() {
  var divs = document.querySelectorAll('.container__overlay'), i;

  for (i = 0; i < divs.length; ++i) {
    divs[i].classList.add('container__overlay--hidden');
  }
}

/*
Game event handling.

TOC:
- Keyup event listeners
- Click event listeners
*/

// Keyup event listeners
document.body.onkeyup = function (event) {
  // Get the keycode
  // console.log(event.keyCode);

  // Do something
  switch (event.keyCode) {
    // Spacebar
    case 32:
      startGame();

      // Prevent default
      event.preventDefault();
      break;

    // Letter a
    case 65:
      addAnswer('green');

      // Prevent default
      event.preventDefault();
      break;

    // Letter d
    case 68:
      addAnswer('blue');

      // Prevent default
      event.preventDefault();
      break;

    // Letter w
    case 87:
      addAnswer('red');

      // Prevent default
      event.preventDefault();
      break;

    // Letter s
    case 83:
      addAnswer('yellow');

      // Prevent default
      event.preventDefault();
      break;
  }
}

// Click event listeners
document.body.onclick = function(event) {
  // Get the target
  // console.log(event.target.classList);

  // Do something
  switch(event.target.classList.value) {
    // Start button
    case 'button button--start':
      startGame();
      break;

    // Square
    case 'simon-squares__item simon-squares__item--red':
      addAnswer('red');
      break;

    // Square
    case 'simon-squares__item simon-squares__item--blue':
      addAnswer('blue');
      break;

    // Square
    case 'simon-squares__item simon-squares__item--green':
      addAnswer('green');
      break;

    // Square
    case 'simon-squares__item simon-squares__item--yellow':
      addAnswer('yellow');
      break;
  }
}
