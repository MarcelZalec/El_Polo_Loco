class Endboss extends MoveableObject {
    height = 400;
    width = 200;
    y = 50;
    liveEnergy = 100;
    speed = 0.005;
    offset = {
        top: 0,
        bottom: 50,
        left: 20,
        right: 50,
    }

    walk = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ]

    alert = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ]

    HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    atack = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    hadFirstContact = false;


    constructor() {
        super().loadImage(this.alert[0]);
        this.loadImages(this.walk);
        this.loadImages(this.alert);
        this.loadImages(this.HURT);
        this.loadImages(this.atack);
        this.loadImages(this.dead);
        this.x = 3400;
        this.animate1();
    }

    animate1() {
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.animate(this.alert)
            } else {
                this.animate(this.walk)
                if (world.character.x + 200 > this.x) {
                    this.moveLeft(this.speed)
                }
            }

            i++;

            if (world.character.x > 3000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
            
        }, 250) 
        setInterval(() => {
            if (this.liveEnergy <= 0) {
                this.animate(this.dead);
                this.isDead();
            }
        }, 110)
    }

    atacking(damage) {
        this.animate(this.atack);
        world.character.hit(damage);
    }

    isHurt() {
        this.animate(this.HURT);
    }
}