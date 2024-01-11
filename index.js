let newDeckBtn = document.querySelector('#new-deck');
let drawBtn = document.querySelector('#draw');
let cards = document.querySelector('#cards');

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
  cards.innerHTML = `
    <div>
        <h2>Player 1</h2>
        <img src="${p1Card.image}">
    </div>
    <div>
        <img src="${p2Card.image}">
        <h2>Player 2</h2>
    </div>
  `;
}
