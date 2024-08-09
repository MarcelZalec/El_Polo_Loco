class Cloud extends MoveableObject {
    y = 0;
    width = 720;
    height = 400;
    

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 3500
        this.moveClouds();
    }

    moveClouds() {
        setInterval(() => {
            this.x -= 0.1;
        }, 1000 / 50)
    }
}