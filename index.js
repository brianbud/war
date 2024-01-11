let btn = document.querySelector('#new-deck');
btn.addEventListener('click', handleClick);

function handleClick() {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    .then((res) => res.json())
    .then((data) => console.log(data));
}
