// Regular variables

let balance = 10;

let playerCards = [];
let dealerCards = [];

let sumOfPlayerCards = 0;
let sumOfDealerCards = 0;

let hasBlackjack = false;
let isAlive = false;

// Dom manipulation variables

const messageEl = document.getElementById('message-el');

const playerCardsEl = document.getElementById('player-cards-el');
const dealerCardsEl = document.getElementById('dealer-cards-el');

const playerSumEl = document.getElementById('player-sum-el');
const dealerSumEl = document.getElementById('dealer-sum-el');

const balanceEl = document.getElementById('balance-el');

// Functionality

balanceEl.textContent = `Balance: \$${balance}`;

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

function startGame() {
  isAlive = true;

  let playerFirstCard = getRandomCard();
  let playerSecondCard = getRandomCard();
  playerCards = [
    playerFirstCard, playerSecondCard
  ];

  let dealerFirstCard = getRandomCard();
  let dealerSecondCard = getRandomCard();
  dealerCards = [
    dealerFirstCard, dealerSecondCard
  ];

  sumOfPlayerCards = playerFirstCard + playerSecondCard;
  sumOfDealerCards = dealerFirstCard + dealerSecondCard;

  renderGame();
}

function renderGame() {
  playerCardsEl.textContent = 'Your cards: ';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardsEl.textContent += playerCards[i] + ' ';
  }

  dealerCardsEl.textContent = 'Dealer cards: ';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsEl.textContent += dealerCards[i] + ' ';
  }

  playerSumEl.textContent = `Your sum: ${sumOfPlayerCards}`;
  dealerSumEl.textContent = `Dealer sum: ${sumOfDealerCards}`;
}