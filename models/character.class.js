/**
 * Class representing the main character.
 * @extends MoveableObject
 * 
 * @property {number} x - The x-coordinate of the character.
 * @property {number} height - The height of the character.
 * @property {number} width - The width of the character.
 * @property {number} speed - The speed of the character.
 * @property {number} y - The y-coordinate of the character.
 * @property {Object} world - The game world.
 * @property {Audio} walking_sound - The sound played when the character walks.
 * @property {Audio} jump_sound - The sound played when the character jumps.
 * @property {number} idleTimeout - The timeout for idle state.
 * @property {number} lastActionTime - The timestamp of the last action.
 * @property {boolean} isStanding - Indicates if the character is standing.
 * @property {number} liveEnergy - The live energy of the character.
 * @property {Object} offset - The offset values for collision detection.
 * @property {string[]} IMAGES_walk - Array of image paths for walking animation.
 * @property {string[]} IMAGES_jump - Array of image paths for jumping animation.
 * @property {string[]} IMAGES_dead - Array of image paths for dead animation.
 * @property {string[]} IMAGES_hurt - Array of image paths for hurt animation.
 * @property {string[]} IMAGES_idle - Array of image paths for idle animation.
 * @property {string[]} IMAGES_longIdle - Array of image paths for long idle animation.
 */
class Character extends MoveableObject {
    x = 200; //Standart = 200
    height = 300;
    width = 150;
    speed = 5;
    y = canvas.height -340;
    world;
    walking_sound = new Audio("audio/walk.mp3");
    jump_sound = new Audio("audio/jump.mp3");
    idleTimeout = 10000;
    lastActionTime = 0;
    isStanding = false;
    liveEnergy = 100;

    offset = {
        top: 120,
        bottom: 140,
        left: 20,
        right: 50,
    };

    IMAGES_walk = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_jump = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_dead = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_hurt = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_idle = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    
    IMAGES_longIdle = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Creates a new character.
     */
    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_walk);
        this.loadImages(this.IMAGES_jump);
        this.loadImages(this.IMAGES_dead);
        this.loadImages(this.IMAGES_hurt);
        this.loadImages(this.IMAGES_idle);
        this.loadImages(this.IMAGES_longIdle);
        this.applyGravity();
        this.walkAnimation();
    }

    /**
     * Animates the character's walking, jumping, and idle actions.
     */
    walkAnimation() {
        let currentTime = new Date().getTime();
        let timeSinceLastAction = currentTime - this.lastActionTime;
        let isMoving = false;

        setInterval(() => {
            isMoving = false;
            this.isStanding = false;

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.x += this.speed;
                this.walking_sound.play();
                isMoving = true;
            } else if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                isMoving = true;
            } if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump_sound.play();
                this.speedY = 15;
                isMoving = true;
            } if (isMoving) {
                this.updateLastActionTime();
            } if (timeSinceLastAction > this.idleTimeout && !isMoving && !this.isDead() && !this.isStanding){
                this.isStanding = true;
            }
            this.world.camara_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead()) {
                this.animate(this.IMAGES_dead)
            }else if (this.isHurt()) {
                this.animate(this.IMAGES_hurt)
            } else if (this.isAboveGround()) {
               this.animate(this.IMAGES_jump)
            } else if (this.isStanding) {
                this.animate(this.IMAGES_idle);
            }
               else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animate(this.IMAGES_walk);
                }
            }
        }, 100)
    }

    /**
     * Checks if the character is colliding with an enemy from the top and hits the enemy.
     * @param {Object} enemy - The enemy object.
     */
    jumpOnEnemy(enemy) {
        if (this.isColidingFromTop(enemy)) {
            enemy.hit()
        }
    }

    /**
     * Updates the timestamp of the last action performed by the character.
     */
    updateLastActionTime() {
        this.lastActionTime = new Date().getTime();
    }
}