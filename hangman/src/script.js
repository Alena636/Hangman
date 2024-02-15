function createContainer() {
  const container = document.createElement('div');
  container.className = 'container';
  const hangmanBox = document.createElement('div');
  hangmanBox.className = 'hangman-box';
  hangmanBox.innerHTML = '<img src="assets/hangman-0.svg" alt="hangmam-img" />';
  const hangmanTitle = document.createElement('h1');
  hangmanTitle.textContent = 'Hangman Game';
  const gameBox = document.createElement('div');
  gameBox.className = 'game-box';
  const wordDisplay = document.createElement('ul');
  wordDisplay.className = 'word-display';
  const hintText = document.createElement('h4');
  hintText.className = 'hint';
  hintText.innerHTML = 'Hint: <b>Lorem ipsum dolor sit amet</b>';
  const guessesText = document.createElement('h4');
  guessesText.className = 'guesses-text';
  guessesText.innerHTML = 'Incorrect guesses: <b>0 / 6</b>';
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  gameBox.append(wordDisplay, hintText, guessesText, keyboard);
  hangmanBox.append(hangmanTitle);
  container.append(hangmanBox, gameBox);
  document.body.append(container);
}

createContainer();

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = '<img src="assets/lost.gif" alt="gif" />';
  const modalTitle = document.createElement('h4');
  modalTitle.className = 'modal-title';
  const modalDescription = document.createElement('p');
  modalDescription.className = 'modal-description';
  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.className = 'play-again';
  btnPlayAgain.textContent = 'Play Again';
  content.append(modalTitle, modalDescription, btnPlayAgain);
  modal.append(content);
  document.body.append(modal);
}

createModal();

const wordDisplay = document.querySelector('.word-display');
let currentWord;
let wrongGuessCount;
const maxGuesses = 6;
const guessesText = document.querySelector('.guesses-text b');
const hangmanImg = document.querySelector('.hangman-box img');
let correctLetters;

const modal = document.querySelector('.modal');
const btnPlayAgain = document.querySelector('.play-again');
const keyboard = document.querySelector('.keyboard');

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  keyboard.querySelectorAll('button').forEach(btn => btn.disabled = false);
  hangmanImg.src = `assets/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
  modal.classList.remove('show');
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector('.hint b').textContent = hint;
  resetGame();
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    modal.querySelector('.modal-description').innerHTML = isVictory ? `You found the word: <b>${currentWord}</b>` : `The correct word is <b>${currentWord}</b>`;
    modal.querySelector('img').src = `assets/${isVictory ? 'victory' : 'lost'}.gif`;
    modal.querySelector('.modal-title').textContent = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
    modal.classList.add('show');
  }, 300);
}

const initGame = (button, clickedLetter) => {
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    wrongGuessCount++;
    hangmanImg.src = `assets/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

getRandomWord();

btnPlayAgain.addEventListener('click', getRandomWord);

function createKeyboard() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < letters.length; i++) {
      const key = document.createElement('button');
      key.classList.add('key');
      key.textContent = letters[i];
      key.addEventListener('click', e => initGame(e.target, letters[i]));
      keyboard.appendChild(key);
  }
}

createKeyboard();
