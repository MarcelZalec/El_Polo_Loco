class Background extends MoveableObject {
    x = 0;
    y = 0;
    height = canvas.height;
    width = canvas.width;

    

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}