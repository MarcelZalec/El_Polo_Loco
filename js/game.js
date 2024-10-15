/**
 * The canvas element used for rendering the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world instance.
 * @type {World}
 */
let world;

/**
 * The keyboard input handler.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates if the game has started.
 * @type {boolean}
 */
let gameStarted = false;

/**
 * Indicates if the game sounds are muted.
 * @type {boolean}
 */
let muted;

/**
 * Indicates if the device is turned.
 * @type {boolean}
 */
let isTurned;

/**
 * Initializes the canvas and sets up the orientation check interval.
 */
function init() {
    canvas = document.getElementById("canvas");
    setInterval(() => {
        checkOrientation();
    }, 1000/60)
}

/**
 * Starts the game, initializes the world, and sets up the UI.
 */
function StartGame() {
    checkMutedStatusinLocalStorage();
    gameStarted = true;
    checkOrientation();
    startLevel();
    mobileControles();
    document.getElementById("canvas1").classList.add("d-none");
    world = new World(canvas, keyboard);
    keyboard.bindBtnPressEvents();
    document.getElementById("startButton").innerText = "Start Game"
    document.getElementById("startButton").disabled = true;
    document.getElementById("muteButton").classList.remove("d-none");
    document.getElementById("imprintButton").classList.add("d-none");
    toggleGameSounds()
}

/**
 * Handles keydown events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

/**
 * Handles keyup events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

/**
 * Requests fullscreen mode for the canvas.
 */
function fullscreen() {
    canvas.requestFullscreen();
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    for (let i = 0; i < 99999; i++) {
        window.clearInterval(i);       
    }
}

/**
 * Adjusts the UI for mobile controls based on screen size.
 */
function mobileControles() {
    if (window.screen.width <= 720 || window.screen.height <= 460) {
        document.getElementById("controles").classList.remove("d-none");
        document.getElementById("bottomButtons").classList.add("d-none");
        isTurned = true;
    } else {
        null;
    }
}

/**
 * Checks the screen orientation and adjusts the UI accordingly.
 */
function checkOrientation() {
    if (window.screen.width < window.screen.height && window.screen.height < 460 || window.screen.width < 460) { // window.screen.width > window.screen.height && window.screen.height < 460 && window.screen.width < 700
        document.getElementById("turn-device").classList.remove("d-none");
        document.getElementById("bottomButtons").classList.add("d-none");
        isTurned = true;
    } else {
        document.getElementById("turn-device").classList.add("d-none");
        isTurned = false;
        if (gameStarted && window.screen.height < 950) {
            document.getElementById("bottomButtons").classList.add("d-none");
        } else {
            document.getElementById("bottomButtons").classList.remove("d-none");
        }
    }
}

/**
 * Shows the imprint section of the UI.
 */
function showImprint() {
    document.getElementById("imprint-container").classList.remove("d-none");
    document.getElementById("imprintButton").innerText = "Back"
    document.getElementById("showControls").disabled = true;
    document.getElementById("startButton").disabled = true;
}

/**
 * Closes the imprint section of the UI.
 */
function closeImprint() {
    document.getElementById("imprint-container").classList.add("d-none");
    document.getElementById("imprintButton").innerText = "Imprint"
    document.getElementById("showControls").disabled = false;
    if (!gameStarted) {
        document.getElementById("startButton").disabled = false;
    }
}

/**
 * Toggles the display of the imprint section.
 */
function showOrHideImprint() {
    if (document.getElementById("imprintButton").innerText == "Back") {
        if (isTurned) {
            document.getElementById("showControls").classList.remove("d-none");
            document.getElementById("startButton").classList.remove("d-none");
        }
        closeImprint()
    } else {
        if (isTurned) {
            document.getElementById("showControls").classList.add("d-none");
            document.getElementById("startButton").classList.add("d-none");
        }
        showImprint()
    }
    document.getElementById("imprintButton").blur();
}

/**
 * Toggles the mute state of the game sounds.
 */
function mutegame() {
    if (muted) {
        document.getElementById("muteButton").innerText = "Mute Sounds"
        world.playSounds()
        muted = false;
    } else {
        world.muteSounds()
        document.getElementById("muteButton").innerText = "Play Sounds"
        muted = true;
    }
    document.getElementById("muteButton").blur();
    saveMutedStatusToLocalStorage();
}

/**
 * Shows the controls section.
 */
function showControls() {
    document.getElementById("controls-container").classList.remove("d-none");
    document.getElementById("showControls").innerText = "Back"
    document.getElementById("imprintButton").disabled = true;
    document.getElementById("startButton").classList.add("d-none");
}

/**
 * Closes the controls section.
 */
function closeControls() {
    document.getElementById("controls-container").classList.add("d-none");
    document.getElementById("showControls").innerText = "Show Controls"
    document.getElementById("imprintButton").disabled = false;
    document.getElementById("startButton").classList.remove("d-none");
    if (!gameStarted) {
        document.getElementById("startButton").disabled = false;
    }
}

/**
 * Toggles the display of the controls section.
 */
function sowOrHideControls() {
    if (document.getElementById("showControls").innerText == "Back") {
        closeControls()
    } else {
        showControls()
    }
    document.getElementById("showControls").blur();
}

/**
 * Checks the game status at regular intervals and updates the UI accordingly.
 */
function checkGameStatus() {
    setInterval(() => {
        if (world.gameFinished) {
            document.getElementById("startButton").disabled = false;
            document.getElementById("imprintButton").classList.remove("d-none");
            document.getElementById("muteButton").classList.add("d-none");
            document.getElementById("startButton").innerText = "Restart";
            document.getElementById("bottomButtons").classList.remove("d-none");
        }
    }, 1000/60)
}

function checkMutedStatusinLocalStorage() {
    if (localStorage.getItem("muted") === null) {
        localStorage.setItem("muted", muted);
    } else if(localStorage.getItem("muted")) {
        muted = localStorage.getItem("muted", muted);
    }
}

function saveMutedStatusToLocalStorage() {
    localStorage.setItem("muted", muted);
}

function toggleGameSounds() {
    if (muted === "true") {
        world.muteSounds()
        document.getElementById("muteButton").innerText = "Play Sounds";
    } else {
        document.getElementById("muteButton").innerText = "Mute Sounds";
        world.playSounds()
    }
}