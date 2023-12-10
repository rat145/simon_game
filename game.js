let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let is_game_on = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash animation effect
    $("#"+randomChosenColor).animate({opacity: "0.2"}, 300, function() {
        $("#"+randomChosenColor).animate({opacity: "1"}, 300);
    });

    // And playing the sound
    let audio = new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();
}

// Detecting button click
$(".btn").on("click", function() {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass('pressed');
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
    }, 100);
}

$(document).keydown(function (e) { 
    if (is_game_on == false) {
        nextSequence();
        is_game_on = true;
    }
});

// ===========================================

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    is_game_on = false;
    userClickedPattern = [];
}