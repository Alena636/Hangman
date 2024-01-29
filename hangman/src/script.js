function createContainer() {
  const container = document.createElement('div');
  container.className = 'container';
  const hangmanBox = document.createElement('div');
  hangmanBox.className = 'hangman-box';
  hangmanBox.innerHTML = '<img src="assets/hangman-0.svg" alt="hangmam-img" />';
  const hangmanTitle = document.createElement('h1');
  hangmanTitle.textContent = 'Hangman Game';
  hangmanBox.append(hangmanTitle);
  container.append(hangmanBox);
  document.body.append(container);
}

createContainer();