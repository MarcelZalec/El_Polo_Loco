/**
 * Class representing a collectable object.
 * @extends drawableObject
 * 
 * @property {number} x - The x-coordinate of the collectable object.
 * @property {number} height - The height of the collectable object.
 * @property {number} width - The width of the collectable object.
 * @property {Object} offset - The offset values for collision detection.
 * @property {string[]} IMAGES_Ground_Bottle - Array of image paths for ground bottles.
 * @property {string[]} IMAGES_Coins - Array of image paths for coins.
 */
class Collectable extends drawableObject {
    x;
    height;
    width;
    offset = {
        top: 30,
        bottom: 20,
        left: 30,
        right: 40,
    }

    IMAGES_Ground_Bottle = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];
    IMAGES_Coins = [
        "img/8_coin/coin_1.png",
    ];

    /**
     * Creates a collectable object.
     * @param {string} objImg - The type of collectable object (e.g., "bottle" or "coin").
     */
    constructor(objImg) {
        super();
        this.x = 400 + Math.random()*2300;
        this.checkImg(objImg);
    }

    /**
     * Handles the collection of the object.
     */
    collect() {
        this.checkCollisionsWithColectable();
        if(bottle) {
            bottles++;
        } else if (coins) {
            coins++;
        } else {
            null;
        }
    }

    /**
     * Checks for collisions with collectable objects.
     * @returns {Object} The collided object.
     */
    checkCollisionsWithColectable() {
        if (this instanceof Collectable) {
            return mo;
        }
    }

    /**
     * Sets the image and dimensions based on the type of collectable object.
     * @param {string} obj - The type of collectable object (e.g., "bottle" or "coin").
     */
    checkImg(obj) {
        let resImg;
        if (obj == "bottle") {
            this.height = 80;
            this.width = 80;
            this.y = canvas.height - 125 ;
            resImg = this.IMAGES_Ground_Bottle[0];
        } else if(obj == "coin") {
            this.height = 90;
            this.width = 90;
            this.y -= Math.random() *150
            resImg = this.IMAGES_Coins[0];
        }
        this.loadImage(resImg);
    }
}