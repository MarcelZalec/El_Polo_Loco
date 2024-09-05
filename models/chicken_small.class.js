class smallChicken extends MoveableObject {
    height = 50;
    width =  50;
    speed = 0.15 + Math.random() * 0.5;
    y = canvas.height - 100;
    isDead = false;

    walk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_isDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.walk)
        this.loadImages(this.IMAGE_isDead)
        this.x = 400 + Math.random() * 3700;
        this.moveLeft(this.speed)
        this.animate1();
    }

    animate1() {
        setInterval(()=>{
            this.animate(this.walk)
            if (this.liveEnergy <= 0 && !this.isDead) {
                console.log("error");
                this.animate(this.IMAGE_isDead);
                this.isDead = true;
            }
        }, 110)

    }
}