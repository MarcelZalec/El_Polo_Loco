class Chicken extends MoveableObject {
    height = 100;
    width =  90;
    speed = 0.15 + Math.random() * 0.5;
    y = canvas.height - 150;

    walk = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.walk)

        this.x = 400 + Math.random() * 3700;
        this.moveLeft(this.speed)
        this.animate1();
    }

    animate1() {
        setInterval(()=>{
            this.animate(this.walk)
        }, 110)
    }
}