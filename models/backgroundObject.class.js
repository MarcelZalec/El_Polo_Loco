class BackgroundObject extends MoveableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        // this.y = this.height - 80;
    }
}