"use strict";

var sequence = [];
var userInput = [];
var level = 1;
var clickCounter = 0;
var elem = '.button';
var disableControls = [];

//functions


//add to score if user scores point - increase by num
function score(num) {
currentScore = parseInt(currentScore + num);
$('#score').text('Score: ' + currentScore);
};

//get the current score
function getScore() {
return currentScore;
};

var generateRandomArray = function(elem, max) {

var randomIndex = Math.floor(Math.random() * 4);
sequence.push(randomIndex);
}

//Change opacity of buttons to flash during random sequence
var flash = function(elem) {
$(elem).css('opacity', '0.4');
setTimeout(function(){
$(elem).css('opacity', '1');
}, 500);
}

//Play sequence function(color)
var playSequence = function(seq, elem) {
var i=0;
	var intervalId = setInterval(function() {
		switch(seq[i]){
			case 0 :
				flash('#red');
				break;
			case 1 :
				flash('#blue');
				break;
			case 2 : 
				flash('#yellow');
				break;
			case 3 :
				flash('#green');
				break;
		}
		if(i < seq.length) {
			i++;
		} else {
			clearInterval(intervalId);
		}

	},1000)
}

//Function to start game 
	//It's going to call next level function
var init = function(lev) {
$('#level').text('Level: ' + lev);

generateRandomArray(elem, lev);
playSequence(sequence, elem);
console.log(sequence);
};

//apply click events to buttons
var applyClicks = function(elem) {
	$(elem).each(function(i) {
	$(this).click(function() {
	// if (!disableControls) {
	// 	flash($(this));
	// 	userInput.push(i);
	if (userInput[clickCounter] == sequence[clickCounter]) { //if click is correct
		score(1);
	if (userInput.length == sequence.length) { //if user has completed clicks for this round
		disableControls = true;
		currentLevel++;
	$('#next').show(); //show next level button
	}
	}
	else { //if click is false - RESET GAME
		alert('You failed, sucker!!! Final Score: ' + getScore());
		resetScore();
		resetLevel();
		disableControls = true;
	}
	clickCounter++;
	});
	});
};


//event to fire start game function when start button clicked then deactivate start game button
 
$('#start').click(function() {
  $('#start').hide();
  $('#restart').show();
  init(1);
});

//Restart function 
$('#restart').click(function() {
  $('#start').show();
  $('#restart').hide();
  resetScore();
  resetLevel();
  init(1);
});

applyClicks('.button'); // apply logic on buttons

//Next level function
$('#next').click(function() {
init(currentLevel);
});

//reset score if user fails
resetScore = function() {
jQuery('#score').text('Score: 0');
};


//Game over function to reset game and reactivate start game button

	