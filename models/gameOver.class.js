/**
 * Class representing the end screen.
 * @extends drawableObject
 * 
 * @property {number} x - The x-coordinate of the end screen.
 * @property {number} y - The y-coordinate of the end screen.
 * @property {number} height - The height of the end screen.
 * @property {number} width - The width of the end screen.
 */
class EndScreen extends drawableObject {
    x;
    y = 0;
    height = canvas.height;
    width = canvas.width;

    /**
     * Creates an end screen.
     * @param {string} image - The path to the end screen image.
     * @param {number} x - The initial x-coordinate of the end screen.
     */
    constructor(image, x) {
        super().loadImage(image);
        this.x = x - 100;
    }
}