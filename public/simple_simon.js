"use strict";
//Game sequence
var sequence = [];
//User input sequence
var userInput = [];

//change button opacity on click and then reset after 1/2 second
$('.button').click(function() {
  $(this).css('opacity', '0.6');
  setTimeout(function(){
  	$('.button').css('opacity', '1');
	}, 200);
});


// Generate a random square

function getRandomNumberBetweenOAnd (input) {
	return Math.floor(Math.random() * input);
}

var squares =["red", "yellow", "green", "blue"];

var randomIndex = getRandomNumberBetweenOAnd(squares.length);

var randomSquare = squares[randomIndex];

console.log(randomSquare);

//event to fire start game function when start button clicked then deactivate start game button
 
$("#start").click(function() {
  sequence = [];
  userInput = [];
  $("#start").hide();
  $("#restart").show();
  start();
});

//
//Function to start game 
	//It's going to call next round function
function start() {
  playSequence(); 
}

//Next round function
	//add a random string to the sequence
	//call play sequnce function

//Play sequence function(color)
	// check the color then animate the correct color
	// switch(color)
		//case "red":
			//change opacity for the red button




//Game over function to reset game and reactivate start game button


