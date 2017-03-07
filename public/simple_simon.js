$( document ).ready(function() {

"use strict";

var sequence = []; // current level recorded sequence
var userInput = []; //record of user input for current level
var clickCounter = 0; //how many clicks have been made to determine the end of level
var currentLevel = 1; //starting level
var currentScore = 0; //current score
var disableControls = true; //stops controls working as a boolean
var obj = document.createElement("audio"); //creates a sound to play on click
    obj.src="https://kahimyang.com/resources/sound/click.mp3";
    obj.volume=0.40;
    obj.autoPlay=false;
    obj.preLoad=true; 
var audio = document.getElementById("wrong");
$("#wrong").prop('volume', 1.0);
var backSound = document.getElementById("backgroundSound");
	backSound.volume = 0.1;
	


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
//reset score if user fails
function resetScore() {
    $('#score').text('Score: 0');
};
//reset game if user fails
function resetLevel() {
    currentLevel = 1;
    $('#level').text('Level: ' + 0);
};
//generate level sequence - accepts a CSS selector and amount of numbers required
function generateRandomArray(elem, index) {
    for (var i = 0; i < index; i++) {
        var randomIndex = Math.floor(Math.random() * 4);
        sequence.push(randomIndex);
    }
};
//flash an element on click or to show sequence
function flash(elem) {
    $(elem).css('opacity', '0.6');
    setTimeout(function() {
        $(elem).css('opacity', '1');
    }, 500);
};
//play entire sequence before user starts games
function playSequence(seq, elem) {
    var i = 0;
    var intervalId = setInterval(function() {
        switch (seq[i]) {
            case 0:
                flash('#red');
                break;
            case 1:
                flash('#blue');
                break;
            case 2:
                flash('#yellow');
                break;
            case 3:
                flash('#green');
                break;
        }
        if (i < seq.length) {
            i++;
        } else {
            clearInterval(intervalId);
        }
        if (i == seq.length) {
            disableControls = false; //if round has ended re-enable controls
        }
    }, 700)
}
//apply click events to buttons
function applyClicks() {
    $('.button').each(function(i) {
        $(this).click(function() {
            if (!disableControls) {
                flash($(this));
                userInput.push(i);
                if (userInput[clickCounter] == sequence[clickCounter]) { //if click is correct
                    score(1);
                    if (userInput.length == sequence.length) { //if user has completed clicks for this round
                        disableControls = true;
                        currentLevel++;
                        $('#next').show(); //show next level button
                    }
                } else { //if click is false
                    $('#wrongAnswer').show(); // show trump gif
                    audio.play();
                    resetScore();
                    resetLevel();
                    disableControls = true;
                }
                clickCounter++;
            }
        })
    })
};

//Start current level
function start(lev) {
    $('#level').text('Level: ' + lev);
    $('#next').hide();
    userInput = [];
    sequence = [];
    clickCounter = 0;
    var elem = '.button';
    generateRandomArray(elem, lev);
    playSequence(sequence, elem, 0);
};

//some click callbacks
applyClicks(); // apply logic on buttons

//start function: shows up on page load (also hides the reset button)
$("#start").on("click", function() {
    $("#start").hide();
    $("#restart").show();
    start(1);
});
//next level function
$('#next').click(function() {
    start(currentLevel);
});
//restart button 
$('#restart').click(function() {
    $('#wrongAnswer').hide();
    audio.pause();
    resetScore();
    resetLevel();
    start(1);
});
//play sound on click of element
$(".playSound").click(function() {
    obj.play();
});

});   
 