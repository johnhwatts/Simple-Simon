"use strict";

var sequence = [];
var userInput = [];
var level = 1;
var clickCounter = 0;
var elem = '.button';

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
				flash("#red");
				break;
			case 1 :
				flash("#blue");
				break;
			case 2 : 
				flash("#yellow");
				break;
			case 3 :
				flash("#green");
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
	//It's going to call next round function
var init = function(lev) {
$('#level').text('Level: ' + lev);

generateRandomArray(elem, lev);
playSequence(sequence, elem);
console.log(sequence)
}


//event to fire start game function when start button clicked then deactivate start game button
 
$("#start").click(function() {
  $("#start").hide();
  $("#restart").show();
  init(1);
});

//Restart function 
$("#restart").click(function() {
  $("#start").show();
  $("#restart").hide();
  // resetScore();
  // resetLevel();
  init(1);
});


//Next round function
	//add a random string to the sequence
	//call play sequnce function

//Play sequence function(color)
	// check the color then animate the correct color
	// switch(color)
		//case "red":
			//change opacity for the red button




//Game over function to reset game and reactivate start game button


