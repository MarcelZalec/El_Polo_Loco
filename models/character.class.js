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
    liveEnergy = 1000;
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
    IMAGES_idle = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_longIdle = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];
    world;
    walking_sound = new Audio("audio/walk.mp3");
    idleTimeout = 10000;
    lastActionTime = 0;

    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_walk);
        this.loadImages(this.IMAGES_jump);
        this.loadImages(this.IMAGES_dead);
        this.loadImages(this.IMAGES_hurt);
        this.loadImages(this.IMAGES_idle);
        this.loadImages(this.IMAGES_longIdle);
        this.applyGravity();
        this.walkAnimation();
        // this.jump();
        // this.updateLastActionTime();
    }

    walkAnimation() {
        let currentTime = new Date().getTime();
        let timeSinceLastAction = currentTime - this.lastActionTime;
        let isMoving = false;

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.x += this.speed;
                this.walking_sound.play();
                isMoving = true;
            } else if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
                isMoving = true;
            } if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.speedY = 15;
                isMoving = true;
            } if (!isMoving) {
                this.updateLastActionTime();
            } if (timeSinceLastAction > this.idleTimeout && !isMoving && !this.isDead()){
                this.animate(this.IMAGES_idle);
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
            } 
            // else if (timeSinceLastAction > this.idleTimeout && !isMoving && !this.isDead()) {
            //     console.log(timeSinceLastAction);
            //     
            //     this.animate(this.IMAGES_idle)
            // }
               else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animate(this.IMAGES_walk);
                }
            }
        }, 50)
    }

    // jump() {
    //     setInterval(() => {
    //         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
    //             this.speedY = 15;
    //         }
    //     }, 1000 / 60)
    // }

    jumpOnEnemy(enemy) {
        if (this.isColidingFromTop(enemy)) {
            enemy.hit()
        }
    }

    isColidingFromTop() {
        return null
    }

    updateLastActionTime() {
        this.lastActionTime = new Date().getTime();
    }
}