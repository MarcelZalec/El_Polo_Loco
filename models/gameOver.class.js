class EndScreen extends drawableObject {
    x;
    y = 0;
    height = canvas.height;
    width = canvas.width;

    constructor(image, x) {
        super().loadImage(image);
        this.x = x - 100;
    }
}