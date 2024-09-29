class throwableObject extends MoveableObject {
    speedY = 15;
    speedX = 10;
    height = 60;
    width = 60;
    damage = 50;

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
        this.loadImages(this.IMAGES_throw);
        this.loadImages(this.IMAGES_splash);
        this.x = x + 80;
        this.y = y +150;
        this.throw();
    }

    throw() {
        this.x;
        this.y;
        this.speedY;
        this.applyGravity();
        this.throwAnimation();
    }

    throwAnimation() {
        setInterval(() => {
            if (!world.character.otherDirection) {
                this.x += this.speedX;
            } else {
                this.x -= this.speedX;
            }
            this.animate(this.IMAGES_throw);
        }, 60)
    }

    splashAnimation() {
        setInterval(() => {
            this.animate(this.IMAGES_splash)
        }, 25)
    }
}