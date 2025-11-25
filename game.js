let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let colors = ["red", "orange", "blue", "green"];
let h3; // will be assigned after DOM is ready

// We'll wire keypress and button listeners after DOM is loaded so elements exist
document.addEventListener("DOMContentLoaded", function() {
    h3 = document.querySelector("h3");

    document.addEventListener("keypress", function() {
        if(!started){
            console.log("Game Started");
            started = true;
            levelup();
        }
    });

    let allbtns = document.querySelectorAll(".btn");
    for (let buttonEl of allbtns) {
        buttonEl.addEventListener("click", btnpress);
    }
    // Initialize h3 text
    if(h3) h3.innerText = "Press any key to start"; // the use of (h3) guards against null if selector fails 
});

function gameflash(buttonEl){ 
    if(!buttonEl) return; // guard in case selector failed
    buttonEl.classList.add("flash"); // Add a class for flash effect
    setTimeout(function(){
        buttonEl.classList.remove("flash"); // Remove the class after a short delay
    }, 300);
}

function userflash(buttonEl){
    if(!buttonEl) return; // guard in case
    buttonEl.classList.add("userflash"); // Add a class for user click effect
    setTimeout(function(){
        buttonEl.classList.remove("userflash"); // Remove the class after a short delay
    }, 200);
}

function levelup(){
    userseq = [];
    level++;
    if (h3) h3.innerText = `Level ${level}`; // Update level display
    let ranIdx = Math.floor(Math.random()*4);
    let ranColor = colors[ranIdx];
    let ranbtn = document.querySelector(`.${ranColor}`); // Select button based on random color
    gameseq.push(ranColor); // Add random color to game sequence
    console.log(gameseq);
    gameflash(ranbtn);

  
}
function checkans(Idx){
    if(userseq[Idx] === gameseq[Idx]){
        if(userseq.length === gameseq.length){
            setTimeout(function(){
                levelup();
            }, 1000);
        }
    } else {
        if (h3) h3.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "#868680";
            // Reset game state after the flash so the Game Over message remains visible
            reset();
        }, 200);
    }
}


function btnpress(){
    let buttonEl = this; // 'this' refers to the button that was clicked
    userflash(buttonEl); // Flash effect for user click

    let usercolor = buttonEl.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);  // Pass the index of the last user input
    console.log(userseq);

}

// button listeners are attached in DOMContentLoaded
function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
   
    // Do not overwrite h3 here so the "Game Over" message (with score) remains visible
    // h3 will be updated when the user presses a key to start a new game

}
