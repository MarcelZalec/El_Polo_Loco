let canvas;
// let ctx; 
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
}

function StartGame() {
    startLevel();
    document.getElementById("canvas1").classList.add("d-none");
    world = new World(canvas, keyboard);
    // console.log("My Character is" ,world.character);
}

window.addEventListener('keydown', (e) => { // keypress reagiert nicht auf die Pfeiltasten darum muss keydown benutzt werden
    // console.log(e);
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    } else if(e.keyCode == 37){
        keyboard.LEFT = true
    } else if (e.keyCode == 40) {
        keyboard.DOWN = true;
    } else if(e.keyCode == 38) {
        keyboard.UP = true;
    } else if (e.keyCode == 32) {
        keyboard.SPACE = true
    }else if(e.keyCode == 68) {
        keyboard.D = true;
    } else {
        return null
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    } else if(e.keyCode == 37){
        keyboard.LEFT = false;
    } else if (e.keyCode == 40) {
        keyboard.DOWN = false;
    } else if(e.keyCode == 38) {
        keyboard.UP = false;
    } else if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }else if(e.keyCode == 68) {
        keyboard.D = false;
    } else {
        return null
    }
})

function fullscreen() {
    canvas.requestFullscreen();
}

function stopGame() {
    for (let i = 0; i < 99999; i++) {
        window.clearInterval(i);       
    }
}