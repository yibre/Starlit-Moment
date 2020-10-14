
const slider = document.getElementById("range-slider__range");
const numinput = document.getElementById("guessNumber");
let range = slider.value;

slider.onchange = function(event){
    range = slider.value;
    document.getElementById("js-numrange-text").innerHTML = "Generate a number between 0 and " + range;
    console.log(slider.value);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    const correct = getRandomInt(0, range);
    const answer = parseInt(numinput.value);
    console.log("come from play game ", answer, correct);
    document.getElementById("result-choose").innerHTML = "you chose " + answer + ", and the machine chose " + correct +".";
    if (correct === answer) {
        console.log("right");
       document.getElementById("result-winornot").innerHTML = "YOU WIN!";
    }
    else {
        document.getElementById("result-winornot").innerHTML = "YOU LOSE!";
    }
}