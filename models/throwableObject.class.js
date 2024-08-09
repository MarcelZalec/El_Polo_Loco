class throwableObject extends MoveableObject {
    speedY = 15;
    speedX = 10;
    height = 50;
    width = 50;

    IMAGES_throw = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]

    IMAGES_splash = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x + 80;
        this.y = y +150;
        
        this.throw()
    }

    throw() {
        this.x;
        this.y;
        this.speedY;
        this.applyGravity();
        setInterval(()=>{
            this.x += 5;
            // this.throwAnimation()
        }, 25)
    }

    throwAnimation() {
        setInterval(() => {
            this.animate(this.IMAGES_throw);
        }, 1000 / 60)
    }
}