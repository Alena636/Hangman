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
  gameBox.append(wordDisplay, hintText, guessesText);
  hangmanBox.append(hangmanTitle);
  container.append(hangmanBox, gameBox);
  document.body.append(container);
}

createContainer();

const wordDisplay = document.querySelector('.word-display');
let currentWord;
let wrongGuessCount = 0;
const maxGuesses = 6;
const guessesText = document.querySelector('.guesses-text b');

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector('.hint b').textContent = hint;
  wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join('');
}

const initGame = (button, clickedLetter) => {
  if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clickedLetter) {
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    wrongGuessCount++;
  }
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

getRandomWord();

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  const game = document.querySelector('.game-box');
  game.appendChild(keyboard);
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

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = '<img src="assets/lost.gif" alt="gif" />';
  const modalTitle = document.createElement('h4');
  modalTitle.textContent = 'Game Over!';
  modalTitle.className = 'modal-title';
  const modalDescription = document.createElement('p');
  modalDescription.textContent = 'The correct word is: qwerty';
  modalDescription.className = 'modal-description';
  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.className = 'play-again';
  btnPlayAgain.textContent = 'Play Again';
  content.append(modalTitle, modalDescription, btnPlayAgain);
  modal.append(content);
  document.body.append(modal);
}

createModal();
