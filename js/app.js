/*
 * Create a list that holds all of your cards
 */

var cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-anchor', 'fa-anchor',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'];

var matchedCardsPairs = 0;
var moveCounter = 0;
var clock;
var timeStart;

function generateCard(card){
  return `<li class="card" data-card = "fa ${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function initGame(){
  matchedCardsPairs = 0;
  moveCounter = 0;

  document.getElementById('first-star').className = "fa fa-star";
  document.getElementById('second-star').className = "fa fa-star";
  document.getElementById('third-star').className = "fa fa-star";

  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  console.log(cardHTML);
  deck.innerHTML = cardHTML.join(' ');
  var allCards = document.querySelectorAll('.card');
  var openCards = [];

  allCards.forEach(function(card){
    card.addEventListener('click', function(e){
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && openCards.length < 2){
        if (!clock){
          clock = setInterval(myTimer, 1000);
          timeStart = new Date();
        }
        openCards.push(card);
        card.classList.add('open','show');
        if (openCards.length == 2){
          moveCounter += 1;
          document.getElementById('moveCount').innerHTML = moveCounter;
          if (moveCounter >= 3){
            document.getElementById('third-star').className = "fa fa-star-o";
          }
          if (moveCounter >= 5){
            document.getElementById('second-star').className = "fa fa-star-o";
          }
          if (moveCounter >= 7){
            document.getElementById('first-star').className = "fa fa-star-o";
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
              clock = false;
              var para = document.createElement("P");
              var t = document.createTextNode('Congratulations you won in ' + moveCounter + ' moves!');
              para.appendChild(t);
              document.getElementsByClassName("modal-content")[0].appendChild(para);

              modal.style.display = "block";
            }
          }

          //if card do not match:
          else {
            setTimeout(function(){
              openCards.forEach(function(card){
                card.classList.remove('open','show');
              });
              openCards = [];
            }, 1000);
          }
        }
      }
    });
  });

}

var mintues;
var seconds;

function myTimer() {
    var d = new Date();
    timeDifference = (d - timeStart)/1000;
    minutes = Math.floor(timeDifference/60);
    seconds = timeDifference - 60 * minutes;
    document.getElementById("minutes").innerHTML = Math.floor(minutes);
    document.getElementById("seconds").innerHTML = Math.floor(seconds);
}

initGame();

//Restarting Game
var restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
  console.log('restart button has been clicked');
  clearTimeout(clock);
  clock = false;
  document.getElementById("minutes").innerHTML = 0;
  document.getElementById("seconds").innerHTML = 0;
  initGame();
});

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
