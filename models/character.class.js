class Character extends MoveableObject {
    x = 200;
    height = 300;
    width = 150;
    speed = 5;
    y = canvas.height -340;
    offset = {
        top: 120,
        bottom: 140,
        left: 20,
        right: 50,
    }
    IMAGES_walk = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    IMAGES_jump = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ]
    IMAGES_dead = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_hurt = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];
    world;
    walking_sound = new Audio("audio/walk.mp3");


    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_walk);
        this.loadImages(this.IMAGES_jump);
        this.loadImages(this.IMAGES_dead);
        this.loadImages(this.IMAGES_hurt);
        this.applyGravity();
        this.walkAnimation();
        this.jump();
    }

    walkAnimation() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.x += this.speed;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camara_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead()) {
                this.animate(this.IMAGES_dead)
            }else if (this.isHurt()) {
                this.animate(this.IMAGES_hurt)
            } else if (this.isAboveGround()) {
               this.animate(this.IMAGES_jump)
               // this.jump();
            } 
               else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animate(this.IMAGES_walk);
                }
            }
        }, 50)
        // setInterval(() => {
        //     if (this.isAboveGround()) {
        //         this.animate(this.IMAGES_jump)
        //     }
        // }, 250)
    }



    jump() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.speedY = 15;
            }
        }, 1000 / 60)
    }
}