/**
 * Class representing a cloud.
 * @extends MoveableObject
 * 
 * @property {number} y - The y-coordinate of the cloud.
 * @property {number} width - The width of the cloud.
 * @property {number} height - The height of the cloud.
 */
class Cloud extends MoveableObject {
    y = 0;
    width = 720;
    height = 400;

    /**
     * Creates a cloud.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 3500
        this.moveClouds();
    }

    /**
     * Moves the cloud to the left at a constant speed.
     */
    moveClouds() {
        setInterval(() => {
            this.x -= 0.1;
        }, 1000 / 50)
    }
}