/**
 * Class representing a throwable object.
 * @extends MoveableObject
 * 
 * @property {number} speedY - The vertical speed of the object.
 * @property {number} speedX - The horizontal speed of the object.
 * @property {number} height - The height of the object.
 * @property {number} width - The width of the object.
 * @property {number} damage - The damage caused by the object.
 * @property {string[]} IMAGES_throw - Array of image paths for the throw animation.
 * @property {string[]} IMAGES_splash - Array of image paths for the splash animation.
 */
class throwableObject extends MoveableObject {
    speedY = 15;
    speedX = 10;
    height = 60;
    width = 60;
    damage = 50;

    IMAGES_throw = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]

    IMAGES_splash = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    /**
     * Creates a throwable object.
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     */
    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_throw);
        this.loadImages(this.IMAGES_splash);
        this.x = x + 80;
        this.y = y +150;
        this.throw();
    }

    /**
     * Initiates the throw action.
     */
    throw() {
        this.x;
        this.y;
        this.speedY;
        this.applyGravity();
        this.throwAnimation();
    }

    /**
     * Animates the throw action.
     */
    throwAnimation() {
        setInterval(() => {
            this.x += this.speedX;
            this.animate(this.IMAGES_throw);
        }, 60)
    }

    /**
     * Animates the splash action.
     */
    splashAnimation() {
        setInterval(() => {
            this.animate(this.IMAGES_splash)
        }, 25)
    }
}