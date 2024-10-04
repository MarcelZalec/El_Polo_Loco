/**
 * Class representing a small chicken enemy.
 * @extends MoveableObject
 * 
 * @property {number} height - The height of the small chicken.
 * @property {number} width - The width of the small chicken.
 * @property {number} speed - The speed of the small chicken.
 * @property {number} y - The y-coordinate of the small chicken.
 * @property {boolean} isDead - Indicates if the small chicken is dead.
 * @property {Object} offset - The offset values for collision detection.
 * @property {string[]} walk - Array of image paths for walking animation.
 * @property {string[]} IMAGE_isDead - Array of image paths for dead animation.
 */
class smallChicken extends MoveableObject {
    height = 50;
    width =  50;
    speed = 0.15 + Math.random() * 0.5;
    y = canvas.height - 100;
    isDead = false;
    offset = {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
    }

    walk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_isDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Creates a small chicken enemy.
     */
    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.walk)
        this.loadImages(this.IMAGE_isDead)
        this.x = 400 + Math.random() * 3700;
        this.moveLeft(this.speed)
        this.animate1();
    }

    /**
     * Animates the small chicken's walking and death actions.
     */
    animate1() {
        setInterval(()=>{
            this.animate(this.walk)
            if (this.liveEnergy <= 0 && !this.isDead) {
                this.death_chicken_Sound.play();
                this.animate(this.IMAGE_isDead);
                this.isDead = true;
            }
        }, 110)
    }
}