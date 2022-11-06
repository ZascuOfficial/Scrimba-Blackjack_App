let player = {
  balance: 10,
  bet: 0,

  cards: [],
  firstCard: 0,
  secondCard: 0,
  sum: 0,

  isAlive: false,
  hasBlackjack: false,

  displayCards: () => {
  
    playerCardsEl.textContent = 'Your cards: ';

    for (let i = 0; i < player.cards.length; i++) {
      playerCardsEl.textContent += player.cards[i] + ' ';
    }

    playerSumEl.textContent = `Your sum: ${player.sum}`;

  },

  checkCards: () => {

    if (player.sum < 21) {
      message = 'Do you wish to draw another card?';
    } else if (player.sum === 21 && dealer.sum !== player.sum) {
      message = 'You got blackjack, partner!';
    } else {
      player.isAlive = false;

      message = 'You\'re out of the game, pal.';
    }

  }
};

let dealer = {
  cards: [],
  firstCard: 0,
  secondCard: 0,
  sum: 0,

  displayCards: () => {

    dealerCardsEl.textContent = 'Dealer cards: ';

    for (let i = 0; i < dealer.cards.length; i++) {
      dealerCardsEl.textContent += dealer.cards[i] + ' ';
    }

    dealerSumEl.textContent = `Dealer sum: ${dealer.sum}`;

  }
};

const betEl = document.getElementById('bet-el');
const balanceEl = document.getElementById('balance-el');

const playerCardsEl = document.getElementById('player-cards-el');
const dealerCardsEl = document.getElementById('dealer-cards-el');

const playerSumEl = document.getElementById('player-sum-el');
const dealerSumEl = document.getElementById('dealer-sum-el');

let message = '';
const messageEl = document.getElementById('message-el');

function startGame() {
  if (player.balance > 0) {
    messageEl.style.color = '#F8F9FA';

    player.isAlive = true;
    player.hasBlackjack = false;

    initializeCards();

    renderGame();
  } else {
    player.firstCard = 0, player.secondCard = 0, player.sum = 0,
      dealer.firstCard = 0, dealer.secondCard = 0, dealer.sum = 0,
      player.cards = [], dealer.cards = [];
    
    message = 'You ran outta money. Scram!';

    messageEl.textContent = message;
    messageEl.style.color = '#EF8677';
  }
}

function renderGame() {
  betEl.textContent = `Your Bet: \$${player.bet}`;
  balanceEl.textContent = `Your Balance: \$${player.balance}`;

  player.displayCards();
  dealer.displayCards();

  player.checkCards();

  messageEl.textContent = message;
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
  if (player.isAlive && !player.hasBlackjack) {
    let newCard = getRandomCard();

    player.sum += newCard;

    player.cards.push(newCard);

    renderGame();
  }
}

function withdraw() {
  isAlive = false;

  while (dealer.sum <= 17) {
    let newCard = getRandomCard();
    
    dealer.cards.push(newCard);

    dealer.sum += newCard;

    renderGame();
  }

  compareSums();
}

function betAmount(amount) {
  if (player.balance > 0 && amount <= player.balance) {
    player.bet += amount;
    player.balance -= amount;
  }

  renderGame();
}


function initializeCards() {
  player.firstCard = getRandomCard();
  player.secondCard = getRandomCard();
  player.cards = [player.firstCard, player.secondCard];

  player.sum = player.firstCard + player.secondCard;

  dealer.firstCard = getRandomCard();
  dealer.secondCard = getRandomCard();
  dealer.cards = [dealer.firstCard, dealer.secondCard];

  dealer.sum = dealer.firstCard + dealer.secondCard;
}

function compareSums() {
  if (dealer.sum === 21) {
    player.isAlive = false;

    message = 'The house got blackjack!';

    messageEl.textContent = message;

    setBalAndBet(player.balance, 0);

    return;
  }

  if (player.sum < dealer.sum && !dealer.sum > 21) {

    player.isAlive = false;

    message = 'You\'re out of the game, pal';

    setBalAndBet(player.balance, 0);

  } else if (player.sum === dealer.sum) {

    message = 'It\'s a tie!';
    
    setBalAndBet(player.balance, 0);  

  } else if (dealer.sum > player.sum) {

    if (dealer.sum > 21) {
      message = 'You win, sheriff!';

      setBalAndBet(player.balance + player.bet * 2, 0);
    } else {
      message = 'The house wins!';

      setBalAndBet(player.balance, 0);
    }

  } else {
    message = 'You win, sheriff!';

    setBalAndBet(player.balance + player.bet * 2, 0);
  }

  messageEl.textContent = message;
}

function setBalAndBet(balance, bet) {
  player.balance = balance;
  player.bet = bet;
}