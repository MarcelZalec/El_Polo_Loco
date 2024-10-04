/**
 * Class representing a drawable object.
 * 
 * @property {number} x - The x-coordinate of the drawable object.
 * @property {number} y - The y-coordinate of the drawable object.
 * @property {HTMLImageElement} img - The image of the drawable object.
 * @property {number} height - The height of the drawable object.
 * @property {number} width - The width of the drawable object.
 * @property {Object} imageCache - Cache for loaded images.
 * @property {number} currentImage - The index of the current image.
 * @property {Object} offset - The offset values for collision detection.
 */
class drawableObject {
    x;
    y = canvas.height - 200;
    img;
    height;
    width;
    imageCache = [];
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 20,
    }
    
    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    /**
     * Loads multiple images from the specified array of paths.
     * @param {string[]} arr - The array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            // console.log(this.img.src);
        } catch(e){
            console.warn("Error loading image", e);
            console.log("could not find image", this.img.src);
        }
    }
}