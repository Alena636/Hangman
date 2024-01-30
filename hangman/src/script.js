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
  const letter = document.createElement('li');
  letter.className = 'letter';
  wordDisplay.append(letter);
  const hintText = document.createElement('h4');
  hintText.textContent = 'Hint: Lorem ipsum dolor sit amet';
  const guessesText = document.createElement('h4');
  guessesText.textContent = 'Incorrect guesses: 0 / 6';
  gameBox.append(wordDisplay, hintText, guessesText);
  hangmanBox.append(hangmanTitle);
  container.append(hangmanBox, gameBox);
  document.body.append(container);
}

createContainer();

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  const game = document.querySelector('.game-box');
  game.appendChild(keyboard);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < letters.length; i++) {
      const key = document.createElement('button');
      key.classList.add('key');
      key.textContent = letters[i];
      key.addEventListener('click', function() {
          handleKeyClick(letters[i]);
      });
      keyboard.appendChild(key);
  }
  function handleKeyClick(letter) {
    console.log('Нажата кнопка:', letter);
}
}

createKeyboard();