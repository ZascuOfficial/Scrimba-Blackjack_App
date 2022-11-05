let playerCards = [];
let playerSum = 0;
let dealerCards = [];
let dealerSum = 0;

let bet = 0;
let balance = 10;

let isAlive = false;
let hasBlackjack = false;

const messageEl = document.getElementById('message-el');

const playerCardsEl = document.getElementById('player-cards-el');
const playerSumEl = document.getElementById('player-sum-el');
const dealerCardsEl = document.getElementById('dealer-cards-el');
const dealerSumEl = document.getElementById('dealer-sum-el');

const betEl = document.getElementById('bet-el');
const balanceEl = document.getElementById('balance-el');

function startGame() {
  if (balance != 0) {
    isAlive = true;
    hasBlackjack = false;
  
    let playerFirstCard = getRandomCard(),
      playerSecondCard = getRandomCard();
    
    let dealerFirstCard = getRandomCard(),
      dealerSecondCard = getRandomCard();
    
    playerCards = [playerFirstCard, playerSecondCard];
    dealerCards = [dealerFirstCard, dealerSecondCard];
  
    playerSum = playerFirstCard + playerSecondCard;
    dealerSum = dealerFirstCard + dealerSecondCard;
  
    renderGame();
  } else {
    bet = 0;
    balance = 0;
    playerCards = [];
    dealerCards = [];
    playerSum = 0;
    dealerSum = 0;
    
    renderGame();

    messageEl.textContent = 'You ran outta money. Scram!';
    messageEl.style.color = '#EF8677';
  }
}

function renderGame() {
  betEl.textContent = `Your Bet: \$${bet}`;
  balanceEl.textContent = `Your Balance: \$${balance}`;

  displayPlayer();
  displayDealer();
}

function getRandomCard() {
  let randomNumber = Math.floor(
    Math.random() * 13 
  ) + 1;

  if (randomNumber > 10)
    return 10;
  if (randomNumber === 1)
    return 11;
  
  return randomNumber;
}

function newCard() {
  if (isAlive && !hasBlackjack) {
    let newCard = getRandomCard();

    playerSum += newCard;

    playerCards.push(newCard);

    renderGame();
  }
}

function withdraw() {
  isAlive = false;

  while (dealerSum <= 17) {
    let newCard = getRandomCard();
    
    dealerCards.push(newCard);

    dealerSum += newCard;

    renderGame();
  }

  let message = '';

  if (dealerSum < playerSum) {
    message = 'You win, sherif!';
    balance += bet * 2;
    bet = 0;
  } else if (dealerSum === playerSum) {
    message = 'Tie...';
    balance = bet;
    bet = 0;
  } else if (dealerSum > playerSum && !(dealerSum > 21)) {
    message = 'The house wins!';
    bet = 0;
  } else if (dealerSum > 21) {
    message = 'You win, sheriff!';
    balance += bet * 2;
    bet = 0;
  }

  messageEl.textContent = message;
}

function betAmount(amount) {
  if (balance > 0) {
    bet += amount;
    balance -= amount;
  }

  renderGame();
}

function displayPlayer() {
  playerCardsEl.textContent = 'Your cards: ';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardsEl.textContent += playerCards[i] + ' ';
  }

  playerSumEl.textContent = `Your sum: ${playerSum}`;

  let message = '';

  if (playerSum < 21)
    message = 'Do you wish to draw another card?';
  else if (playerSum === 21) {
    message = 'You got blackjack, partner!';

    hasBlackjack = true;

    balance += bet * 2.5;
    bet = 0;
  } else {
    message = 'You\'re out of the game, pal.';

    isAlive = false;

    bet = 0;
  }

  messageEl.textContent = message;
}

function displayDealer() {
  dealerCardsEl.textContent = 'Dealer cards: ';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += dealerCards[i] + ' ';
  }

  dealerSumEl.textContent = `Dealer sum: ${dealerSum}`;

  if (dealerSum === 21) {
    let message = 'The house wins!';

    messageEl.textContent = message;

    isAlive = false;

    bet = 0;
  }
}