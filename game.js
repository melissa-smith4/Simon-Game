//Kepep track of whether the user has started the game
var gameStarted = false;

//Keep track of game level
var level = 0;
var currGuesses = 0;

//Button colours
var buttonColors = ["green", "red", "yellow", "blue"];

//Keep track of the game pattern and user pattern
var gamePattern = [];
var userChosenPattern = [];

//Generate the next colour in the pattern
function nextSequence() {
    //Update current level
    level += 1;

    //Display the level for the user
    $("#level-title").text("Level " + level);

    //Generate new colour for the sequence
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    //Show user the new colour in the sequence
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Start game if user presses any key
$(document).on("keypress", function(){
    if (!gameStarted) {
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

//Play corresponding sound and flash on button click
$(".btn").on("click", function(){
    var clickedColour = this.id;
    playSound(clickedColour);
    buttonFlash(clickedColour);

    //Log the user's colour choice
    userChosenPattern.push(clickedColour);

    //Check the user's input
    if (checkPress(currGuesses) == true){
        currGuesses += 1;
        //Check if user is done their sequence
        if (userChosenPattern.length == gamePattern.length){
            userChosenPattern = [];
            currGuesses = 0;
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        //Update level text and play wrong-guess sound
        $("#level-title").text("Game Over! Press Any Key to Play Again.");
        playSound("wrong");

        //Play wrong-guess flash on screen
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //Reset all game variables
        restartGame();
    }
    
});

//Play the sound that matches the pressed button
function playSound(soundName) {
    var sound = new Audio("sounds/" + soundName + ".mp3");
    sound.play();
}

//Play button flash animation when it is pressed
function buttonFlash(color) {
    var pressedButton = "#" + color;
    $(pressedButton).addClass("pressed");
    setTimeout(function() {$(pressedButton).removeClass("pressed");}, 100);
}

//Check if a user's button press is correct
function checkPress(guessNumber){
    if (userChosenPattern[guessNumber] != gamePattern[guessNumber]){
        return false;
    }
    return true;
}

//Reset all game variables
function restartGame(){
    currGuesses = 0;
    level = 0;
    userChosenPattern = [];
    gamePattern = [];
    gameStarted = false;
}