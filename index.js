let userClickedPattern = [];
let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let started = false;

function nextSequence(){
    level++;
    userClickedPattern = [];
    let randomNumber = Math.floor( Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // 100 here represents the time in milliseconds of happening animation
    gamePattern.push(randomChosenColour);
    
    playSound(randomChosenColour);
    $("h1").html("level " + level);
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


let buttonSize =  document.querySelectorAll(".btn").length;

for (let i = 0; i < buttonSize ; i++ ){
document.querySelectorAll(".btn")[i].addEventListener("click", function(event){
    
    let userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    let soundColour = userChosenColour;

    animatePress(soundColour);
    playSound(soundColour);
    checkAnswer(userClickedPattern.length - 1);
})}

function playSound(name){
    let music = new Audio("./sounds/" + name + ".mp3");
    music.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed")
    setTimeout(function(){$("." + currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel) {

    if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
        if ( userClickedPattern.length === gamePattern.length ){
            setTimeout(function(){nextSequence()}, 700);
        }
    }
    else{
          playSound("wrong");
          $("body").addClass("game-over");

          setTimeout(function(){
            $("body").removeClass("game-over");}, 300
          )  

          $("#level-title").text("OOPS!! 😓 Game Over, Press any key to Start Again.")

          startOver();
    }
}


function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
}