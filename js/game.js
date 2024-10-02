let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let muted = false;

setInterval(() => {
    ceckOrientation();
}, 1000/60)

function init() {
    canvas = document.getElementById("canvas");
    // checkGameStatus();
}

function StartGame() {
    startLevel();
    mobileControles()
    document.getElementById("canvas1").classList.add("d-none");
    world = new World(canvas, keyboard);
    keyboard.bindBtnPressEvents();
    document.getElementById("startButton").innerText = "Start Game"
    document.getElementById("startButton").disabled = true;
    document.getElementById("muteButton").classList.remove("d-none");
    document.getElementById("imprintButton").classList.add("d-none");
    gameStarted = true;
}

window.addEventListener('keydown', (e) => { // keypress reagiert nicht auf die Pfeiltasten darum muss keydown benutzt werden
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
        keyboard.D = true;
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

function mobileControles() {
    if (window.screen.width <= 720 || window.screen.height <= 460) {
        document.getElementById("controles").classList.remove("d-none");
        document.getElementById("bottomButtons").classList.add("d-none");
        document.getElementById("footer").classList.add("d-none");
    } else {
        null;
    }
}

function ceckOrientation() {
    if (window.screen.width < window.screen.height && window.screen.height < 460 || window.screen.width < 700) {
        document.getElementById("turn-device").classList.remove("d-none");
    } else {
        document.getElementById("turn-device").classList.add("d-none");
    }
}

function showImprint() {
    document.getElementById("imprint-container").classList.remove("d-none");
    document.getElementById("imprintButton").innerText = "Back"
    document.getElementById("showControls").disabled = true;
    document.getElementById("startButton").disabled = true;
}

function closeImprint() {
    document.getElementById("imprint-container").classList.add("d-none");
    document.getElementById("imprintButton").innerText = "Imprint"
    document.getElementById("showControls").disabled = false;
    if (!gameStarted) {
        document.getElementById("startButton").disabled = false;
    }
}

function showOrHideImprint1() {
    if (document.getElementById("imprintButton").innerText == "Back") {
        closeImprint()
    } else {
        showImprint()
    }
}

function mutegame() {
    if (muted) {
        world.playSounds()
    } else {
        world.muteSounds()
        muted = true;
    }
}

function showControls() {
    document.getElementById("controls").classList.remove("d-none");
    document.getElementById("showControls").innerText = "Back"
    document.getElementById("imprintButton").disabled = true;
    document.getElementById("startButton").disabled = true;
}

function closeControls() {
    document.getElementById("controls").classList.add("d-none");
    document.getElementById("showControls").innerText = "Show Controls"
    document.getElementById("imprintButton").disabled = false;
    if (!gameStarted) {
        document.getElementById("startButton").disabled = false;
    }
}

function sowOrHideControls() {
    if (document.getElementById("showControls").innerText == "Back") {
        closeControls()
    } else {
        showControls()
    }
}

function checkGameStatus() {
    setInterval(() => {
        if (world.gameFinished) {
            document.getElementById("startButton").disabled = false;
            document.getElementById("imprintButton").classList.remove("d-none");
            document.getElementById("muteButton").classList.add("d-none");
            document.getElementById("startButton").innerText = "Restart"
        }
    }, 1000)
}