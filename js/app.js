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
let cards = ['fa-car', 'fa-car',
            'fa-bell', 'fa-bell',
            'fa-bug', 'fa-bug',
            'fa-flask', 'fa-flask',
            'fa-diamond', 'fa-diamond',
            'fa-glass', 'fa-glass',
            'fa-paw', 'fa-paw',
            'fa-heart', 'fa-heart'];

let matchedCardsPairs;
let moveCounter;
let stars;
let clock;
let timeStart;
let modalText;
let mintues;
let seconds;
let openCards;
let deck;
let cardHTML;
let starDivs;


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

// Set all variables for a new game
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

//Generate modal modalText
function generateModalContent(){
  modalText = document.getElementsByClassName('modal-text')[0];
  modalText.innerHTML = `<div id="modalText"><p id="congrats">Congratulations you won!</p>
                        <p>You won with ${moveCounter} moves and ${stars} stars.</p>
                        <p>Your time is ${minutes} minutes and ${seconds} seconds!</p></div>
                        <div class="button"><button type="button" id='play-again'>Play again!</button></div>`;
  modal.style.display = "block";

  var newGame = document.getElementById('play-again');
  newGame.addEventListener('click', function(e){
    modal.style.display = "none";
    initGame();
  });
}


function initGame(){

  setVariables();
  addCardsToDOM();

  let allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card){
    card.addEventListener('click', function(e){
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2){
        if (!clock){
          clock = setInterval(myTimer, 100);
          timeStart = new Date();
        }
        openCards.push(card);
        card.classList.add('open','show');
        if (openCards.length == 2){
          moveCounter += 1;
          document.getElementById('moveCount').innerHTML = moveCounter;
          if (moveCounter >= 3){
            stars = 2;
            document.getElementsByTagName("LI")[2].className = "fa fa-star-o";
          }
          if (moveCounter >= 5){
            stars = 1;
            document.getElementsByTagName("LI")[1].className = "fa fa-star-o";
          }
          if (moveCounter >= 7){
            stars = 0;
            document.getElementsByTagName("LI")[0].className = "fa fa-star-o";
          }

          //if cards match:
          if (openCards[0].dataset.card == openCards[1].dataset.card){
            console.log('cards match');
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            openCards = [];
            matchedCardsPairs += 1;
            if (matchedCardsPairs == 8){
              console.log('You won!');
              clearTimeout(clock);
              generateModalContent();

            }
          }

          //if card do not match:
          else {
            openCards[0].classList.add('nomatch');
            openCards[1].classList.add('nomatch');
            setTimeout(function(){
              openCards.forEach(function(card){
                card.classList.remove('nomatch','open','show');
              });
              openCards = [];
            }, 1000);
          }
        }
      }
    });
  });

}

//Time display
function myTimer() {
    var d = new Date();
    timeDifference = (d - timeStart)/1000;
    // console.log(timeDifference);
    minutes = Math.floor(timeDifference/60);
    seconds = Math.floor(timeDifference - 60 * minutes);

    //print the times
    if (minutes < 10){
      document.getElementById("minutes").innerHTML = '0' + minutes;
    }
    else {
      document.getElementById("minutes").innerHTML = minutes;
    }

    if (seconds < 10){
      document.getElementById("seconds").innerHTML = '0' + seconds;
    }
    else {
      document.getElementById("seconds").innerHTML = seconds;
    }
}

initGame();

//Event handler for restart button
var restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
  console.log('restart button has been clicked');
  clearTimeout(clock);
  initGame();
});

/*
 * Modal operations
 */

 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("myBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }
