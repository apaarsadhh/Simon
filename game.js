// alert("connected")

buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level)


    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber)
    var randomChoosenColour = buttonColours[randomNumber]
        // console.log(randomChoosenColour)
    gamePattern.push(randomChoosenColour)
        // console.log(gamePattern);
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColour);
}

// Detect any of the buttons clicked and trigger a handler fucntion.

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();

}

function animatePress(currentColour) {


    $("#" + currentColour).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}


$(document).keypress(function() {

    if (!started) {

        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }

});

function checkAnswer(currentlevel) {

    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        // console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}