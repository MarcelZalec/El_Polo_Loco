/**
 * Class representing the game world.
 * 
 * @property {Character} character - The main character of the game.
 * @property {Object} level - The current level of the game.
 * @property {HTMLCanvasElement} canvas - The canvas element.
 * @property {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @property {Object} keyboard - The keyboard input handler.
 * @property {number} camara_x - The x-coordinate of the camera.
 * @property {Statusbar[]} statusbar - Array of status bars.
 * @property {throwableObject[]} throwableObjects - Array of throwable objects.
 * @property {number} useableObject - The number of usable objects.
 * @property {number} coins - The number of collected coins.
 * @property {Audio} collectSound - The sound played when collecting items.
 * @property {Audio} splashSound - The sound played when a splash occurs.
 * @property {Audio} backgroundSound - The background sound of the game.
 * @property {Audio} hurt_sound - The sound played when the character is hurt.
 * @property {boolean} statusbarBoss - Indicates if the boss status bar is shown.
 * @property {boolean} isThrow - Indicates if an object is being thrown.
 * @property {boolean} gameFinished - Indicates if the game is finished.
 */
class World {
    character = new Character(this.setWorld);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    statusbar = [];
    throwableObjects = [];
    useableObject = 0;
    coins = 0;
    collectSound = new Audio("audio/collect.mp3");
    splashSound = new Audio("audio/splash.mp3");
    backgroundSound = new Audio("audio/background_sound.mp3");
    hurt_sound = new Audio("audio/hurt.mp3");
    statusbarBoss = false;
    isThrow = false;
    gameFinished = false;

    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusbar = [
            new Statusbar(0, this.ctx),
            new Statusbar(1, this.ctx),
            new Statusbar(2, this.ctx),
        ]
        this.draw();
        this.setWorld();
        this.checkCollisionsObjects();
        this.checkCaracterPositionToBoss();
        this.playBackgroundSounds();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks for collisions with objects at regular intervals.
     */
    checkCollisionsObjects() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000/10);
        setInterval(() => {
            this.checkCollectCollisoion();
            this.checkThrowObject();
        }, 1000/60)
    }

    /**
     * Checks if a throwable object should be thrown.
     */
    checkThrowObject() {
        if (this.keyboard.D && this.useableObject > 0 && !this.isThrow) {
            let bottle = new throwableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.useableObject -= 1;
            this.keyboard.D = false;
            this.checkSalsaCollisoion();
            this.statusbar[2].setPercentage(this.useableObject*20, 2)
            this.isThrow = true;
        }
        if (this.useableObject == 0) {
           this.throwableObjects = [];
        }
        setTimeout(() => {
            this.isThrow = false
        }, 500)

    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isColidingFromTop(enemy) && !(enemy instanceof Endboss) && this.character.speedY < 0) {
                    enemy.hit(1000);
                    this.level.enemies.splice(index, 1);
                } else if (enemy instanceof Chicken || enemy instanceof smallChicken) {
                    if (!enemy.isDead) {
                        this.hurt_sound.play();
                        this.character.hit(20);
                        this.statusbar[0].setPercentage(this.character.liveEnergy, 0)
                    } else {
                        null;
                    }
                } else if(enemy instanceof Endboss){
                    this.hurt_sound.play();
                    enemy.atacking(20);
                    this.statusbar[0].setPercentage(this.character.liveEnergy, 0)
                }
            }
        })
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkSalsaCollisoion() {
        this.splashSound.pause();
        if (this.throwableObjects.length >= 0) {
            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if(bottle.isColliding(enemy)) {
                        if(enemy instanceof Endboss) {
                            console.log("collinding");
                            enemy.hitEnemy(25);
                            bottle.splashAnimation();
                            enemy.isHurt();
                            this.splashSound.play();
                            this.statusbar[3].setPercentage(enemy.liveEnergy, 3);
                        }else if (!enemy instanceof Endboss) {
                            this.level.enemies.hitEnemy(100);
                            bottle.splashAnimation();
                            this.splashSound.play();
                        }
                        this.splashSound.play();
                    }
                })
            })
        }
    }

    /**
     * Checks for collisions between the character and collectable objects.
     */
    checkCollectCollisoion() {
        this.level.collectables.forEach((collectable, index) => {
            this.collectSound.pause();
            if (this.character.isColliding(collectable)) {  
                if (collectable.img.src.includes("salsa")) {
                    this.useableObject += 1;
                    this.level.collectables.splice(index, 1);
                    this.collectSound.play();
                    this.statusbar[2].setPercentage(this.useableObject*20, 2);
                } else if(collectable.img.src.includes("coin")) {
                    this.coins += 1;
                    this.level.collectables.splice(index, 1);
                    this.collectSound.play();
                    this.statusbar[1].setPercentage(this.coins*20, 1);
                } else {
                    null;
                }
            }
        })
    }

    /**
     * Checks the character's position relative to the boss and updates the status bar.
     */
    checkCaracterPositionToBoss() {
        setInterval(() => {
            this.level.enemies.forEach((enemy)=> {
                if (enemy instanceof Endboss && enemy.hadFirstContact == true && !this.statusbarBoss) {
                    this.statusbar.push(new Statusbar(3, this.ctx))
                    this.statusbarBoss = true;
                }
            })
        }, 10)
    }

    /**
     * Draws the game world and updates the canvas.
     */
    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camara_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);

        this.ctx.translate(-this.camara_x, 0);
        // ------- Space for fixed objects -------
        this.addObjectToMap(this.statusbar);
        this.ctx.translate(this.camara_x, 0);

        this.addObjectToMap(this.throwableObjects)
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.collectables);
        this.end()
        
        
        this.ctx.translate(-this.camara_x, 0);

        let self = this; 
        requestAnimationFrame(() => { // Draw() wird immer aufgerufen
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the map.
     * @param {Object[]} obj - The array of objects to add.
     */
    addObjectToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o)
        })
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Ends the game and displays the appropriate end screen.
     */
    end() {
        if (this.character.liveEnergy <= 0) {
            this.addToMap(new EndScreen("img/9_intro_outro_screens/game_over/oh no you lost!.png", this.character.x));
            this.gameFinished = true;
        } else 
            this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.liveEnergy <= 0) {
                this.addToMap(new EndScreen("img/9_intro_outro_screens/win/won_2.png", this.character.x));
                this.gameFinished = true;
            }
        })
    }

    /**
     * Mutes all game sounds.
     */    
    muteSounds() {
        this.splashSound.volume = 0;
        this.collectSound.volume = 0;
        this.backgroundSound.volume = 0;
        this.hurt_sound.volume = 0;
        this.character.walking_sound.volume = 0;
        this.character.jump_sound.volume = 0;
        this.level.enemies.forEach((enemy) => {
            enemy.death_chicken_Sound.volume = 0
        })
    }

    /**
     * Plays all game sounds.
     */
    playSounds() {
        this.splashSound.volume = 1;
        this.collectSound.volume = 1;
        this.backgroundSound.volume = 1;
        this.hurt_sound.volume = 1;
        this.character.walking_sound.volume = 1;
        this.character.jump_sound.volume = 1;
        this.level.enemies.forEach((enemy) => {
            enemy.death_chicken_Sound.volume = 1;
        })
    }

    /**
     * Plays the background sounds continuously unless the game is finished.
     */
    playBackgroundSounds() {
        setInterval(() => {
            if (!this.gameFinished) {
                this.backgroundSound.play();
            } else {
                this.backgroundSound.volume = 0;
                this.backgroundSound.pause();
            }
        }, 1000/60)
    }
}