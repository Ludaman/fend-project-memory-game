//Javascript for Jeff Choate's matching game project for Udacity course 20180219

//array of classes to be used for each card to be matched
var classArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-bomb", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle"];
var firstCard, secondCard, matches=0, moves=0;

// Shuffle function from http://stackoverflow.com/a/2450976
//will take in the classArray and shuffle it so each game is unique
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function populateGrid() {

    //shuffle array so this game is unique
    classArray = shuffle(classArray);

    var gameBoard = $(".deck"); 
    //take away old game cards
    gameBoard.empty();

    moves=0;
    matches=0;
    firstCard=undefined;
    secondCard=undefined;

    $(".moves").text(moves);

    classArray.forEach(function(element){
        gameBoard.append('<li class="card"><i class="fa ' + element + '"></i></li>');
        console.log(element);
    });
}

$(".restart").click(function showAll(){
	$(".moves").text("4444"); 
    populateGrid();
});

function fadeAway(){
    firstCard.removeClass("show open");
    secondCard.removeClass("show open");
    firstCard=undefined;
    secondCard=undefined;
}

$(".deck").click(function(e){
        var thisCard=$(e.target)

        //restrict actions to times I click the actual list item element
        if(thisCard.is('li')){
            if(thisCard.hasClass("match")) {
                //do nothing you already matched it!
            }
            else if(firstCard===undefined) {//then this is the firstCard of two cards to be clicked         
                firstCard=thisCard;
                firstCard.addClass("show open");
            } else { //then firstCard already showing and clicked so check versus the secondCard
                
                if (thisCard.hasClass('show')){
                    //then do nothing because this is already being shown!
                }
                else if(secondCard===undefined){//check for undefined incase someone clicks too fast!
                    secondCard=thisCard; //remember the card
                    secondCard.addClass("show open");//show the card
                    if($(secondCard.children()[0]).hasClass(firstCard.children()[0].className)){
                        firstCard.addClass("match");
                        secondCard.addClass("match");
                        firstCard=undefined;
                        secondCard=undefined;
                        $(".moves").text(moves);
                        matches++;
                        (matches===8) ? alert("YOU WIN"),:"";
                    }
                    else {
                        setTimeout(fadeAway, 500);
                        moves++;
                        $(".moves").text(moves);
                    }
                }
                else
                {
                    alert("Please wait for last move to fade away!");
                }
            }
        }//end list item element type check
        else{
            //TODO: try and figure out how to call parent click event in the case the i tag is clicked and not the li element
        }
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
