'use script';

// select individual elements
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

const totalScore1 = document.getElementById('score--0');
const totalScore2 = document.getElementById('score--1');

const runScore1 = document.getElementById('run--0');
const runScore2 = document.getElementById('run--1');

// select buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// pick dice Element
const dice = document.querySelector('.dice');

let activePlayer, playing, totalScore, runScore;

// ------ Default state -----------

const init = function () {
  // player 1 by default
  activePlayer = 0;

  playing = true;

  // Total score
  totalScore = [0, 0];

  // run score
  runScore = 0;

  totalScore1.innerText = 0; // player 1
  totalScore2.innerText = 0; // player 2

  // initial runScore
  runScore1.innerText = 0; // player 1
  runScore2.innerText = 0; // player 2

  // initial totalScore
  totalScore[0] = 0; // player 1
  totalScore[1] = 0; // player 2

  // initial state of dice
  dice.classList.add('hidden');

  // remove winner class
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');

  // remove active class from player 2
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
};

// switch plyer function
const switchPlayer = () => {
  // return runscore to zero
  runScore = 0;
  document.getElementById(`run--${activePlayer}`).innerText = runScore;

  // switch to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// ------- initialize the default state -------

init();

//---------- ROLL THE DICE -------------

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    dice.classList.remove('hidden');
    dice.src = `img/dice-${diceRoll}.png`;

    // check for rolled 1
    if (diceRoll !== 1) {
      // Add diceRoll to run score
      runScore += diceRoll;
      document.getElementById(`run--${activePlayer}`).innerText = runScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// ------------ HOLD PLAY -------------

btnHold.addEventListener('click', function () {
  if (playing) {
    // add runScore to current totalScore
    totalScore[`${activePlayer}`] += runScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      totalScore[`${activePlayer}`];

    // check if player's total Score >= 100
    if (totalScore[`${activePlayer}`] >= 100) {
      // finish game if true
      playing = false;
      // set dice to hidden
      dice.classList.add('hidden');

      // add playerWinner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // remove the activeplayer class from the next active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // body background changes color
      document.querySelector('body').style.background = 'whitesmoke';
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// ----------- RELOAD GAME --------------

btnNew.addEventListener('click', init);
