const newDeckBtn = document.querySelector('#new-deck');
const drawBtn = document.querySelector('#draw');
const cards = document.querySelector('#cards');
const slot1 = document.querySelector('.slot-1');
const slot2 = document.querySelector('.slot-2');
const result = document.querySelector('#result');
const cardsLeft = document.querySelector('.cards-left');

newDeckBtn.addEventListener('click', handleClick);
drawBtn.addEventListener('click', drawCards);

let deckId;
let p1Card;
let p2Card;

if (deckId === undefined) {
  drawBtn.disabled = true;
}

function handleClick() {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      displayCardsLeft(data);
      drawBtn.disabled = false;
    });
}

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      p1Card = data.cards[0];
      p2Card = data.cards[1];
      displayCardsLeft(data);
      displayCards();
      result.innerHTML = compareCardsValue(p1Card, p2Card);
    });
}

function displayCards() {
  slot1.innerHTML = `
        <img class= "card" src="${p1Card.image}">
  `;

  slot2.innerHTML = `
      <img class= "card" src="${p2Card.image}">
`;
}

function compareCardsValue(card1, card2) {
  const values = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];

  const card1ValueIndex = values.indexOf(card1.value);
  const card2ValueIndex = values.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    return 'Player 1 wins';
  } else if (card2ValueIndex > card1ValueIndex) {
    return 'Player 2 wins';
  } else {
    return 'War!';
  }
}

function displayCardsLeft(cards) {
  if (cards.remaining === 0) {
    drawBtn.disabled = true;
  }
  cardsLeft.innerHTML = cards.remaining;
}
