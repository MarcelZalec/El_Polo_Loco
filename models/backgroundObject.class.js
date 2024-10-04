/**
 * Class representing a background object.
 * @extends MoveableObject
 * 
 * @property {number} x - The x-coordinate of the background object.
 * @property {number} y - The y-coordinate of the background object.
 * @property {number} height - The height of the background object.
 * @property {number} width - The width of the background object.
 */
class BackgroundObject extends MoveableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720;

    /**
     * Creates a background object.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        // this.y = this.height - 80;
    }
}