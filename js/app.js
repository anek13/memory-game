/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

//Create a list that holds all of the cards
let cards = ['fa-car', 'fa-bell',
            'fa-bug', 'fa-flask',
            'fa-diamond', 'fa-glass',
            'fa-paw', 'fa-heart'];

cards = [...cards, ...cards];

let matchedCardsPairs,
    moveCounter,
    stars,
    clock,
    timeStart,
    modalText,
    mintues,
    seconds,
    openCards,
    deck,
    cardHTML,
    starDivs;


//Generate cards
function generateCard(card){
  return `<li class="card" data-card = "fa ${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//display the card's symbol
function addCardsToDOM(){
  deck = document.querySelector('.deck');
  cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join(' ');
}

// Set initial variables for a new game
function setVariables(){

  matchedCardsPairs = 0;
  moveCounter = 0;
  stars = 3;
  clock = false;
  openCards = [];

  document.getElementById("minutes").innerHTML = '00';
  document.getElementById("seconds").innerHTML = '00';
  document.getElementById("moveCount").innerHTML = '0';

  starDivs = document.querySelectorAll('li');
  for (i = 0; i < starDivs.length; ++i) {
    starDivs[i].className = "fa fa-star";
  }
}

//Generate modal modal content
function generateModalContent(){
  modalText = document.getElementsByClassName('modal-text')[0];
  generateModalText(stars, minutes);
  modalText.innerHTML = `<p id="congrats">Congratulations you won!</p>
                        <p>You won with ${moveCounter} moves and ${stars} stars.</p>
                        <p>Your time is ${minutes} minutes and ${seconds} seconds!</p></div>
                        <div class="button"><button type="button" id='play-again'>Play again!</button>`;
  modal.style.display = "block";

  var newGame = document.getElementById('play-again');
  newGame.addEventListener('click', function(e){
    modal.style.display = "none";
    initGame();
  });
}

function winningGame() {
  console.log('You won!');
  clearTimeout(clock);
  generateModalContent();
}

function cardsMatch() {
  console.log('cards match');
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = [];
  matchedCardsPairs += 1;
  if (matchedCardsPairs == 8){
    winningGame();
  }
}

function cardsDontMatch() {
  console.log('cards don\'t match');
  openCards[0].classList.add('nomatch');
  openCards[1].classList.add('nomatch');
  setTimeout(function(){
    openCards.forEach(function(card){
      card.classList.remove('nomatch','open','show');
    });
    openCards = [];
  }, 1000);
}


// function openingCards(card) {
//   if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2){
//     return true;
//   }
// }

//starts the time counter
function startClock() {
  if (!clock){
    clock = setInterval(myTimer, 100);
    timeStart = new Date();
  }
}

//counts moves and removes the stars from the score
function incrementMoveCounter () {
  moveCounter += 1;
  document.getElementById('moveCount').innerHTML = moveCounter;
  if (moveCounter >= 15){
    stars = 2;
    document.getElementsByTagName("LI")[2].className = "fa fa-star-o";
  }
  if (moveCounter >= 23){
    stars = 1;
    document.getElementsByTagName("LI")[1].className = "fa fa-star-o";
  }
  if (moveCounter >= 30){
    stars = 0;
    document.getElementsByTagName("LI")[0].className = "fa fa-star-o";
  }
}

function openCard(card) {
  openCards.push(card);
}

function displayCard(card) {
  card.classList.add('open','show');
}

function cardClickHandler(e) {
  let card = e.target;
  //opens not opened cards untill there is two and only two o them
  if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2){

    startClock();
    openCard(card)
    displayCard(card);

    // checking if cards match
    if (openCards.length == 2){
      incrementMoveCounter();
      if (openCards[0].dataset.card == openCards[1].dataset.card){
        cardsMatch();
      } else {
        cardsDontMatch();
      }
    }
  }
}

function initGame(){

  setVariables();
  addCardsToDOM();

  let allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card){
    card.addEventListener('click', cardClickHandler);
  });

}

function formatTime(n) {
  if (n < 10){
    return '0' + n;
  }
  else {
    return n;
  }
}

//Time display
function myTimer() {
    var d = new Date();
    timeDifference = (d - timeStart)/1000;
    minutes = Math.floor(timeDifference/60);
    seconds = Math.floor(timeDifference - 60 * minutes);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);
}


//start the game
initGame();

//Event handler for restart button
var restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
  clearTimeout(clock);
  initGame();
});

 // Modal operations
 // Get the modal
 var modal = document.getElementById('myModal');
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }
