/* Create a list that holds all of your cards*/
var time = 60;
var stop = 0;
let rates = 3;
onTimer();
let cards = document.querySelectorAll(".deck .card");
let shuffledCards = shuffle.call(cards);
rearrangeLi.call(shuffledCards);
let openCards = [];
let count =0;
let moves = 0;
let locks = 0;

// start timer
function onTimer() {
	if(time <10)
  		document.querySelector("#counter").innerHTML = "0" + time;
	else
	 document.querySelector("#counter").innerHTML = time;

  	if(time === 0 && stop == 0) {
	  	document.querySelector("#counter").innerHTML = "0" + time;
	  	document.querySelector("#mod").style.display = "block";
	  	document.querySelector(".congos").innerHTML =  "Time Up. You Lost!!"
	}
  	else if(time != 0 && stop == 0) {
	  	time--;
	    setTimeout(onTimer, 1000);
    }
}

// shuffle the available cards
function shuffle() {
	 let cards = this;
     let arr = [];
     let cardsArr = Array.prototype.slice.call(cards);
     for (var i = 0; i <= cardsArr.length; i++) {
     	if(cardsArr.length === i) {
	            	i = 0;
     	}
        let index = Math.floor(Math.random()*cardsArr.length);
        let item = cardsArr[index];
        arr.push(item);
        cardsArr.splice(index,1);
	 }
     return arr;
}

// re-arrange shuffled cards and them to ul
function rearrangeLi() {
	document.querySelector('.deck').remove('li');
	let list =	document.createElement('ul');
	list.classList = "deck";
	document.querySelector('.container').appendChild(list);
	let listEle = document.querySelector('.deck');

	for(let j = 0; j < shuffledCards.length; j++) {
	listEle.appendChild(shuffledCards[j]);
	}
 }

// add event listener to the cards on click
var cardList = document.querySelectorAll('.deck li');
for(let i =0; i<cardList.length; i++)
{
   cardList[i].addEventListener('click', function(e)
   {
		if(e.target && e.target.matches(".card"))
		{
			if(!this.classList.contains("match")){
            	displaySymb.call(this);
           		setTimeout(function(){
           		addToOpenCards.call(e.target)},500);
           	}
        }
	});
}

// displays symbols when card is clicked.
function displaySymb() {
		let card = this;
		card.classList.toggle("open");
		card.classList.toggle("show");
}

// adds cards to open cards list and check for the matching cards when card ic clicked
function addToOpenCards(){

       count++;
       let pick = this;
       openCards.push(this);

       if(openCards.length>1){
			for(let x = 1; (x <= openCards.length && x != count); x++) {
				   	if(this != openCards[x-1]) {
				   		moves++;
                			// if cards match, lock the cards
							if(this.innerHTML === openCards[x-1].innerHTML){
								lockCards.call(this, openCards[x-1]);
							}
							// if cards dont match, hide the card
							else {
								openCards[x-1].classList.add("wrong");
								this.classList.add("wrong");

								openCards[x-1].classList.remove("show","open");
								this.classList.remove("show","open");

								let c = openCards[x-1];

								setTimeout(function() {
									pick.classList.remove("wrong");
									c.classList.remove("wrong");
								},500);

								openCards = [];
								count = 0;
							}
					}
					else{
						// moves--;
						break;
					}
				count = 0;
			}
		openCards=[];
		}
	updateMovesAndStars();
}

//lock cards when match is found
function lockCards(currcard) {
	locks++;
	let ref = this;
	let openCard = currcard;
	ref.classList.add("match");
	openCard.classList.add("match");
	openCards = [];

	if(locks === shuffledCards.length/2) {
	  	document.querySelector("#mod").style.display = "block";
	  	document.querySelector(".congos").innerHTML =  "Congratulations. You won!!"
	  	document.querySelector(".score").innerHTML =  "Game Over!! Your Score is: " +
	  	 							(moves*10) + " in " + (60-time) + " sec " +
  			 							"with " + rates + " rating." ;
  		stop = 1;
  	}
}

// set number of moves
function updateMovesAndStars() {
	var move = document.getElementById("moves");
	move.innerHTML = moves;
	let star = document.querySelectorAll(".stars li");
	if(moves >20) {
			star[2].style.color = "#fff";
			rates = 2;
	}
	if(moves >40) {
			star[1].style.color = "#fff";
			rates = 1;
	}
	if(moves >60) {
			star[0].style.color = "#fff";
			rates = 0;
	}
}

// reload page function
function refresh() {
	var refresh = document.querySelector(".restart");
	refresh.click();
}

// event listener on restart icon when clicked reloads the page
document.querySelector(".restart").addEventListener('click', function() {
	window.location.reload(true);
});

// reload game when play again on modal is clicked
document.querySelector(".repeat").addEventListener('click', function() {
	window.location.reload(true);
});

// When user clicks on the main window, modal disappears and control goes back to window
var modal = document.getElementById('mod');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}