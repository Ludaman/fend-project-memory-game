//Javascript for Jeff Choate's matching game project for Udacity course 20180219

//array of classes to be used for each card to be matched
var classArray = [
'fa-diamond',
'fa-paper-plane-o',
'fa-anchor',
'fa-bolt',
'fa-cube',
'fa-leaf',
'fa-bicycle',
'fa-diamond',
'fa-bomb',
'fa-bomb',
'fa-paper-plane-o',
'fa-bolt',
'fa-cube',
'fa-anchor',
'fa-leaf',
'fa-bicycle'
 ];
var firstCard, secondCard, matches=0, moves=0, elapsedTime=0, stars=3;
  

        
      
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

var started =false;

//add 1 second every second to our timer
//it is worth noting this is slightly redundant to the moves update, but I do not want it to look un-responsive.
setInterval(function(){
    if(started==true) {
        elapsedTime++;
        $(".moves").text(buildMovesText());
    }
}, 1000);

//Initializes the grid with a random game baord
function populateGrid() {

    //shuffle array so this game is unique
    classArray = shuffle(classArray);

    var gameBoard = $(".deck"); 
    //take away old game cards
    gameBoard.empty();

    //initialize the variables we use\
    stars=3;
    moves=0;
    matches=0;
    elapsedTime=0;
    firstCard=undefined;
    secondCard=undefined;
    started=false;
    $($($('.stars').children()[0]).children()[0]).addClass('fa-star');
    $($($('.stars').children()[1]).children()[0]).addClass('fa-star');
    $($($('.stars').children()[2]).children()[0]).addClass('fa-star');
    $($($('.stars').children()[0]).children()[0]).removeClass('fa-star-o');
    $($($('.stars').children()[1]).children()[0]).removeClass('fa-star-o');
    $($($('.stars').children()[2]).children()[0]).removeClass('fa-star-o');

    //display all the new gamestate information
    $(".moves").text(buildMovesText());
    classArray.forEach(function(element) {
        gameBoard.append('<li class="card"><i class="fa ' + element + '"></i></li>');
    });
    $( "#dialog-message" ).dialog({});
    $("#dialog-message").dialog( "close" );
}

//associate click of restart button to start a new game
$(".restart").click(function showAll() {
    populateGrid();
});

//function called after a short delay if the player selected two cards that dfo not match
//causes the cards to hide
function fadeAway() {
    firstCard.removeClass("show open");
    secondCard.removeClass("show open");
    firstCard=undefined;
    secondCard=undefined;
}

//handles any click events within the gameboard area
$(".deck").click(function(e) {
        var thisCard=$(e.target)

        started=true;

        //restrict actions to times I click the actual list item element
        if(thisCard.is('li')) {
            
            if(thisCard.hasClass("match")) {
                //then do nothing you already matched it!
            } else if(firstCard===undefined) {//then this is the firstCard of two cards to be clicked         
                
                firstCard=thisCard;
                firstCard.addClass("show open");
           
            } else { //then firstCard already showing and clicked so check versus the secondCard
                
                if (thisCard.hasClass('show')) {
                    //then do nothing because this is already being shown!
                } else if(secondCard===undefined) {//check for undefined incase someone clicks too fast!
                    secondCard=thisCard; //remember the card
                    secondCard.addClass("show open");//show the card
                    
                    if($(secondCard.children()[0]).hasClass(firstCard.children()[0].className)) {
                    	matchedCards(); //handle winning scenario
                    } else {
                        badPairChoice();
                    }
                
                } else {
                    
                    alert("Please wait for last move to fade away!");
                }
            }
        }//end list item element type check
});

function buildMovesText(){
    return moves + ' Moves - ' + elapsedTime + ' Seconds';
}

//function to handle each time the user picks an un-matched pair
function badPairChoice() {
    setTimeout(fadeAway, 500);
    moves++;
    $(".moves").text(buildMovesText());

    //change stars to correct symbol
    if( moves == 9) {
        $($($('.stars').children()[1]).children()[0]).removeClass('fa-star');
        $($($('.stars').children()[1]).children()[0]).addClass('fa-star-o');
        stars--;
    } else if( moves == 1) { //Yes...this means you have to guess them all perfectly to get 3 stars
        $($($('.stars').children()[0]).children()[0]).removeClass('fa-star');
        $($($('.stars').children()[0]).children()[0]).addClass('fa-star-o');
        stars--;
    }
}


//function to group the logic that occurs when a match occurs
function matchedCards() {
    firstCard.addClass('match');
    secondCard.addClass('match');
    firstCard=undefined;
    secondCard=undefined;
    $('.moves').text(moves);
    matches++;
    (matches===8) ? setTimeout(displayWinDialog(), 500):'';
    //(matches===8) ? setTimeout(function(){confirm('YOU WON.  You took ' + elapsedTime +' seconds and you got ' + stars + ' stars over ' + moves + ' moves!')}, 500):'';
}

function displayWinDialog() {

    $("#winText").text('YOU WON.  You took ' + elapsedTime +' seconds and you got ' + stars + ' stars over ' + moves + ' moves!');
    $( "#dialog-message" ).dialog({
            modal: true,
            buttons: {
                Restart: function() {
                    $( this ).dialog( "close" );
                    populateGrid();
                }
            }
        });
}

populateGrid();

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
