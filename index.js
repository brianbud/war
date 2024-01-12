const newDeckBtn = document.querySelector('#new-deck');
const drawBtn = document.querySelector('#draw');
const cards = document.querySelector('#cards');
const slot1 = document.querySelector('.slot-1');
const slot2 = document.querySelector('.slot-2');

newDeckBtn.addEventListener('click', handleClick);
drawBtn.addEventListener('click', drawCards);

let deckId;
let p1Card;
let p2Card;

function handleClick() {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
    });
}

function drawCards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      p1Card = data.cards[0];
      p2Card = data.cards[1];
      displayCards();
      console.log('player 1 card', p1Card, 'player2 card', p2Card);
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
